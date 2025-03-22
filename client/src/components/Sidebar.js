import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="header-title">
                <img src="/logo.jpg" alt="Logo" className="sidebar-logo" />
                INSIGHTS
            </h2>

            <nav>
                <ul className="sidebar-list">
                    <li>
                        <a href="/home" className="sidebar-link active">
                            <span className="sidebar-icon">🏠</span>
                            <span>HOME</span>
                        </a>
                    </li>
                    <li>
                        <a href="/my-stocks" className="sidebar-link">
                            <span className="sidebar-icon">💵</span>
                            <span>MY STOCKS</span>
                        </a>
                    </li>
                    <li>
                        <a href="/order-history" className="sidebar-link">
                            <span className="sidebar-icon">📜</span>
                            <span>ORDER HISTORY</span>
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
                            <span>STOCKS PREDICTION</span>
                        </a>
                    </li>
                    <li>
                        <a href="/learn-more" className="sidebar-link">
                            <span className="sidebar-icon">📘</span>
                            <span>LEARN  MORE</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
