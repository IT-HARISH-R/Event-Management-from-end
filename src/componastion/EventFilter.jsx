import React, { useState } from 'react';

function EventFilters({ onFilter }) {
    const [filters, setFilters] = useState({
        search: '',
        dateFrom: '',
        dateTo: '',
        location: '',
        category: '',
        minPrice: '',
        maxPrice: '',
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleFilter = () => {
        onFilter(filters);
    };

    return (
        <div>
            <input name="search" placeholder="Search" value={filters.search} onChange={handleChange} />
            <input type="date" name="dateFrom" placeholder="From Date" value={filters.dateFrom} onChange={handleChange} />
            <input type="date" name="dateTo" placeholder="To Date" value={filters.dateTo} onChange={handleChange} />
            <input name="location" placeholder="Location" value={filters.location} onChange={handleChange} />
            <input name="category" placeholder="Category" value={filters.category} onChange={handleChange} />
            <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} />
            <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} />
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
}

export default EventFilters;
