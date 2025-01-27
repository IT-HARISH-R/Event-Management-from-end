import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const Navbar = () => {
    const user = useSelector((state) => state.user.user); // Get user from Redux store
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    console.log("------------", user);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold hover:text-gray-400">
                    Event Management
                </Link>

                {/* Hamburger Menu */}
                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Links for Desktop */}
                <div className="hidden lg:flex space-x-6">
                    <Link
                        to="/"
                        className="text-lg hover:text-gray-400 transition duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to="/search"
                        className="text-lg hover:text-gray-400 transition duration-300"
                    >
                        Search
                    </Link>
                    <Link
                        to="/Schedule"
                        className="text-lg hover:text-gray-400 transition duration-300"
                    >
                        Schedule
                    </Link>
                    {user && user.role === 'organizers' ?
                        (

                            <Link
                                to="/organizers/dashboard"
                                className="text-lg hover:text-gray-400 transition duration-300"
                            >
                                Dashboard
                            </Link>
                        )
                        : (
                            <Link
                                to="/dashboard"
                                className="text-lg hover:text-gray-400 transition duration-300"
                            >
                                Dashboard
                            </Link>
                        )}
                    {user && user.role === 'organizers' && (
                        <Link
                            to="/EventForm"
                            className="text-lg hover:text-gray-400 transition duration-300"
                        >
                            EventForm
                        </Link>
                    )}
                </div>

                {/* User Profile or Login */}
                {!user ? (
                    <div className="hidden lg:flex items-center space-x-4 ">
                        <Link
                            to="/login"
                            className="text-lg hover:text-gray-400 transition duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="text-lg bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-400 transition duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <div className="items-center space-x-4 hidden lg:flex">
                        <Link
                            to="/profile"
                            className="text-lg bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-400 transition duration-300"
                        >
                            Profile
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden flex flex-col items-center space-y-4 mt-4">
                    <Link
                        to="/"
                        className="text-lg hover:text-gray-400 transition duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to="/search"
                        className="text-lg hover:text-gray-400 transition duration-300"
                    >
                        Search
                    </Link>
                    {user && (
                        <>
                            <Link
                                to="/EventForm"
                                className="text-lg hover:text-gray-400 transition duration-300"
                            >
                                EventForm
                            </Link>
                            {user.role === 'organizers' ?
                                (

                                    <Link
                                        to="/organizers/dashboard"
                                        className="text-lg hover:text-gray-400 transition duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                )
                                : (
                                    <Link
                                        to="/dashboard"
                                        className="text-lg hover:text-gray-400 transition duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                        </>
                    )}
                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="text-lg hover:text-gray-400 transition duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-lg bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-400 transition duration-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/profile"
                            className="text-lg bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-400 transition duration-300"
                        >
                            Profile
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;












// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// const Navbar = () => {


//     const user = useSelector((state) => state.user.user); // Get user from Redux store
//     const dispatch = useDispatch();

//     console.log("------------", user)

//     return (
//         <nav className="bg-gray-900 text-white p-4 shadow-md">
//             <div className="container mx-auto flex justify-between items-center">
//                 <Link to="/" className="text-2xl font-bold hover:text-gray-400">
//                     Event Management
//                 </Link>

//                 <div className="flex space-x-6">
//                     <Link
//                         to="/"
//                         className="text-lg hover:text-gray-400 transition duration-300"
//                     >
//                         Home
//                     </Link>
//                     <Link
//                         to="/search"
//                         className="text-lg hover:text-gray-400 transition duration-300"
//                     >
//                         Search
//                     </Link>
//                     {user&&
//                     <Link
//                         to="/EventForm"
//                         className="text-lg hover:text-gray-400 transition duration-300"
//                     >
//                         EventForm
//                     </Link>
//                     }
//                 </div>

//                 {/* User Profile or Login */}

//                 {!user ? (
//                     <div className="flex items-center space-x-4">
//                         <Link
//                             to="/login"
//                             className="text-lg hover:text-gray-400 transition duration-300"
//                         >
//                             Login
//                         </Link>
//                         <Link
//                             to="/signup"
//                             className="text-lg bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-400 transition duration-300"
//                         >
//                             Sign Up
//                         </Link>
//                     </div>
//                 ) : (
//                     <div className="flex items-center space-x-4">
//                         <Link
//                             to="/profile"
//                             className="text-lg bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-400 transition duration-300"
//                         >
//                             Profile
//                         </Link>
//                     </div>
//                 )}


//             </div>
//         </nav>
//     );
// };

// export default Navbar;
