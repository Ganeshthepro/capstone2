import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <h2 className="header-title">
                <img src="/logo.jpg" alt="Logo" className="sidebar-logo" />
                INSIGHTS
            </h2>

            <nav>
                <ul className="sidebar-list">
                    <li><a href="/home" className="sidebar-link active">🏠 HOME</a></li>
                    <li><a href="/my-stocks" className="sidebar-link">💵 MY STOCKS</a></li>
                    <li><a href="/order-history" className="sidebar-link">📜 ORDER HISTORY</a></li>
                    <li>
                        <a href="http://13.126.234.31:8501/" className="sidebar-link" target="_blank" rel="noopener noreferrer">
                            📈 STOCKS PREDICTION
                        </a>
                    </li>
                    <li><a href="/learn-more" className="sidebar-link">📘 LEARN MORE</a></li>
                </ul>
            </nav>

            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Sidebar;
