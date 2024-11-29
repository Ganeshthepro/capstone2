import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import DematCard from './DematCard'; // Separate component for demat card
import './Home.css';
import ProfileCard from './ProfileCard'; // Separate component for the profile

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const [userName, setUserName] = useState('Garvita');
    const [stockData, setStockData] = useState({
        stocks: [
            { name: 'AAPL', value: 30000 },
            { name: 'GOOGL', value: 20500 },
            { name: 'TSLA', value: 92000 },
            { name: 'MSFT', value: 15000 },
        ],
    });
    const [totalValuation, setTotalValuation] = useState(0);

    useEffect(() => {
        const total = stockData.stocks.reduce((sum, stock) => sum + stock.value, 0);
        setTotalValuation(total);
    }, [stockData]);

    const chartData = {
        labels: stockData.stocks.map((stock) => stock.name),
        datasets: [
            {
                data: stockData.stocks.map((stock) => stock.value),
                backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'],
                hoverBackgroundColor: ['#45a049', '#1e88e5', '#fb8c00', '#e53935'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div className="home-container">
            {/* Main Content */}
            <div className="main-content">
                <h1>Welcome, {userName}</h1>
                <p>Get Insights of Your Investments</p>

                {/* Flex container for chart and total valuation */}
                <div className="chart-box">
                    {/* Doughnut chart */}
                    <div className="donut-chart">
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>

                    {/* Total Valuation */}
                    <div className="total-valuation-container">
                        <h2>Total Valuation</h2>
                        <p className="total-valuation">₹{totalValuation.toLocaleString()}</p>
                    </div>
                </div>

                {/* Recent Transactions Section */}
                <div className="recent-transactions">
                    <h3>🕒 Recent Transactions</h3>
                    <div className="transactions-box">
                        {stockData.stocks.map((stock, index) => (
                            <div key={index} className="transaction-item">
                                <span className="transaction-emoji">💸</span>
                                <div className="transaction-details">
                                    <p className="transaction-stock-name">{stock.name}</p>
                                    <p className="transaction-stock-value">Bought for ₹{stock.value.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="right-sidebar">
                <ProfileCard
                    name="Garvita Jhanwar"
                    email="garvitajhawar10@gmail.com"
                    image="https://via.placeholder.com/100"
                />
                <DematCard name="Garvita Jhanwar" amount="₹1,00,000.00" cardNumber="**** **** **** 1234" />
            </div>
        </div>
    );
};

export default Home;
