import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../axios';
import Loading from './Loading';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/event/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {event && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Event Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4">{event.title}</h1>
            <img
              src={event.images?.[0]?.url || 'https://via.placeholder.com/500'}
              alt={event.title}
              className="w-full h-56 lg:h-72 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700 text-sm lg:text-lg">{event.description}</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-500 text-sm lg:text-lg">
                <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm lg:text-lg">
                <span className="font-semibold">Time:</span> {event.time}
              </p>
              <p className="text-gray-500 text-sm lg:text-lg">
                <span className="font-semibold">Location:</span> {event.location}
              </p>
            </div>

            <div className="mt-4">
              <h2 className="text-lg lg:text-2xl font-semibold mb-2">Tickets</h2>
              {event.ticketTypes.map((ticket, index) => (
                <p key={index} className="text-gray-600 text-sm lg:text-lg">
                  <span className="font-semibold">{ticket.type}:</span> ₹{ticket.price} | Available: {ticket.quantity}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column - Ticket Booking and Video */}
          <div className="flex flex-col items-center">
            <Link to={`/booking/${id}`} className="w-full">
              <button className="w-full lg:w-3/4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
                Book Now
              </button>
            </Link>

            {event.videos?.length > 0 && (
              <div className="mt-6 w-full">
                <h2 className="text-lg lg:text-2xl font-semibold mb-3">Event Video</h2>
                <video controls className="w-full rounded-md shadow-lg">
                  <source src={event.videos[0].url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;




