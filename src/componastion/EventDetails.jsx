import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../axios';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the event ID from the URL

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/event/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Error fetching event details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <div className="p-4">Loading event details...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      {event && (
        <>
          <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={`http://localhost:3000/${event.images[0]}`}
              alt={event.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600">{event.description}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Time: {event.time}</p>
              <p className="text-sm text-gray-500">Location: {event.location}</p>
              <p className="text-sm text-gray-500">Price: ₹{event.ticketPrice}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Event Video</h2>
              <video controls className="w-full mt-2">
                <source src={`http://localhost:3000/${event.videos[0]}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Booking Button */}
            <div className="mt-6">
              <Link to={`/booking/${id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;
