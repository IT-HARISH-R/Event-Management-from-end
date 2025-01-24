import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios'; // Ensure the axios instance is correctly configured
import { useDispatch } from 'react-redux';
import { login } from '../Slice/userSlice ';
// import { setUser } from '../Slice/userSlice ';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.status) {
        // Save the token to localStorage
        localStorage.setItem('token', response.data.token);
        console.log(`Bearer ${localStorage.getItem('token')}`);

        // Dispatch user data to Redux store
        // dispatch(setUser(response.data.user));
        console.log(response.data)
        const fetchProfile = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('Token missing. Please log in.');
            }

            const response = await api.get('/auth/profile');
            dispatch(login(response.data));
            navigate('/');
          } catch (err) {
            setError(err.message || 'Failed to fetch profile.');
            console.error(err);
          }
        };
        // Navigate to the profile page
        fetchProfile()
      } else {
        setError(response.data.message || 'Login failed');
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
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-md shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

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

        <div className="mb-4">
          <label htmlFor="password" className="block text-lg mb-2">
            Password
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
          className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'
            } transition duration-300`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
