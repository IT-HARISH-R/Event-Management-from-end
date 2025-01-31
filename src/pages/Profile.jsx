import React, { useEffect, useState } from 'react';
import api from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
import { login, logout } from '../Slice/userSlice ';
import Loading from '../componastion/Loading';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token missing. Please log in.');
        }

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

  if (loading) return  <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>

        {user &&
          <>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Name:</h3>
              <p className="text-gray-600">{user.username}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Email:</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Role:</h3>
              <p className="text-gray-600">{user.role || 'User'}</p>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-400 transition duration-300"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>

        }
        {!user &&
          <p>Profile not found</p>
        }
      </div>
    </div>
  );
};

export default Profile;
