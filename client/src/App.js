import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components
import Home from './components/Home'; // Ensure the path is correct
import LearnMore from './components/LearnMore';
import MyStocks from './components/MyStocks';
import OrderHistory from './components/OrderHistory';
import Sidebar from './components/Sidebar';
import TotalFunds from './components/TotalFunds';
import Signup from './components/Signup';
import Login from './components/Login';// Import Signup component

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            {/* Define Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/my-stocks" element={<MyStocks />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/total-funds" element={<TotalFunds />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/signup" element={<Signup />} /> {Route}
            <Route path="/login" element={<Login />} /> {Route}
            <Route path="/home" element={<Home />} /> {Route}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
