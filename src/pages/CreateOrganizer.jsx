import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../axios"; // Import your axios instance
import { toast } from "react-toastify";

const CreateOrganizer = () => {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/"); // Redirect if not admin
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await api.post("/admin/create-organizer", formData);
            console.log(response.data)
            console.log(response.data.status)
            if(response.data.status){
                
                toast.success("Organizer created successfully!");
                navigate('/')
            }
            // setFormData({ name: "", email: "", password: "" });
        } catch (error) {
            console.error("Error creating organizer:", error);
            toast.error("Failed to create organizer.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
                <h1 className="text-2xl font-bold text-center text-gray-800 m-4">
                    Create Organizer
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white py-2 rounded-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Organizer"}
                    </button>
                </form>
            </div>
    );
};

export default CreateOrganizer;
