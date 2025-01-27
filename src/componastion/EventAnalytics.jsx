import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../axios';

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EventAnalytics = ({ event }) => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [paymentCompleted, setPaymentCompleted] = useState(0);
  const [paymentFailed, setPaymentFailed] = useState(0);
  const [paymentPending, setPaymentPending] = useState(0);
  const [tatalRevenue, settatalRevenue] = useState(0);

  useEffect(() => {
    if (event?._id) {
      const fetchAnalyticsData = async () => {
        try {
          const response = await api.get(`/ticket/analytics/${event._id}`);
          setAnalyticsData(response.data.analytics || []);
          console.log("{{{{{{{{{{", response.data.analytics);

          let completed = 0;
          let failed = 0;
          let pending = 0;
          let total = 0
          response.data.analytics.forEach((data) => {
            completed += data.paymentStatus[0].Completed;
            failed += data.paymentStatus[0].Failed;
            pending += data.paymentStatus[0].Pending;
            total+=data.totalRevenue
          });

          setPaymentCompleted(completed);
          setPaymentFailed(failed);
          setPaymentPending(pending);
          settatalRevenue(total)
        } catch (error) {
          console.error('Error fetching analytics data:', error);
          setAnalyticsData([]);
        }
      };
      fetchAnalyticsData();
    }
  }, [event]);

  const chartData = {
    labels: analyticsData.map((data) => data.ticketType),
    datasets: [
      {
        label: 'Revenue',
        data: analyticsData.map((data) => data.totalRevenue),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Event Analytics for {event.title}</h2>

      <table>
        <thead>
          <tr>
            <th>Total Tickets Sold</th>
            <th>Revenue</th>
            <th>Payment Status</th>
            <th>Ticket Types</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{event.totalTicketsSold}</td>
            {/* <td>{event.revenue}</td> */}
            <td>{tatalRevenue}</td>
            <td>
              <ul>
                <li>Pending: {paymentPending}</li>
                <li>Completed: {paymentCompleted}</li>
                <li>Failed: {paymentFailed}</li>
              </ul>
            </td>
            <td>
              <ul>
                {event.ticketTypes?.map((ticket, index) => (
                  <li key={index}>{ticket.type}: {ticket.quantity}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      {analyticsData.length > 0 && (
        <div>
          <h3>Revenue by Ticket Type</h3>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
};

export default EventAnalytics;
