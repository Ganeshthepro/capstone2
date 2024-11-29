import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>
                <img src="logo.png" alt="Logo" />
                InvestmentInsights
            </h2>
            <nav>
                <ul className="sidebar-list">
                    <li>
                        <Link to="/" className="sidebar-link active">
                            <span className="sidebar-icon">🏠</span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-stocks" className="sidebar-link">
                            <span className="sidebar-icon">💵</span>
                            <span>My Stocks</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/order-history" className="sidebar-link">
                            <span className="sidebar-icon">📜</span>
                            <span>Order History</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/total-funds" className="sidebar-link">
                            <span className="sidebar-icon">📈</span>
                            <span>Total Funds</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/learn-more" className="sidebar-link">
                            <span className="sidebar-icon">📘</span>
                            <span>Learn More</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;



