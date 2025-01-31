import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import { toast } from "react-toastify";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }, { withCredentials: true });
            if (response.data.status) {
                toast.success('Sign Up successfully!');

                navigate("/login");
            }
        } catch (err) {
            console.error("Error Sign up:", err);
            toast.error(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSignup}
                className="bg-white p-6 rounded-md shadow-md w-96"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-lg mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        minLength={6}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-md transition duration-300 ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-400"
                        }`}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default Signup;