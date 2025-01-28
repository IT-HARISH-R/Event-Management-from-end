import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import api from "../axios";
import EventAnalytics from "./EventAnalytics";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AttendeeList = () => {
  const user = useSelector((state) => state.user.user); // Get user from Redux store
  const navigate = useNavigate()
  console.log(":::::::::::::", !user.role === 'organizers')

  if (user.role === 'user') {
    navigate("/")
  }
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Fetch events organized by the current user
      const response = await api.get("/ticket/getorgid");
      console.log("Events:", response.data);

      if (!response.data || response.data.length === 0) {
        setEvents([]);
        return;
      }

      // Fetch attendees for each event  
      const eventData = await Promise.all(
        response.data.map(async (event) => {
          const attendees = await Promise.all(
            event.candidates.map(async (candidateId) => {
              const candidateResponse = await api.post("/auth/getbyid", {
                userid: candidateId,
              });
              return candidateResponse.data.user;
            })
          );
          return { ...event, attendees };
        })
      );

      console.log("Event Data with Attendees:", eventData);
      setEvents(eventData); // Store events with attendee data
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div>

      </div>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Attendee List by Events
      </h1>

      {/* Event-wise Attendee List */}
      {events.map((event) => (
        <div key={`${event._id}-${Math.random()}`} className="mb-8 bg-white shadow-md rounded-lg p-6">
          {/* Event Details */}
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Event: {event.title} ({event.category})
            </h2>
            <Link
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              to={`/schedule/${event._id}`}
            >
              Add Schedule
            </Link>
          </div>
          <p className="mb-4 text-gray-600">
            <span className="font-semibold">Location:</span> {event.location} &nbsp;|&nbsp;
            <span className="font-semibold">Date:</span> {new Date(event.date).toDateString()}
          </p>

          {/* Attendee Table */} 
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full text-left text-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-4 py-2 text-gray-700">Name</th>
                  <th className="border px-4 py-2 text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody>
                {event.attendees.length > 0 ? (
                  event.attendees.map((attendee) => (
                    <tr key={`${attendee._id}-${Math.random()}`} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{attendee.username}</td>
                      <td className="border px-4 py-2">{attendee.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border px-4 py-2 text-gray-500" colSpan="2">
                      No attendees found for this event.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Event Analytics */}
          <div className="mt-4">
            <EventAnalytics event={event} />
            {/* Export Button */}
            <div className="text-center mt-4">
              {console.log("oooooooooooooooooo", event)}
              <CSVLink
                data={event.attendees.map((attendee) => ({
                  eventName: event.title,
                  eventCategory: event.category,
                  username: attendee.username,
                  email: attendee.email,
                  phone: attendee.phone,
                  paymentStatus: attendee.paymentStatus,
                }))
                }
                filename="attendees_by_events.csv"
                className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
              >
                Export All as CSV
              </CSVLink>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default AttendeeList;












