import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {


    const user = useSelector((state) => state.user.user); // Get user from Redux store
    const dispatch = useDispatch();

    console.log("------------",user)

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold hover:text-gray-400">
                    Event Management
                </Link>

                <div className="flex space-x-6">
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
                        to="/EventForm"
                        className="text-lg hover:text-gray-400 transition duration-300"
                    >
                        EventForm
                    </Link>
                </div>

                {/* User Profile or Login */}
                <div className="flex items-center space-x-4">
                    {/* {user ? ():()} */}
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

                    <Link
                        to="/profile"
                        className="text-lg bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-400 transition duration-300"
                    >
                        Profile
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
