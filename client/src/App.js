import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components
import Home from './components/Home'; // Ensure the path is correct
import LearnMore from './components/LearnMore';
import MyStocks from './components/MyStocks';
import OrderHistory from './components/OrderHistory';
import Sidebar from './components/Sidebar';
import TotalFunds from './components/TotalFunds';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            {/* Redirect default route (/) to /signup */}
            <Route path="/" element={<Navigate to="/signup" replace />} />
            
            {/* Define Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/my-stocks" element={<MyStocks />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/total-funds" element={<TotalFunds />} />
            <Route path="/learn-more" element={<LearnMore />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
