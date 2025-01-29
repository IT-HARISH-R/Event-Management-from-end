import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const PassworeForgot = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const FormSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Email required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/forgotpassword', { email });
            if (response.data.status) {
                alert('Check your email for the reset password link');
                navigate("/login");
            }


        } catch (err) {
            console.error('Login Error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }

    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={FormSubmit}
                className="bg-white p-6 rounded-md shadow-md w-96"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'
                        } transition duration-300`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>)
}

export default PassworeForgot;