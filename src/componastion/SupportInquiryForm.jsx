import React, { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";

const SupportInquiryForm = () => {
    const navgater = useNavigate()
    const [formData, setFormData] = useState({
        subject: "",
        inquiry: "",
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage("");

        try {
            const response = await api.post("/admin/support", formData);
            setResponseMessage(response.data.message);

            setFormData({ userId: "", subject: "", inquiry: "" });
            navgater("/")
        } catch (error) {
            setResponseMessage(
                error.response?.data?.message || "Failed to submit the inquiry."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Submit a Support Inquiry</h1>
            {responseMessage && (
                <div
                    className={`p-4 mb-4 rounded-lg ${responseMessage.toLowerCase().includes("failed")
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                        }`}
                >
                    {responseMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="inquiry"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Inquiry  <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="inquiry"
                        name="inquiry"
                        rows="4"
                        value={formData.inquiry}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default SupportInquiryForm;
