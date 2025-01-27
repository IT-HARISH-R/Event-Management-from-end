import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import api from "../axios";

const AttendeeList = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, [filter, search]);

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
    <div className="p-4">
      {/* Filters */}
      {/* <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2"
        />
      </div> */}

      <h1 className="text-2xl font-bold mb-4">Attendee List by Events</h1>

      {/* Event-wise Attendee List */}
      {events.map((event) => (
        <div key={event._id} className="mb-6">
          {/* Event Details */}
          <h2 className="text-xl font-semibold mb-2">
            Event: {event.title} ({event.category})
          </h2>
          <p className="mb-2">
            Location: {event.location}, Date: {new Date(event.date).toDateString()}
          </p>

          {/* Attendee Table */}
          <table className="table-auto border-collapse w-full mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                {/* <th className="border px-4 py-2">Phone</th> */}
                {/* <th className="border px-4 py-2">Payment Status</th> */}
              </tr>
            </thead>
            <tbody>
              {event.attendees.length > 0 ? (
                event.attendees.map((attendee) => (
                  <tr key={attendee._id}>
                    <td className="border px-4 py-2">{attendee.username}</td>
                    <td className="border px-4 py-2">{attendee.email}</td>
                    {/* <td className="border px-4 py-2">{attendee.phone}</td> */}
                    {/* <td className="border px-4 py-2">{attendee.paymentStatus}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2" colSpan="4">
                    No attendees found for this event.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}

      {/* Export Button */}
      <CSVLink
        data={events.flatMap((event) =>
          event.attendees.map((attendee) => ({
            eventName: event.title,
            eventCategory: event.category,
            username: attendee.username,
            email: attendee.email,
            phone: attendee.phone,
            paymentStatus: attendee.paymentStatus,
          }))
        )}
        filename="attendees_by_events.csv"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Export All as CSV
      </CSVLink>
    </div>
  );
};

export default AttendeeList;


















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CSVLink } from "react-csv";
// import api from "../axios";

// const AttendeeList = () => {
//   const [attendees, setAttendees] = useState([]);
//   const [filter, setFilter] = useState("");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchAttendees();
//   }, [filter, search]);

//   const fetchAttendees = async () => {
//     try {
//       // Fetch events organized by the current user
//       const response = await api.get("/ticket/getorgid");
//       console.log("Events:", response.data);
  
//       // Ensure response.data contains expected structure
//       if (!response.data || response.data.length === 0) {
//         setAttendees([]);
//         return;
//       }
  
//       // Fetch attendee details for each candidate in the event
//       const data = await Promise.all(
//         response.data.flatMap((event) =>
//           event.candidates.map(async (candidateId) => {
//             const candidateResponse = await api.post("/auth/getbyid", {
//               userid: candidateId,
//             });
//             return candidateResponse.data.user;
//           })
//         )
//       );
  
//       console.log("Candidates:", data); 
//       setAttendees(data); // Store candidate details in state
//     } catch (err) {
//       console.error("Error fetching attendees:", err);
//     }
//   };
  
  

//   return (
//     <div className="p-4">

//       {/* Filters */}
//       <div className="mb-4">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border p-2 mr-2" 
//         >
//           <option value="">All</option>
//           <option value="Paid">Paid</option>
//           <option value="Pending">Pending</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2"
//         />
//       </div>
//       <h1 className="text-2xl font-bold mb-4">Attendee List: </h1>

//       {/* Table */}
//       <table className="table-auto border-collapse w-full mb-4">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Email</th>
//             <th className="border px-4 py-2">Phone</th>
//             <th className="border px-4 py-2">Ticket Type</th>
//             <th className="border px-4 py-2">Payment Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendees.map((attendee) => (
//             <tr key={attendee._id}>
//               <td className="border px-4 py-2">{attendee.username}</td>
//               <td className="border px-4 py-2">{attendee.email}</td>
//               <td className="border px-4 py-2">{attendee.phone}</td>
//               <td className="border px-4 py-2">{attendee.ticketType}</td>
//               <td className="border px-4 py-2">{attendee.paymentStatus}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Export Button */}
//       <CSVLink
//         data={attendees}
//         filename="attendees.csv"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Export as CSV
//       </CSVLink>
//     </div>
//   );
// };

// export default AttendeeList;
