import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../axios';

const UserAccounts = () => {
    // Sample state for user accounts
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch user data from API
        const fetchUsers = async () => {
            const response = await api.get('/admin/getalluser'); // Replace with your API endpoint
            console.log(response.data);
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    // Function to return role-based color classes
    const getRoleColor = (role) => {
        if (role === 'organizers') {
            return 'text-blue-600'; // Green color for organizer
        } else {
            return 'text-green-600'; // Blue color for user
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">User Accounts</h1>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-left table-auto">
                    <thead className="bg-gray-200 ">
                        <tr>
                            <th className="py-3 px-4 text-gray-700">Name</th>
                            <th className="py-3 px-4 text-gray-700">Email</th>
                            <th className="py-3 px-4 text-gray-700">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b">{user.username}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className={`py-2 px-4 border-b ${getRoleColor(user.role)}`}>
                                        {user.role}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserAccounts;
