import React, { useEffect, useState } from 'react';
import api from '../axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
import { login } from '../Slice/userSlice ';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token missing. Please log in.');
                }

                // const decodedToken = jwtDecode(token);
                // if (decodedToken.exp * 1000 < Date.now()) {
                //     throw new Error('Token expired. Please log in again.');
                // }

                const response = await api.get('/auth/profile');
                setProfile(response.data);
                dispatch(login(response.data));
            } catch (err) {
                setError(err.message || 'Failed to fetch profile.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        alert('Logged out successfully!');
        navigate('/login');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>

                {profile ? (
                    <>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Name:</h3>
                            <p className="text-gray-600">{profile.username}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Email:</h3>
                            <p className="text-gray-600">{profile.email}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Role:</h3>
                            <p className="text-gray-600">{profile.role || 'User'}</p>
                        </div>
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-400 transition duration-300"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <p>Profile not found</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
