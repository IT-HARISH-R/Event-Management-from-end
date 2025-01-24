import React, { useState } from 'react';
import api from '../axios';

const Search = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  // Handle search function
  const handleSearch = async () => {
    try {
      // Prepare the query parameters for GET request
      const queryParams = { search, filterType };

      // Send GET request with query parameters
      const response = await api.get('/event/filter', { params: queryParams });

      console.log(response.data); // Update the events based on search
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Search Events</h2>

      <div className="flex space-x-4">
        {/* Text input for search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for events"
          className="p-2 border border-gray-300 rounded-md flex-1"
        />

        {/* Select input for filter type */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-1"
        >
          <option value="">Filter by</option>
          <option value="title">category</option>
          <option value="date">Date</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
