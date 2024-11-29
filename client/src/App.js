import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Import Components
import Home from './components/Home'; // Ensure the path is correct
import LearnMore from './components/LearnMore';
import MyStocks from './components/MyStocks';
import OrderHistory from './components/OrderHistory';
import Sidebar from './components/Sidebar';
import TotalFunds from './components/TotalFunds';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


