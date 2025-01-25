import React, { useEffect, useState } from 'react';
import api from '../axios'; // Your API handler

const ManageRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the registrations when the component is mounted
    const fetchRegistrations = async () => {
      try {
        const response = await api.get('/auth/profile');
        setRegistrations(response.data.user);
        console.log(response.data.user)
      } catch (err) {
        console.error("Error fetching registrations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleCancelBooking = async (ticketId) => {
    if (window.confirm("Are you sure you want to cancel this ticket?")) {
      try {
        // Delete the ticket by ID (consistent with the backend)
        await api.delete(`/ticket/${ticketId}`);
        setRegistrations((prev) => prev.filter((registration) => registration._id !== ticketId));
        alert("Ticket canceled successfully.");
      } catch (err) {
        console.error("Error canceling ticket:", err);
        alert("An error occurred while canceling the ticket.");
      }
    }
  };

  const handleTransferTicket = async (ticketId, newAttendeeEmail) => {
    if (!newAttendeeEmail) {
      alert('Please enter a valid email.');
      return;
    }
    try {
      await api.post(`/ticket/transfer`, { ticketId, newAttendeeEmail });
      alert('Ticket transferred successfully!');
    } catch (err) {
      console.error("Error transferring ticket:", err);
      alert("An error occurred while transferring the ticket.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">Loading your registrations...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Your Registrations</h2>
      {registrations.length === 0 ? (
        <p>You haven't registered for any events yet.</p>
      ) : (
        <ul className="space-y-4">
          {registrations.map((registration) => (
            <li key={registration._id} className="border-b pb-4">
              <h3 className="text-xl font-semibold">{registration.eventTitle}</h3>
              <p><strong>Ticket Type:</strong> {registration.ticketType}</p>
              <p><strong>Status:</strong> {registration.paymentStatus}</p>

              <div className="mt-4 flex justify-between space-x-4">
                <button
                  onClick={() => handleCancelBooking(registration._id)}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Cancel Ticket
                </button>
                <button
                  onClick={() => {
                    const newAttendeeEmail = prompt('Enter the new attendee\'s email:');
                    if (newAttendeeEmail) {
                      handleTransferTicket(registration._id, newAttendeeEmail);
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Transfer Ticket
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageRegistrations;
