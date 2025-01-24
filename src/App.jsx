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
            <Route path="/EventForm" element={<EventForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            
            {/* Add Route for Event Details */}
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/booking/:id" element={<BookingPage />} /> {/* New booking page route */}


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




// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './componastion/Navbar';
// import Home from './pages/Home';
// import EventForm from './componastion/EventForm';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Profile from './pages/Profile';
// import store from './Store/store';
// import { Provider } from 'react-redux';
// import Search from './pages/Search';


// const App = () => {
//   return (
    
//     <Provider store={store}>
//       <Router>
//         <Navbar />
//         <div className="container mx-auto">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/EventForm" element={<EventForm />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/search" element={<Search />} />
//           </Routes>
//         </div>
//       </Router>
//      </Provider>

//   );
// };

// export default App;
