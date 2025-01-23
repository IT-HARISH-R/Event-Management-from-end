// src/App.js
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
          </Routes>
        </div>
      </Router>
     </Provider>

  );
};

export default App;
