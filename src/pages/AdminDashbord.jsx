import React, { useState, useEffect } from 'react';
import api from "../axios";
import EventAnalytics from "../componastion/EventAnalytics";

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch events from the API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/admin/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const updateEventStatus = async (eventId, status) => {
        try {
            await api.put(`/admin/events/${eventId}/status`, { status });
            setEvents(events.map(event => event._id === eventId ? { ...event, approvalStatus: status } : event));
            alert(`Event ${status.toLowerCase()} successfully!`);
        } catch (error) {
            console.error('Error updating event status:', error);
            alert('Failed to update event status.');
        }
    };

    if (loading) return <p className="text-center mt-4">Loading events...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {events.map(event => (
                    <div key={event._id} className="bg-white shadow-md rounded-lg border border-gray-200 p-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Status:</strong> {event.approvalStatus}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                className={`px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all ${event.approvalStatus === 'Approved' ? 'cursor-not-allowed opacity-50' : ''}`}
                                onClick={event.approvalStatus === 'Approved' ? null : () => updateEventStatus(event._id, 'Approved')}
                                disabled={event.approvalStatus === 'Approved'}
                            >
                                Approve
                            </button>
                            <button
                                className={`px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all ${event.approvalStatus === 'Rejected' ? 'cursor-not-allowed opacity-50' : ''}` }
                                onClick={event.approvalStatus === 'Rejected' ? null : () => updateEventStatus(event._id, 'Rejected')}

                                // onClick={() => updateEventStatus(event._id, 'Rejected')}
                            >
                                Reject
                            </button>
                        </div>
                        {/* Displaying event analytics if event is approved */}
                        {event.approvalStatus === 'Approved' ? (
                            <EventAnalytics event={event} />
                        ) : (
                            <div className="text-center mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow-md">
                                <h1 className="text-xl font-semibold">This event has not been approved yet.</h1>
                                <p className="mt-2">The event is currently awaiting approval from the admin team. Please check back later.</p>
                            </div>
                        )}
                    </div>
                ))}
            </div> 
        </div>
    );
};

export default AdminDashboard;
