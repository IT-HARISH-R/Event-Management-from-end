import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm({ totalAmount, eventId, userId, ticketType, quantity }) {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    try {
      // Step 1: Call your server to create an order with Razorpay
      const response = await axios.post('/api/razorpay/order', {
        totalAmount,
      });

      const { orderId, currency, receipt, paymentGatewaySecret } = response.data;

      // Step 2: Initialize Razorpay checkout options
      const options = {
        key: 'your-razorpay-key-id', // Replace with your Razorpay Key ID
        amount: totalAmount * 100, // Convert to paise (Razorpay expects in paise)
        currency: currency, // E.g., INR
        name: 'Event Ticket Purchase',
        description: `Purchase for ${ticketType} ticket`,
        order_id: orderId,
        handler: async (response) => {
          try {
            // Step 3: Call your server to verify the payment
            const paymentResponse = await axios.post('/api/tickets/create', {
              eventId,
              userId,
              ticketType,
              quantity,
              paymentOrderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              paymentSignature: response.razorpay_signature,
            });

            if (paymentResponse.data.message === 'Payment successful, ticket created') {
              setPaymentStatus('Payment successful, your ticket has been confirmed!');
            }
          } catch (error) {
            setPaymentStatus('Payment verification failed. Please try again!');
          }
        },
        prefill: {
          name: 'User Name', // Can be dynamically set
          email: 'user-email@example.com', // Can be dynamically set
        },
        notes: {
          eventId,
          ticketType,
          quantity,
        },
        theme: {
          color: '#F37254', // Customize the color of the Razorpay checkout button
        },
      };

      // Step 4: Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setPaymentStatus('Error initiating payment. Please try again!');
    }
  };

  return (
    <div>
      <h3>Total Amount: ₹{totalAmount}</h3>
      <button onClick={handlePayment}>Pay with Razorpay</button>
      <p>{paymentStatus}</p>
    </div>
  );
}

export default PaymentForm;
