import React, { useState } from 'react';
import api from '../../axios';

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
            // Send form data using Axios instance
            const response = await api.post('/event/create', data);
            console.log('Event created successfully:', response.data);
            alert('Event created successfully');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event',JSON.stringify(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Event Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Time</label>
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Ticket Price</label>
                <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Upload Images</label>
                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    required
                />
            </div>

            <div>
                <label>Upload Videos</label>
                <input
                    type="file"
                    name="videos"
                    accept="video/*"
                    multiple
                    onChange={handleFileChange}
                    required
                />
            </div>

            <div>
                <button type="submit">Create Event</button>
            </div>
        </form>
    );
};

export default EventForm;