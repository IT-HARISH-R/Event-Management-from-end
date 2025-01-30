// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../axios';

// const UserAccounts = () => {
//     // Sample state for user accounts (replace with actual data fetching logic)
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         // Example fetch to get user data (replace with real API call)
//         const fetchUsers = async () => {
//             const response = await api.get('/admin/getalluser'); // Replace with your API endpoint
//             console.log(response.data)
//             const data = await response.json();
//             setUsers(data);
//         };

//         fetchUsers();
//     }, []);

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-semibold text-gray-800">User Accounts</h1>
//                 <Link
//                     to="/add-user"
//                     className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
//                 >
//                     Add New User
//                 </Link>
//             </div>
            
//             <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//                 <table className="min-w-full text-left table-auto">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="py-3 px-4 text-gray-700">ID</th>
//                             <th className="py-3 px-4 text-gray-700">Name</th>
//                             <th className="py-3 px-4 text-gray-700">Email</th>
//                             <th className="py-3 px-4 text-gray-700">Role</th>
//                             <th className="py-3 px-4 text-gray-700">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.length > 0 ? (
//                             users.map(user => (
//                                 <tr key={user.id}>
//                                     <td className="py-2 px-4 border-b">{user.id}</td>
//                                     <td className="py-2 px-4 border-b">{user.name}</td>
//                                     <td className="py-2 px-4 border-b">{user.email}</td>
//                                     <td className="py-2 px-4 border-b">{user.role}</td>
//                                     <td className="py-2 px-4 border-b">
//                                         <Link to={`/edit-user/${user.id}`} className="text-blue-600 hover:text-blue-800">
//                                             Edit
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="5" className="py-4 text-center text-gray-500">
//                                     No users found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserAccounts;
