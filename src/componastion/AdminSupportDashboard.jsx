import React, { useState, useEffect } from "react";
import axios from "../axios"; // Adjust the path to your axios instance
import Loading from "./Loading";

const AdminSupportDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [reply, setReply] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch all inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.post("/admin/support/get");
        setInquiries(response.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // Handle reply submission
  const handleReply = async (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    try {
      const response = await axios.post(`/admin/support/reply`, {
        inquiryId: selectedInquiry._id,
        reply,
      });

      setResponseMessage(response.data.message);
      setReply("");

      // Update the inquiries list with the reply
      setInquiries((prevInquiries) =>
        prevInquiries.map((inq) =>
          inq._id === selectedInquiry._id
            ? { ...inq, reply, status: "Replied" }
            : inq
        )
      );

      setSelectedInquiry(null);
    } catch (error) {
      console.error("Error sending reply:", error);
      setResponseMessage("Failed to send the reply. Please try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Support Dashboard</h1>

      {responseMessage && (
        <div
          className={`p-4 mb-4 rounded-lg ${
            responseMessage.toLowerCase().includes("failed")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {responseMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-2">{inquiry.subject}</h2>
            <p>
              <strong>User ID:</strong> {inquiry.userId}
            </p>
            <p>
              <strong>Inquiry:</strong> {inquiry.inquiry}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  inquiry.status === "Replied"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {inquiry.status}
              </span>
            </p>

            {inquiry.reply ? (
              <p className="mt-4 p-2 bg-green-100 text-green-800 rounded-lg">
                <strong>Reply:</strong> {inquiry.reply}
              </p>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setSelectedInquiry(inquiry)}
              >
                Reply
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Reply to Inquiry</h2>
            <form onSubmit={handleReply}>
              <div className="mb-4">
                <label
                  htmlFor="reply"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Reply
                </label>
                <textarea
                  id="reply"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  required
                  className="w-full p-2 border rounded-lg"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  onClick={() => setSelectedInquiry(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupportDashboard;
