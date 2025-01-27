import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';  // Import necessary chart.js components
import api from '../axios';

const EventAnalytics = ({ event }) => {
  const [analyticsData, setAnalyticsData] = useState([]);  // Set default as an empty array

  useEffect(() => {
    // Fetch analytics data only if event has an ID
    if (event?._id) {
      const fetchAnalyticsData = async () => {
        try {
          const response = await api.get(`/ticket/analytics/${event._id}`);
          console.log("setAnalyticsData", response);
          setAnalyticsData(response.data.analytics || []);  // Ensure we set an array
        } catch (error) {  
          console.error('Error fetching analytics data:', error);
          setAnalyticsData([]);  // Ensure we always have an array in case of error
        } 
      };
      fetchAnalyticsData();
    }
  }, [event]);

  // Prepare chart data for ticket revenue
  const chartData = {
    labels: analyticsData.map((data) => data.ticketType),  // Safe to map as analyticsData is now an array
    datasets: [
      {
        label: 'Revenue',
        data: analyticsData.map((data) => data.totalRevenue),  // Same here
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Event Analytics for {event.title}</h2>
      
      {/* Table displaying event and ticket data */}
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
            <td>{event.revenue}</td>
            <td>
              <ul>
                <li>Pending: {event.paymentStatus?.Pending || 0}</li>
                <li>Completed: {event.paymentStatus?.Completed || 0}</li>
                <li>Failed: {event.paymentStatus?.Failed || 0}</li>
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
      
      {/* Chart displaying ticket revenue data */}
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
