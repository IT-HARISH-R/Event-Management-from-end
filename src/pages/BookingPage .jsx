import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../axios';
import { useSelector } from 'react-redux';
import Loading from '../componastion/Loading';
import { toast } from 'react-toastify';

const BookingPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [ticketType, setTicketType] = useState('');
    const [ticketPrice, setTicketPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await api.get(`/event/${id}`);
                setEvent(response.data);
                setTicketType(response.data.ticketTypes[0].type);
                setTicketPrice(response.data.ticketTypes[0].price);
            } catch (err) {
                setError('Error fetching event details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [id]);

    const handleBooking = async () => {
        if (isProcessingPayment) return;
        try {
            setIsProcessingPayment(true);
            const { data } = await api.post('/ticket/create', {
                amount: ticketPrice ,
                eventId: id,
                ticketType,
                quantity: ticketQuantity,
            });

            if (!window.Razorpay) {
                setError('Payment system error. Try again later.');
                return;
            }

            const options = {
                key: 'rzp_test_ymKyS0BIhx3F7y',
                amount: data.amount,
                currency: 'INR',
                name: event.title,
                description: 'Ticket Booking',
                order_id: data.orderId,
                handler: async (response) => {
                    try {
                        await api.post('/ticket/handlePaymentSuccess', {
                            paymentId: response.razorpay_payment_id,
                            orderId: data.orderId,
                            signature: response.razorpay_signature,
                            event: id
                        });
                        toast.success('Booking Successful!')
                        navigate('/');
                    } catch (err) {
                        setError('Payment failed. Please try again.');
                    } finally {
                        setIsProcessingPayment(false);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact || '1234567890',
                },
                theme: { color: '#00b140' },
            };
            new window.Razorpay(options).open();
        } catch (err) {
            setError('Error initiating payment process');
            setIsProcessingPayment(false);
        }
    };

    const handleTicketChange = (e) => {
        const selectedTicket = event.ticketTypes.find(ticket => ticket.type === e.target.value);
        setTicketType(selectedTicket.type);
        setTicketPrice(selectedTicket.price);
    };

    if (loading) return  <Loading />;
    if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {event && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl lg:text-3xl font-bold mb-4">Book Tickets for {event.title}</h1>
                    <img src={event.images[0]?.url} alt={event.title} className="w-full h-60 object-cover rounded-md mb-4" />
                    <p className="text-gray-700">{event.description}</p>
                    <div className="mt-4 space-y-2">
                        <p className="text-gray-500"><span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-gray-500"><span className="font-semibold">Time:</span> {event.time}</p>
                        <p className="text-gray-500"><span className="font-semibold">Location:</span> {event.location}</p>
                        <p className="text-gray-500"><span className="font-semibold">Price:</span> ₹{ticketPrice}</p>
                    </div>
                    
                    <div className="mt-4">
                        <label className="block text-gray-700">Quantity:</label>
                        <input type="number" value={ticketQuantity} onChange={(e) => setTicketQuantity(Number(e.target.value))} className="mt-2 p-2 border rounded-md w-full" min="1" />
                    </div>
                    
                    <div className="mt-4">
                        <label className="block text-gray-700">Ticket Type:</label>
                        <select value={ticketType} onChange={handleTicketChange} className="block w-full px-4 py-2 text-lg border rounded-md">
                            {event.ticketTypes.map(ticket => (
                                <option key={ticket._id} value={ticket.type}>{ticket.type} - ₹{ticket.price} (Available: {ticket.quantity})</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="mt-6">
                        <button onClick={handleBooking} className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300" disabled={isProcessingPayment}>
                            {isProcessingPayment ? 'Processing Payment...' : 'Confirm Booking'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingPage;

