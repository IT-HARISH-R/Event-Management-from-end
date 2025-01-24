import React, { useState } from 'react';
import api from '../axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minprice, setminprice] = useState('');
  const [maxprice, setmaxprice] = useState('');
  const [error, setError] = useState('');

  // Handle search function
  const handleSearch = async () => {
    
    if(filterType === 'price'){
      setSearch(`${minprice}-${maxprice}`)
      console.log(search)
    }

    if (!search || !filterType) {
      alert("Please enter a search term and select a filter type.");
      return;
    }

    setLoading(true); // Start loading
    setError(''); // Clear previous error

    try {
      // Prepare the query parameters for GET request
      const queryParams = { search, filterType };

      // Send GET request with query parameters
      const response = await api.get('/event/filter', { params: queryParams });

      setData(response.data); // Set response data
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events. Please try again later.'); // Set error state
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mx-auto p-4">

      {/* Search and filter form */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Search Events</h2>

        <div className="flex space-x-4">

        {filterType === 'price' ? (
  <div>
    <input
      type="text"
      value={minprice}
      onChange={(e) => setminprice(e.target.value)}
      placeholder="Min Price"
      className="p-2 border border-gray-300 rounded-md flex-1"
    />
    <input
      type="text"
      value={maxprice}
      onChange={(e) => setmaxprice(e.target.value)}
      placeholder="Max Price"
      className="p-2 border border-gray-300 rounded-md flex-1"
    />
  </div>
) : (
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search for events"
    className="p-2 border border-gray-300 rounded-md flex-1"
  />
)}



          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1"
          >
            <option value="">Filter by</option>
            <option value="category">Category</option>
            <option value="date">Date</option>
            <option value="location">Location</option>
            <option value="price">Price</option>
          </select>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Search
        </button>
      </div>

      {/* Display error if exists */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6">Events</h1>

          {/* Display events */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {data.length === 0 ? (
              <div className="text-center col-span-full">No events available</div>
            ) : (
              data.map((event) => (
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
      )}
    </div>
  );
};

export default Search;
