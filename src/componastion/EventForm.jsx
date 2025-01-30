import React, { useEffect, useState } from 'react';
import api from '../axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {

    const user = useSelector((state) => state.user.user); // Get user from Redux store
    const navegater = useNavigate();
    const [loading, setLoading] = useState(false);

    // console.log(user.role)
    console.log(user)
    useEffect(() => {
        if (!user) {
            navegater("/");
        }
        if ( !user.role === 'organizers') {
            navegater("/");
        }
    }, [])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: '',
    });

    const [ticketTypes, setTicketTypes] = useState([
        { type: '', price: '', quantity: '' }
    ]);
    const [images, setImages] = useState(null);
    const [videos, setVideos] = useState(null);

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'images') {
            setImages(files);
        } else if (name === 'videos') {
            setVideos(files);
        }
    };

    // Handle ticket type changes
    const handleTicketChange = (index, field, value) => {
        const updatedTickets = [...ticketTypes];
        updatedTickets[index][field] = value;
        setTicketTypes(updatedTickets);
    };

    // Add a new ticket type
    const addTicketType = () => {
        setTicketTypes([...ticketTypes, { type: '', price: '', quantity: '' }]);
    };

    // Remove a ticket type
    const removeTicketType = (index) => {
        const updatedTickets = ticketTypes.filter((_, i) => i !== index);
        setTicketTypes(updatedTickets);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('date', formData.date);
        data.append('time', formData.time);
        data.append('location', formData.location);
        data.append('category', formData.category);
        data.append('ticketTypes', JSON.stringify(ticketTypes));

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
            const response = await api.post('/event/create', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log('Event created successfully:', response.data);
            alert('Event created successfully');
            navegater("/")
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event');
        } finally {
            setLoading(false);
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
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Ticket Types</label>
                {ticketTypes.map((ticket, index) => (
                    <div key={index} className="mb-4 border p-4 rounded-md">
                        <div className="mb-2">
                            <label className="block text-gray-700 font-medium mb-1">Type</label>
                            <select
                                value={ticket.type}
                                onChange={(e) => handleTicketChange(index, 'type', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="General Admission">General Admission</option>
                                <option value="VIP">VIP</option>
                            </select>

                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 font-medium mb-1">Price</label>
                            <input
                                type="number"
                                value={ticket.price}
                                onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                            <input
                                type="number"
                                value={ticket.quantity}
                                onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        {ticketTypes.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeTicketType(index)}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addTicketType}
                    className="text-blue-500 hover:underline mt-2"
                >
                    Add Ticket Type
                </button>
            </div>

            <div>
                <button type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" disabled={loading}>
                    {loading ? 'Creating Event...' : 'Create Event'}
                </button>
            </div>
        </form>
    );
};

export default EventForm;
