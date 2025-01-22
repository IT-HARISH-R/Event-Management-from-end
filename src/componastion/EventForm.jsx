import React, { useState } from 'react';
import api from '../axios';

const EventForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        ticketPrice: '',
        category: ''
    });

    const [images, setImages] = useState(null);
    const [videos, setVideos] = useState(null);

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input changes (for images and videos)
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'images') {
            setImages(files);
        } else if (name === 'videos') {
            setVideos(files);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object to send as multipart/form-data
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('date', formData.date);
        data.append('time', formData.time);
        data.append('location', formData.location);
        data.append('ticketPrice', formData.ticketPrice);
        data.append('category', formData.category);
        data.append('organizer', formData.organizer); // Replace with the actual field name or value

    
        
        // Append files (images and videos)
        if (images) {
            for (let i = 0; i < images.length; i++) {
                data.append('images', images[i]);
            }
        }

        if (videos) {
            for (let i = 0; i < videos.length; i++) {
                data.append('videos', videos[i]);
            }
        }
        try {
            console.log("kkk",data)
            // Send form data using Axios instance
            const response = await api.post('/event/create', data);
            console.log('Event created successfully:', response.data);
            alert('Event created successfully');

        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
        >
            <h1 className="text-2xl font-bold text-center text-gray-800">Create Event</h1>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Event Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Time</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Ticket Price</label>
                <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Upload Images</label>
                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Upload Videos</label>
                <input
                    type="file"
                    name="videos"
                    accept="video/*"
                    multiple
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Create Event
                </button>
            </div>
        </form>
    );
};

export default EventForm;
