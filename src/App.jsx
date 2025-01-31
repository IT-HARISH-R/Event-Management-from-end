import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componastion/Navbar';
import Home from './pages/Home';
import EventForm from './componastion/EventForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import store from './Store/store';
import { Provider } from 'react-redux';
import Search from './pages/Search';

import EventDetails from './componastion/EventDetails';
import BookingPage from './pages/BookingPage ';
import Dashboard from './pages/Dashboard';
import ManageRegistrations from './componastion/handleTransferTicket';
import TransferTicket from './componastion/TransferTicket';
import AttendeeList from './componastion/AttendeeList';
import EventSchedule from './componastion/EventSchedule';
import AddSessionForm from './componastion/AddSessionForm';
import AdminDashboard from './pages/AdminDashbord';
import SupportInquiryForm from './componastion/SupportInquiryForm';
import AdminSupportDashboard from './componastion/AdminSupportDashboard';
import PassworeForgot from './pages/PassworeForgot';
import ResetPassword from './pages/ResetPassword';
import CreateOrganizer from './pages/CreateOrganizer';
import UserAccounts from './componastion/UserAccounts';
import Loading from './componastion/Loading';


// Import the new ticket booking and payment components
// import TicketBooking from './components/TicketBooking';
// import TicketPayment from './components/TicketPayment';

const App = () => {
  return (
    <Provider store={store}>
      <Router> 
        <Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventform" element={<EventForm />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/organizers/dashboard" element={<AttendeeList />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />

            <Route path="/forgot-password" element={<PassworeForgot />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/createorganizer" element={<CreateOrganizer />} />
           
            <Route path="/useraccounts" element={<UserAccounts />} />
            
            {/* Add Route for Event Details */}
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/booking/:id" element={<BookingPage />} /> {/* New booking page route */}


            <Route path="/ticket/transfer/:ticketId" element={<TransferTicket />} />

            <Route path="/cancelTicket/:id" element={<ManageRegistrations />} ></Route>
            <Route path="/schedule" element={<EventSchedule />} ></Route>
            <Route path="/schedule/:id" element={<AddSessionForm />} ></Route>

            <Route path="/inquiryform" element={<SupportInquiryForm />} ></Route>
            <Route path="/inquiryreplay" element={<AdminSupportDashboard />} ></Route>
            {/* Add Ticket Booking and Payment Routes
            <Route path="/ticket-booking" element={<TicketBooking />} />
            <Route path="/ticket-payment" element={<TicketPayment />} /> */}


          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;



