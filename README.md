# 🎉 Online Event Management Platform

An event management platform built using the **MERN stack** that allows users to **create, browse, register, and pay for events**. Integrated with **Razorpay** for secure payments and email notifications.

## 🚀 Live Demo
🔗 [Click here to view the live project](https://guvi-event-management-project.netlify.app/)  

## 🛠️ Features
- 📝 **Event Creation** – Organizers can create and manage events.
- 🎟️ **Ticket Booking** – Users can browse events and register.
- 💳 **Razorpay Payment** – Secure online payments for event tickets.
- 📩 **Email Notifications** – Confirmation emails sent after registration.
- 📊 **Event Analytics** – Organizers can track ticket sales and attendees.
- 🔐 **User Authentication** – Secure login & registration using JWT.
- 📱 **Responsive Design** – Works on mobile, tablet, and desktop.

## ⚙️ Tech Stack
- **Frontend**: React.js, TailwindCSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Payments**: Razorpay
- **Deployment**: Netlify (Frontend) & Render (Backend)

---

## 🔥 API Endpoints

### 📌 Authentication
- `POST /api/v1/auth/register` - Register a new user  
- `POST /api/v1/auth/login` - Login user  
- `POST /api/v1/auth/profile` - Get user  
- `POST /api/v1/auth/forgotpassword` - Forgot Password
- `POST /api/v1/auth/reset-password/:token` - Reset Password 

### 🎟 Event Management
- `POST /api/v1/events` - Create a new event  
- `GET /api/v1/events` - Get all events  
- `GET /api/v1/events/:id` - Get event details  

### 💳 Payments
- `POST /api/v1/payments` - Process payment via Razorpay  

---

## 🛠️ Deployment  
- **Frontend**: Deployed on **[Netlify](https://guvi-event-management-project.netlify.app/)**  
- **Backend**: Deployed on **Render**  

---

## 👨‍💻 Author  
**Harish**  
- 🔗 [LinkedIn](https://www.lin/v1kedin.com/in/harishdeveloper/)  
- 🔗 [GitHub](https://github.com/IT-HARISH-R)  
