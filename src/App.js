import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelList from './components/HotelList';
import HotelBookingForm from './components/HotelBookingForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/booking" element={<HotelBookingForm />} />
      </Routes>
    </Router>
  );
};

export default App;
