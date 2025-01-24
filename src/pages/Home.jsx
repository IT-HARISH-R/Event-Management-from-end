import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../axios';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/event'); 
        setEvents(response.data); 
        console.log(response.data)
      } catch (err) {
        setError('Error fetching events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="p-4">Loading events...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6"> Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {events.length === 0 ? (
          <div className="text-center col-span-full">No events available</div>
        ) : (
          events.map((event) => (
            <div key={event._id} className="relative pb-20 bg-white p-6 rounded-lg shadow-lg">
              <img
                src={`http://localhost:3000/${event.images[0]}`}
                alt={event.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl text-center lg:text-3xl font-semibold text-gray-800">{event.title}</h2>
              <div className="mt-4">
                <p className="text-sm text-gray-500 lg:text-2xl">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 lg:text-2xl">Location: {event.location}</p>
                <p className="text-sm text-gray-500 lg:text-2xl">Price: ₹{event.ticketPrice}</p>
              </div>
              <Link
                to={`/event/${event._id}`}
                className="absolute bottom-6 left-[50%] translate-x-[-50%]  bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-400 transition duration-300 text-center"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;



// import React, { useEffect, useState } from 'react';
// import api from '../axios';

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await api.get('/event'); 
//         setEvents(response.data); 
//         console.log(response.data)
//       } catch (err) {
//         setError('Error fetching events');
//         console.error(err);

//       } finally {
//         setLoading(false);
//       }
//     };   

//     fetchEvents();
//   }, []);
  
//   if (loading) return <div className="p-4">Loading events...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {events.length === 0 ? (
//           <div className="text-center col-span-full">No events available</div>
//         ) : (
//           events.map((event) => (
//             <div key={event._id} className="bg-white p-6 rounded-lg shadow-lg">
//               <img
//                 src={`http://localhost:3000/${event.images[0]}`}
//                 alt={event.title}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
//               <p className="text-gray-600 mt-2">{event.description}</p>
//               <div className="mt-4">
//                 <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
//                 <p className="text-sm text-gray-500">Location: {event.location}</p>
//                 <p className="text-sm text-gray-500">Price: ₹{event.ticketPrice}</p>
//               </div>
//               <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-400 transition duration-300">
//                 Book Now
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;