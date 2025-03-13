import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import ProfileCard from './ProfileCard'; // Separate component for the profile

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const [userName, setUserName] = useState('Garvita');
    const [stockData, setStockData] = useState({
        stocks: [
            { stock: 'AAPL', status: 'buy', quantity: 50, pricePerUnit: 600 },
            { stock: 'GOOGL', status: 'buy', quantity: 20, pricePerUnit: 1025 },
            { stock: 'TSLA', status: 'sold', quantity: 10, pricePerUnit: 900 },
            { stock: 'MSFT', status: 'buy', quantity: 15, pricePerUnit: 1000 },
            { stock: 'AMZN', status: 'sold', quantity: 12, pricePerUnit: 2700 },
            { stock: 'FB', status: 'buy', quantity: 30, pricePerUnit: 400 },
            { stock: 'NFLX', status: 'sold', quantity: 20, pricePerUnit: 500 },
            { stock: 'NVDA', status: 'buy', quantity: 25, pricePerUnit: 1800 },
            { stock: 'INTC', status: 'sold', quantity: 40, pricePerUnit: 55 },
            { stock: 'BABA', status: 'buy', quantity: 15, pricePerUnit: 230 },
            { stock: 'DIS', status: 'buy', quantity: 20, pricePerUnit: 1200 },
            { stock: 'PYPL', status: 'sold', quantity: 25, pricePerUnit: 250 },
            { stock: 'AMD', status: 'buy', quantity: 35, pricePerUnit: 300 },
            { stock: 'CSCO', status: 'sold', quantity: 10, pricePerUnit: 50 },
            { stock: 'BA', status: 'buy', quantity: 30, pricePerUnit: 350 },
            { stock: 'V', status: 'sold', quantity: 12, pricePerUnit: 1600 },
            { stock: 'MA', status: 'buy', quantity: 25, pricePerUnit: 370 },
            { stock: 'JNJ', status: 'sold', quantity: 10, pricePerUnit: 160 },
            { stock: 'PFE', status: 'buy', quantity: 22, pricePerUnit: 40 },
            { stock: 'MRK', status: 'sold', quantity: 18, pricePerUnit: 80 },
            { stock: 'WMT', status: 'buy', quantity: 28, pricePerUnit: 150 },
            { stock: 'T', status: 'sold', quantity: 20, pricePerUnit: 140 },
            { stock: 'GM', status: 'buy', quantity: 15, pricePerUnit: 220 },
            { stock: 'F', status: 'sold', quantity: 25, pricePerUnit: 120 },
            { stock: 'KO', status: 'buy', quantity: 30, pricePerUnit: 110 },
            { stock: 'PEP', status: 'sold', quantity: 10, pricePerUnit: 150 },
            { stock: 'GS', status: 'buy', quantity: 25, pricePerUnit: 380 },
            { stock: 'JPM', status: 'sold', quantity: 20, pricePerUnit: 150 },
            { stock: 'C', status: 'buy', quantity: 30, pricePerUnit: 120 },
            { stock: 'MS', status: 'sold', quantity: 15, pricePerUnit: 150 },
            { stock: 'BAC', status: 'buy', quantity: 22, pricePerUnit: 200 },
            { stock: 'VZ', status: 'sold', quantity: 18, pricePerUnit: 55 },
            { stock: 'NKE', status: 'buy', quantity: 20, pricePerUnit: 500 },
            { stock: 'ADBE', status: 'sold', quantity: 15, pricePerUnit: 400 },
            { stock: 'ORCL', status: 'buy', quantity: 35, pricePerUnit: 75 },
            { stock: 'IBM', status: 'sold', quantity: 12, pricePerUnit: 130 },
            { stock: 'RTX', status: 'buy', quantity: 18, pricePerUnit: 180 },
            { stock: 'LMT', status: 'sold', quantity: 10, pricePerUnit: 120 },
            { stock: 'SPG', status: 'buy', quantity: 22, pricePerUnit: 150 },
            { stock: 'UPS', status: 'sold', quantity: 15, pricePerUnit: 160 },
            { stock: 'EXC', status: 'buy', quantity: 25, pricePerUnit: 80 },
            { stock: 'DUK', status: 'sold', quantity: 18, pricePerUnit: 200 },
            { stock: 'KMB', status: 'buy', quantity: 28, pricePerUnit: 110 },
            { stock: 'CLX', status: 'sold', quantity: 15, pricePerUnit: 160 },
            { stock: 'MDT', status: 'buy', quantity: 35, pricePerUnit: 150 },
            { stock: 'SYK', status: 'sold', quantity: 12, pricePerUnit: 120 },
            { stock: 'AMT', status: 'buy', quantity: 20, pricePerUnit: 300 },
            { stock: 'PLD', status: 'sold', quantity: 25, pricePerUnit: 200 },
            { stock: 'REGN', status: 'buy', quantity: 18, pricePerUnit: 500 },
            { stock: 'ZTS', status: 'sold', quantity: 15, pricePerUnit: 300 },
            { stock: 'MO', status: 'buy', quantity: 10, pricePerUnit: 150 },
            { stock: 'PM', status: 'sold', quantity: 20, pricePerUnit: 180 },
            { stock: 'CVX', status: 'buy', quantity: 25, pricePerUnit: 300 },
            { stock: 'XOM', status: 'sold', quantity: 30, pricePerUnit: 200 },
        ]
    });

    const [totalValuation, setTotalValuation] = useState(0);

    useEffect(() => {
        // Calculate the total valuation for 'buy' stocks
        const buyStocks = stockData.stocks.filter(stock => stock.status === 'buy');
        const total = buyStocks.reduce((sum, stock) => sum + stock.quantity * stock.pricePerUnit, 0);
        setTotalValuation(total);
    }, [stockData]);

    // Categorize stocks into Low, Medium, High, and Sold based on their value
    const categorizeStocks = (stocks) => {
        return stocks.map(stock => {
            if (stock.status === 'sold') {
                return 'sold';
            } else if (stock.quantity * stock.pricePerUnit <= 20000) {
                return 'low';
            } else if (stock.quantity * stock.pricePerUnit <= 30000) {
                return 'medium';
            } else {
                return 'high';
            }
        });
    };

    // Sort the stocks into different categories
    const sortedStocks = {
        sold: [],
        low: [],
        medium: [],
        high: []
    };

    stockData.stocks.forEach((stock) => {
        const category = categorizeStocks([stock])[0];
        sortedStocks[category].push(stock.quantity * stock.pricePerUnit);
    });


    // Combine all categories into a single array for chart data
    const sortedData = [
        ...sortedStocks.sold,
        ...sortedStocks.high,
        ...sortedStocks.medium,
        ...sortedStocks.low
    ];


    const colorPalette = {
        sold: 'rgba(244, 67, 54, 0.8)', // Fresh coral red
        low: 'rgba(33, 150, 243, 0.8)', // Fresh sky blue
        medium: 'rgba(255, 235, 59, 0.8)', // Fresh sunny yellow
        high: 'rgba(76, 175, 80, 0.8)' // Fresh green
    };


    const chartData = {
        labels: ['Sold', 'High', 'Medium', 'Low'],
        datasets: [{
            data: [
                sortedStocks.sold.length,
                sortedStocks.high.length,
                sortedStocks.medium.length,
                sortedStocks.low.length
            ],
            backgroundColor: [
                colorPalette.sold,
                colorPalette.high,
                colorPalette.medium,
                colorPalette.low
            ],
            borderWidth: 1
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend for more space
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const stockIndex = tooltipItem.dataIndex;
                        const stockName = stockData.stocks[stockIndex]?.stock || "Unknown"; // Use 'stock' instead of 'name'
                        const quantity = stockData.stocks[stockIndex]?.quantity || 0;
                        const pricePerUnit = stockData.stocks[stockIndex]?.pricePerUnit || 0;
                        const stockValue = quantity * pricePerUnit;

                        return `${stockName}: ₹${stockValue.toLocaleString()}`;
                    },
                },
            },
        },
        elements: {
            arc: {
                borderWidth: 0, // Removes white border lines between segments
            },
        },
        cutoutPercentage: 80, // Allows space in the center for total valuation
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

                <div className="recent-transactions">
                    <h2>Recent Transactions</h2>
                    <div className="transactions-list">
                        {stockData.stocks.map((stock, index) => (
                            <div key={index} className="transaction-item">
                                {/* Stock name displayed here */}
                                <div className="transaction-details">
                                    <h2>{stock.stock}</h2>
                                    <div className="transaction-status">
                                        <span
                                            style={{
                                                color: stock.status === 'buy' ? 'green' : 'red',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            ₹{(stock.quantity * stock.pricePerUnit).toLocaleString()}
                                        </span>
                                        <span className="transaction-type">
                                            {` ${stock.status.charAt(0).toUpperCase() + stock.status.slice(1)}`}
                                        </span>
                                    </div>
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
                    image="/logo.jpg"
                />
                {/* Replace DematCard with an Image */}
                <img src="/card.png" alt="Card" className="demat-image" />
            </div>
        </div>
    );
};

export default Home;
