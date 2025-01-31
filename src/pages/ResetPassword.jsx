import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../axios';
import { toast } from 'react-toastify';

// API instance


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const FormSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setError('Password is required.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post(`/auth/reset-password/${token}`, { password });

            if (response.data.status) {
                toast.success('Your password has been reset successfully.');
                navigate("/login");
            }
        } catch (err) {
            console.error('Reset Password Error:', err);
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
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="password" className="block text-lg mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-4 py-2 rounded-md text-white ${
                        loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'
                    } transition duration-300`}
                >
                    {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
