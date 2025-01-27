import React, { useState, useEffect } from "react";
import api from "../axios";
import { Link } from "react-router-dom";
import EventSchedule from "../componastion/EventSchedule";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [ticketData, setTicketData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await api.get("/auth/profile");
        const user = profileResponse.data.user;
        setUser(user);

        // Fetch ticket data
        const ticketResponses = await Promise.all(
          user.ticketId.map(async (id) => {
            const response = await api.get(`/ticket/getTicketbyId/${id}`);
            return response.data;
          })
        );
        setTicketData(ticketResponses);

        // Fetch event data based on tickets
        const eventResponses = await Promise.all(
          ticketResponses.map(async (ticket) => {
            if (ticket && ticket.eventId) {
              const response = await api.get(`/event/${ticket.eventId}`);
              return response.data;
            }
            return null;
          })
        );
        setEventData(eventResponses); // Filter out null values
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTicket = async (ticketId) => {
    try {
      await api.delete(`/ticket/cancel/${ticketId}`);
      alert("Ticket canceled successfully.");

      // Reload ticket and event data
      setLoading(true);
      const profileResponse = await api.get("/auth/profile");
      const user = profileResponse.data.user;
      setUser(user);

      // Refetch ticket data
      const ticketResponses = await Promise.all(
        user.ticketId.map(async (id) => {
          const response = await api.get(`/ticket/getTicketbyId/${id}`);
          return response.data;
        })
      );
      setTicketData(ticketResponses);

      // Refetch event data
      const eventResponses = await Promise.all(
        ticketResponses.map(async (ticket) => {
          if (ticket && ticket.eventId) {
            const response = await api.get(`/event/${ticket.eventId}`);
            return response.data;
          }
          return null;
        })
      );
      setEventData(eventResponses);
    } catch (err) {
      console.error("Error deleting ticket:", err);
      alert("An error occurred while deleting the ticket.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

        {/* User Information */}
        {user && (
          <div className="mb-6">
            <div className="mb-4">
              <strong>Username:</strong> {user.username}
            </div>
            <div className="mb-4">
              <strong>Email:</strong> {user.email}
            </div>
          </div>
        )}

        {/* Ticket Data */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Ticket Data</h2>

          {ticketData.length > 0 ? (
            ticketData.map((ticket, index) => {
              if (!ticket) return null; // Skip if ticket is null
              const event = eventData[index];

              return (
                <div key={index} className="p-4 bg-gray-50 border rounded mb-4">
                  {/* Event Image */}
                  {event && (
                    <img
                      src={`http://localhost:3000/${event.images}`}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}

                  <div className="mt-10">
                    <strong>Name of Candidates: </strong> {user ? user.username : "Candidates data not available"}
                  </div>
                  <div className="mt-2">
                    <strong>Event title: </strong> {event ? event.title : "Event data not available"}
                  </div>
                  <div className="mt-2">
                    <strong>Ticket Type:</strong> {ticket ? ticket.ticketType : "Ticket type not available"}
                  </div>
                  <div className="mt-2">
                    <strong>Quantity:</strong> {ticket ? ticket.quantity : "Quantity not available"}
                  </div>
                  <div className="mt-2">
                    <strong>Total Amount:</strong> ₹{ticket ? ticket.totalAmount : "Amount not available"}
                  </div>
                  <div className="mt-2">
                    <strong>Event Date: </strong>
                    {event ? new Date(event.date).toLocaleDateString() : "Event date not available"}
                  </div>
                  <div className="mt-2">
                    <strong>Event Location: </strong> {event ? event.location : "Event location not available"}
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleDeleteTicket(ticket._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    >
                      Cancel
                    </button>
                    <Link
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                      to={`/ticket/transfer/${ticket._id}`}
                    >
                      Transfer
                    </Link>
                    {/* <Link
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                      to={`/Schedule/${event._id}`}
                    >
                     Add Schedule
                    </Link> */}
                  </div>
                  {/* <EventSchedule eventId={event._id} /> */}
                  </div>
              );
            })
          ) : (
            <p>No ticket data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;








// import React, { useState, useEffect } from "react";
// import api from "../axios";
// import { Link } from "react-router-dom";
// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [ticketData, setTicketData] = useState([]);
//   const [eventData, setEventData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const profileResponse = await api.get("/auth/profile");
//         const user = profileResponse.data.user;
//         setUser(user);

//         // Fetch ticket data
//         const ticketResponses = await Promise.all(
//           user.ticketId.map(async (id) => {
//             const response = await api.get(`/ticket/getTicketbyId/${id}`);
//             return response.data;
//           })
//         );
//         setTicketData(ticketResponses);
//         console.log(ticketResponses)

//         // Fetch event data based on tickets
//         const eventResponses = await Promise.all(
//           ticketResponses.map(async (ticket) => {
//             {console.log("------------------",ticket)}
//             if (ticket && ticket.eventId) {
//               const response = await api.get(`/event/${ticket.eventId}`);
//               return response.data;
//             }
//             return null;
//           })
//         );
//         console.log("lllllllllllllllll",eventResponses)
//         setEventData(eventResponses); // Filter out null values
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching data.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDeleteTicket = async (ticketId) => {
//       try {
//         await api.delete(`/ticket/cancel/${ticketId}`);
//         alert("Ticket canceled successfully.");

//         // Reload ticket and event data
//         setLoading(true); // Show loading while refreshing data
//         const profileResponse = await api.get("/auth/profile");
//         const user = profileResponse.data.user;
//         setUser(user);

//         // Refetch ticket data
//         const ticketResponses = await Promise.all(
//           user.ticketId.map(async (id) => {
//             const response = await api.get(`/ticket/getTicketbyId/${id}`);
//             return response.data;
//           })
//         );
//         setTicketData(ticketResponses);

//         // Refetch event data
//         const eventResponses = await Promise.all(
//           ticketResponses.map(async (ticket) => {
//             if (ticket && ticket.eventId) {
//               const response = await api.get(`/event/${ticket.eventId}`);
//               return response.data;
//             }
//             return null;
//           })
//         );
//         setEventData(eventResponses.filter((event) => event !== null));
//       } catch (err) {
//         console.error("Error deleting ticket:", err);
//         alert("An error occurred while deleting the ticket.");
//       } finally {
//         setLoading(false); // Hide loading
//       }

//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-5">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

//         {/* User Information */}
//         {user && (
//           <div className="mb-6">
//             <div className="mb-4">
//               <strong>Username:</strong> {user.username}
//             </div>
//             <div className="mb-4">
//               <strong>Email:</strong> {user.email}
//             </div>
//           </div>
//         )}

//         {/* Ticket Data */}
//         <div className="mt-6">
//           <h2 className="text-xl font-bold mb-4">Ticket Data</h2>

//           {ticketData.length > 0 ? (
//             ticketData.map((ticket, index) => {
//               if (!ticket) return null; // Skip if ticket is null
//               const event = eventData[index];

//               return (
//                 <div key={index} className="p-4 bg-gray-50 border rounded mb-4">
//                   {/* Event Title */}
//                   {/* {event && ( */}
//                     <img
//                       src={`http://localhost:3000/${eventData[index].images}`}
//                       alt={event.title}
//                       className="w-full h-48 object-cover rounded-md mb-4"
//                     />
//                     {console.log(eventData[index].images)}
//                   {/* // )} */}
//                   <div className="mt-10">
//                     <strong>Name of Candidates: </strong> {user ? user.username : "Candidates data not available"}
//                   </div>
//                   <div className="mt-2">
//                     <strong>Event title: </strong> {event ? event.title : "Event data not available"}
//                   </div>
//                   <div className="mt-2">
//                     <strong>Ticket Type:</strong> {ticket ? ticket.ticketType : "Ticket type not available"}
//                   </div>
//                   <div className="mt-2">
//                     <strong>Quantity:</strong> {ticket ? ticket.quantity : "Quantity not available"}
//                   </div>
//                   <div className="mt-2">
//                     <strong>Total Amount:</strong> ₹{ticket ? ticket.totalAmount : "Amount not available"}
//                   </div>
//                   <div className="mt-2">
//                      <strong>Event Date: </strong> 
//                      {event ? new Date(event.date).toISOString().split('T')[0] : "Event date not available"}
//                   </div>

//                   <div className="mt-2">
//                     <strong>Event Location: </strong> {event ? event.location : "Event location not available"}
//                   </div>

//                   {/* Buttons */}
//                   <div className="mt-4 flex justify-between">
//                     <button
//                       onClick={() => handleDeleteTicket(ticket._id)}
//                       className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
//                     >
//                       Cancel
//                     </button>
//                     <Link
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
//                       to={`/ticket/transfer/${ticket._id}`}
//                     >
//                       Transfer
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p>No ticket data available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
















// // import React, { useState, useEffect } from "react";
// // import api from "../axios";
// // import { Link } from "react-router-dom";

// // const Dashboard = () => {
// //   const [user, setUser] = useState(null);
// //   const [ticketData, setTicketData] = useState([]);
// //   const [eventData, setEventData] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(true);


// //   useEffect(() => {
// //     const fetchData = async () => {
// //       console.log("--------------------------1")
// //       try {
// //         console.log("--------------------------2")
// //         const profileResponse = await api.get("/auth/profile");
// //         const user = profileResponse.data.user;
// //         setUser(user);
// //         console.log("----------------", user)

// //         // Fetch ticket data
// //         const ticketResponses = await Promise.all(
// //           user.ticketId.map(async (id, index) => {
// //             const response = await api.get(`/ticket/getTicketbyId/${id}`);
// //             console.log(response)
// //             return response.data;
// //           })
// //         );
// //         console.log("---------------", ticketResponses)

// //         setTicketData(ticketResponses);

// //         // Fetch event data based on tickets
// //         const eventResponses = await Promise.all(
// //           ticketResponses.map(async (ticket) => {
// //             if (ticket && ticket.eventId) {
// //               const response = await api.get(`/event/${ticket.eventId}`);
// //               return response.data;
// //             }
// //             return null; // Return null if ticket or eventId is missing
// //           })
// //         );
// //         setEventData(eventResponses.filter((event) => event !== null)); // Filter out null values
// //       } catch (err) {
// //         setError(err.message || "An error occurred while fetching data.");
// //         console.error("Error fetching data:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handleDeleteTicket = async (ticketId) => {
// //     if (window.confirm("Are you sure you want to cancel this ticket?")) {
// //       try {
// //         console.log(ticketId)
// //         await api.delete(`/ticket/cancel/${ticketId}`);
// //         // setTicketData((prev) => prev.filter((ticket) => ticket._id !== ticketId));
// //         alert("Ticket canceled successfully.");
        
// //       } catch (err) {
// //         console.error("Error deleting ticket:", err);
// //         alert("An error occurred while deleting the ticket.");
// //       }
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //         <p>Loading...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //         <p className="text-red-500">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-5">
// //       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
// //         <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

// //         {/* User Information */}
// //         {user && (
// //           <div className="mb-6">
// //             <div className="mb-4">
// //               <strong>Username:</strong> {user.username}
// //             </div>
// //             <div className="mb-4">
// //               <strong>Email:</strong> {user.email}
// //             </div>
// //           </div>
// //         )}

// //         {/* Ticket Data */}
// //         <div className="mt-6">
// //           <h2 className="text-xl font-bold mb-4">Ticket Data</h2>

// //           {ticketData.length > 0 ? (
// //             ticketData.map((ticket, index) => {
// //               if (!ticket) return null; // Skip if ticket is null
// //               const event = eventData[index];

// //               return (
// //                 <div key={index} className="p-4 bg-gray-50 border rounded mb-4">
// //                   {/* Event Title */}
// //                   {event && (
// //                     <img
// //                       src={`http://localhost:3000/${event.images}`}
// //                       alt={event.title}
// //                       className="w-full h-48 object-cover rounded-md mb-4"
// //                     />
// //                   )}
// //                   <div className="mt-10">
// //                     <strong>Event title: </strong> {event ? event.title : "Event data not available"}
// //                   </div>
// //                   <div className="mt-2">
// //                     <strong>Ticket Type:</strong> {ticket ? ticket.ticketType : "Ticket type not available"}
// //                   </div>
// //                   <div className="mt-2">
// //                     <strong>Quantity:</strong> {ticket ? ticket.quantity : "Quantity not available"}
// //                   </div>
// //                   <div className="mt-2">
// //                     <strong>Total Amount:</strong> ₹{ticket ? ticket.totalAmount : "Amount not available"}
// //                   </div>
// //                   <div className="mt-2">
// //                     <strong>Event Date: </strong> {event ? event.date : "Event date not available"}
// //                   </div>
// //                   <div className="mt-2">
// //                     <strong>Event Location: </strong> {event ? event.location : "Event location not available"}
// //                   </div>

// //                   {/* Buttons */}
// //                   <div className="mt-4 flex justify-between">
// //                     <button
// //                       onClick={() => handleDeleteTicket(ticket._id)}
// //                       className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
// //                     >
// //                       Cancel
// //                     </button>
// //                     <Link
// //                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
// //                       to={`/ticket/transfer/${ticket._id}`}
// //                     >
// //                       Transfer
// //                     </Link>
// //                   </div>
// //                 </div>
// //               );
// //             })
// //           ) : (
// //             <p>No ticket data available.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
