import React, { useState, useEffect } from 'react';
import api from "../axios";
import EventAnalytics from "../componastion/EventAnalytics";
import { Link } from 'react-router-dom';

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
    console.log(events)
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
            <div className="flex justify-between items-center py-4 px-6">
                <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
                <Link to='/useraccounts' className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition duration-200">View User Accounts</Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {events.map(event => (
                    <div className=''>

                        {event.approvalStatus === 'Rejected' || event.approvalStatus === "Pending" && (
                            <div className='"bg-white shadow-md rounded-lg border border-gray-200 p-4'>
                                <div className='flex justify-center'>
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                                        <p><strong>Description:</strong> {event.description}</p>
                                        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                        <p><strong>Location:</strong> {event.location}</p>
                                        <p><strong>Status:</strong> {event.approvalStatus}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-2 md:gap-5 mt-4">
                                    <button
                                        className={`px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all ${event.approvalStatus === 'Approved' ? 'cursor-not-allowed opacity-50' : ''}`}
                                        onClick={event.approvalStatus === 'Approved' ? null : () => updateEventStatus(event._id, 'Approved')}
                                        disabled={event.approvalStatus === 'Approved'}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={`px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all ${event.approvalStatus === 'Rejected' ? 'cursor-not-allowed opacity-50' : ''}`}
                                        onClick={event.approvalStatus === 'Rejected' ? null : () => updateEventStatus(event._id, 'Rejected')}

                                    >
                                        Reject
                                    </button>
                                </div>
                                <div className="text-center mb-4 mt-8 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow-md">
                                    <h1 className="text-xl font-semibold">This event has not been approved yet.</h1>
                                    <p className="mt-2">The event is currently awaiting approval from the admin team. Please check back later.</p>
                                </div>
                            </div>
                        )}

                    </div>
                ))}
                {events.map(event => (
                    <>
                        {event.approvalStatus === 'Approved' && (
                            <div key={event._id} className="bg-white shadow-md rounded-lg border border-gray-200 p-4">

                                <>
                                    <div className='flex justify-center'>
                                        <div>
                                            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                                            <p><strong>Description:</strong> {event.description}</p>
                                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                            <p><strong>Location:</strong> {event.location}</p>
                                            <p><strong>Status:</strong> {event.approvalStatus}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 md:gap-5 mt-4 justify-center">
                                        <button
                                            className={`px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all ${event.approvalStatus === 'Approved' ? 'cursor-not-allowed opacity-50' : ''}`}
                                            onClick={event.approvalStatus === 'Approved' ? null : () => updateEventStatus(event._id, 'Approved')}
                                            disabled={event.approvalStatus === 'Approved'}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className={`px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all ${event.approvalStatus === 'Rejected' ? 'cursor-not-allowed opacity-50' : ''}`}
                                            onClick={event.approvalStatus === 'Rejected' ? null : () => updateEventStatus(event._id, 'Rejected')}

                                        >
                                            Reject
                                        </button>

                                    </div>
                                    <EventAnalytics event={event} />
                                </>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
