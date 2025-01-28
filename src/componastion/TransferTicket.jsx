import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios";

const TransferTicket = () => {
  const { ticketId } = useParams(); // Get ticket ID from the route
  const [newAttendeeEmail, setNewAttendeeEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(ticketId)
  console.log(newAttendeeEmail)

  const handleTransfer = async (e) => {
    e.preventDefault();  
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post("/ticket/transfer", {
        ticketId,
        newAttendeeEmail,
      });

      if (response.data.message) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to the dashboard after successful transfer
        }, 500);
      }
    } catch (err) {
      console.error("Error transferring ticket:", err);
      setError(
        err.response?.data?.message || "An error occurred while transferring the ticket."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Transfer Ticket</h1>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleTransfer}>
          <div className="mb-6">
            <label
              htmlFor="newAttendeeEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Attendee Email
            </label>
            <input
              type="email"
              id="newAttendeeEmail"
              value={newAttendeeEmail}
              onChange={(e) => setNewAttendeeEmail(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new attendee's email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Transferring..." : "Transfer Ticket"}
          </button>
        </form>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TransferTicket;













// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../axios";

// const TransferTicket = () => {
//   const { ticketId } = useParams(); // Get ticket ID from the route
//   const [newAttendeeEmail, setNewAttendeeEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   console.log(ticketId)
//   console.log(newAttendeeEmail)

//   const handleTransfer = async (e) => {
//     e.preventDefault();  
//     setLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       const response = await api.post("/ticket/transfer", {
//         ticketId,
//         newAttendeeEmail,
//       });

//       if (response.data.message) {
//         setMessage(response.data.message);
//         setTimeout(() => {
//           navigate("/dashboard"); // Redirect to the dashboard after successful transfer
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Error transferring ticket:", err);
//       setError(
//         err.response?.data?.message || "An error occurred while transferring the ticket."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Transfer Ticket</h1>

//         {message && <p className="text-green-500 mb-4">{message}</p>}
//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form onSubmit={handleTransfer}>
//           <div className="mb-4">
//             <label
//               htmlFor="newAttendeeEmail"
//               className="block text-sm font-medium text-gray-700"
//             >
//               New Attendee Email
//             </label>
//             <input
//               type="email"
//               id="newAttendeeEmail"
//               value={newAttendeeEmail}
//               onChange={(e) => setNewAttendeeEmail(e.target.value)}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter new attendee's email"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
//           >
//             {loading ? "Transferring..." : "Transfer Ticket"}
//           </button>
//         </form>

//         <button
//           onClick={() => navigate("/dashboard")}
//           className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TransferTicket;
