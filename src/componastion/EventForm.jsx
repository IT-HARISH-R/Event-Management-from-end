import React, { useState } from 'react';

function EventForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        ticketPrice: '',
        category: '',
        images: [],
        videos: [],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <input type="number" name="ticketPrice" placeholder="Ticket Price" value={formData.ticketPrice} onChange={handleChange} required />
            <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="text" name="images" placeholder="Image URLs (comma-separated)" value={formData.images} onChange={handleChange} />
            <input type="text" name="videos" placeholder="Video URLs (comma-separated)" value={formData.videos} onChange={handleChange} />
            <button type="submit">Create Event</button>
        </form>
    );
}

export default EventForm;
