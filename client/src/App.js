import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

// Import Components
import Home from './components/Home';
import LearnMore from './components/LearnMore';
import Login from './components/Login';
import MyStocks from './components/MyStocks';
import OrderHistory from './components/OrderHistory';
import Sidebar from './components/Sidebar';
import Signup from './components/Signup';
import TotalFunds from './components/TotalFunds';


function MainLayout() {
  const location = useLocation();

  const hideSidebarRoutes = ['/signup', '/login'];


  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: 'flex' }}>

      {showSidebar && <Sidebar />}


      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>

          <Route path="/" element={<Navigate to="/signup" replace />} />


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
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;