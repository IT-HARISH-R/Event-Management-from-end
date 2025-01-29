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
  const [totalTicketsSold, settotalTicketsSold] = useState(0);
 
  useEffect(() => {
    if (event?._id) {
      const fetchAnalyticsData = async () => {
        try {
          const response = await api.get(`/ticket/analytics/${event._id}`);
          setAnalyticsData(response.data.analytics || []);

          let completed = 0;
          let failed = 0;
          let pending = 0;
          let total = 0;
          let totalTicke = 0
          response.data.analytics.forEach((data) => {
            completed += data.paymentStatus[0].Completed;
            failed += data.paymentStatus[0].Failed;
            pending += data.paymentStatus[0].Pending;
            total += data.totalRevenue;
            totalTicke += data.totalTicketsSold;
          });

          setPaymentCompleted(completed);
          setPaymentFailed(failed);
          setPaymentPending(pending);
          settatalRevenue(total);
          settotalTicketsSold(totalTicke)
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
    <div className="p-4 max-w-4xl mx-auto ">
      <h2 className="text-2xl font-semibold mb-4">Event Analytics for {event.title}</h2>

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Tickets Sold</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Revenue</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Payment Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ticket Types</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-sm">{totalTicketsSold}</td>
              <td className="px-4 py-2 text-sm">{tatalRevenue}</td>
              <td className="px-4 py-2 text-sm">
                <ul>
                  <li>Pending: {paymentPending}</li>
                  <li>Completed: {paymentCompleted}</li>
                  <li>Failed: {paymentFailed}</li>
                </ul>
              </td>
              <td className="px-4 py-2 text-sm">
                <ul>
                  {event.ticketTypes?.map((ticket, index) => (
                    <li key={index}>{ticket.type} Quantity: {ticket.quantity}</li>
                    
                  ))}
                </ul>
              </td> 
            </tr>
          </tbody>
        </table>
      </div>

      {analyticsData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Revenue by Ticket Type</h3>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Bar data={chartData}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventAnalytics;












