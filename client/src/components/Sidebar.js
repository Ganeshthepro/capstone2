import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="header-title">
                <img src="/logo.png" alt="Logo" className="sidebar-logo" />
                InvestmentInsights
            </h2>

            <nav>
                <ul className="sidebar-list">
                    <li>
                        <a href="/" className="sidebar-link active">
                            <span className="sidebar-icon">🏠</span>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/my-stocks" className="sidebar-link">
                            <span className="sidebar-icon">💵</span>
                            <span>My Stocks</span>
                        </a>
                    </li>
                    <li>
                        <a href="/order-history" className="sidebar-link">
                            <span className="sidebar-icon">📜</span>
                            <span>Order History</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="http://13.126.234.31:8501/"
                            className="sidebar-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sidebar-icon">📈</span>
                            <span>Stocks Prediction</span>
                        </a>
                    </li>
                    <li>
                        <a href="/learn-more" className="sidebar-link">
                            <span className="sidebar-icon">📘</span>
                            <span>Learn More</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
