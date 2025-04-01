import axios from 'axios';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import ProfileCard from './ProfileCard';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const [user, setUser] = useState({ name: 'Guest', email: '' });
    const [portfolioData, setPortfolioData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalValuation, setTotalValuation] = useState(0);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');

        if (storedUser) {
            setUser({
                name: storedUser.name || storedUser.email?.split('@')[0] || 'Guest',
                email: storedUser.email || '',
            });
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user', {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });
                
                setUser({
                    name: response.data.name || response.data.email?.split('@')[0] || 'Guest',
                    email: response.data.email || '',
                });
            } catch (error) {
                console.error('Failed to fetch user data:', error.response || error.message);
            }
        };

        const fetchPortfolioData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:3001/api/portfolio', {
                    headers: { Authorization: `Bearer ${storedToken}` },
                  });
                
                setPortfolioData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch portfolio data:', error.response || error.message);
                setIsLoading(false);
            }
        };

        if (storedToken) {
            fetchUserData();
            fetchPortfolioData();
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (portfolioData && portfolioData.length > 0) {
          console.log("Portfolio data for calculation:", portfolioData);
          
          const total = portfolioData.reduce((sum, stock) => {
            // Try to get the price, with fallbacks for different possible structures
            const stockPrice = 
              (typeof stock.price === 'number') ? stock.price :
              (typeof stock.price === 'string') ? parseFloat(stock.price) :
              stock.priceData?.price ? parseFloat(stock.priceData.price) :
              0;
            
            console.log(`Stock ${stock.symbol}: price = ${stockPrice}`);
            return sum + stockPrice;
          }, 0);
          
          console.log("Calculated total valuation:", total);
          setTotalValuation(total);
        } else {
          console.log("No portfolio data to calculate valuation");
        }
      }, [portfolioData]);

    // Categorize stocks based on their price
    const categorizeStocks = (stocks) => {
        return stocks.map(stock => {
            const price = parseFloat(stock.price) || 0;
            
            if (!stock.price) {
                return 'unknown';
            } else if (price <= 100) {
                return 'low';
            } else if (price <= 500) {
                return 'medium';
            } else {
                return 'high';
            }
        });
    };

    const sortedStocks = {
        unknown: [],
        low: [],
        medium: [],
        high: [],
    };

    portfolioData.forEach((stock) => {
        const category = categorizeStocks([stock])[0];
        sortedStocks[category].push(stock);
    });

    const colorPalette = {
        unknown: 'rgba(128, 128, 128, 0.8)',
        low: 'rgba(33, 150, 243, 0.8)',
        medium: 'rgba(255, 235, 59, 0.8)',
        high: 'rgba(76, 175, 80, 0.8)',
    };

    const chartData = {
        labels: ['High Value', 'Medium Value', 'Low Value', 'Unknown'],
        datasets: [
            {
                data: [
                    sortedStocks.high.length,
                    sortedStocks.medium.length,
                    sortedStocks.low.length,
                    sortedStocks.unknown.length,
                ],
                backgroundColor: [
                    colorPalette.high,
                    colorPalette.medium,
                    colorPalette.low,
                    colorPalette.unknown,
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const categoryIndex = tooltipItem.dataIndex;
                        const categories = ['high', 'medium', 'low', 'unknown'];
                        const category = categories[categoryIndex];
                        const stocksInCategory = sortedStocks[category];
                        
                        return `${stocksInCategory.length} stocks in ${category} category`;
                    },
                },
            },
        },
        elements: {
            arc: {
                borderWidth: 0,
            },
        },
        cutout: '70%',
    };

    if (isLoading) {
        return <div className="loading">Loading portfolio data...</div>;
    }

    return (
        <div className="home-container">
            <div className="main-content">
                <h1>Welcome, {user.name}</h1>
                <p><strong>Master Your Investments: Track, Analyze & Maximize Your Portfolio</strong></p>

                <div className="chart-box">
                    <div className="donut-chart">
                        {portfolioData.length > 0 ? (
                            <Doughnut data={chartData} options={chartOptions} />
                        ) : (
                            <p>No stocks in portfolio. Add some stocks to see your portfolio breakdown.</p>
                        )}
                    </div>

                    <div className="total-valuation-container">
                        <h2>Total Valuation</h2>
                        <p className="total-valuation">₹{totalValuation.toLocaleString()}</p>
                    </div>
                </div>

                <div className="recent-transactions">
                    <h3>Your Portfolio</h3>
                    <div className="transactions-list">
                        {portfolioData.length > 0 ? (
                            portfolioData.map((stock, index) => (
                                <div key={index} className="transaction-item">
                                    <div className="transaction-details">
                                        <h2>{stock.symbol}</h2>
                                        <div className="transaction-status">
                                            <span
                                                style={{
                                                    color: (parseFloat(stock.priceData?.change) || 0) >= 0 ? 'green' : 'red',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                ₹{parseFloat(stock.price).toLocaleString()}
                                            </span>
                                            <span className="transaction-type">
                                                {stock.priceData?.changePercent ? ` (${stock.priceData.changePercent})` : ''}
                                            </span>
                                        </div>
                                        <div className="added-date">
                                            Added: {new Date(stock.addedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No stocks in portfolio yet.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="right-sidebar">
                <ProfileCard
                    name={user.name}
                    email={user.email}
                    image="/logo.jpg"
                />
                <img src="/card.png" alt="Card" className="demat-image" />
            </div>
        </div>
    );
};

export default Home;


// import axios from 'axios';
// import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
// import React, { useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import './Home.css';
// import ProfileCard from './ProfileCard';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const Home = () => {

//     const [user, setUser] = useState({ name: 'Guest', email: '' });
//     const [stockData] = useState({
//         stocks: [
//             { stock: 'AAPL', status: 'buy', quantity: 50, pricePerUnit: 600 },
//             { stock: 'GOOGL', status: 'buy', quantity: 20, pricePerUnit: 1025 },
//             { stock: 'TSLA', status: 'sold', quantity: 10, pricePerUnit: 900 },
//             { stock: 'MSFT', status: 'buy', quantity: 15, pricePerUnit: 1000 },
//             { stock: 'AMZN', status: 'sold', quantity: 12, pricePerUnit: 2700 },
//             { stock: 'FB', status: 'buy', quantity: 30, pricePerUnit: 400 },
//             { stock: 'NFLX', status: 'sold', quantity: 20, pricePerUnit: 500 },
//             { stock: 'NVDA', status: 'buy', quantity: 25, pricePerUnit: 1800 },
//             { stock: 'INTC', status: 'sold', quantity: 40, pricePerUnit: 55 },
//             { stock: 'BABA', status: 'buy', quantity: 15, pricePerUnit: 230 },
//             { stock: 'DIS', status: 'buy', quantity: 20, pricePerUnit: 1200 },
//             { stock: 'PYPL', status: 'sold', quantity: 25, pricePerUnit: 250 },
//             { stock: 'AMD', status: 'buy', quantity: 35, pricePerUnit: 300 },
//             { stock: 'CSCO', status: 'sold', quantity: 10, pricePerUnit: 50 },
//             { stock: 'BA', status: 'buy', quantity: 30, pricePerUnit: 350 },
//             { stock: 'V', status: 'sold', quantity: 12, pricePerUnit: 1600 },
//             { stock: 'MA', status: 'buy', quantity: 25, pricePerUnit: 370 },
//             { stock: 'JNJ', status: 'sold', quantity: 10, pricePerUnit: 160 },
//             { stock: 'PFE', status: 'buy', quantity: 22, pricePerUnit: 40 },
//             { stock: 'MRK', status: 'sold', quantity: 18, pricePerUnit: 80 },
//             { stock: 'WMT', status: 'buy', quantity: 28, pricePerUnit: 150 },
//             { stock: 'T', status: 'sold', quantity: 20, pricePerUnit: 140 },
//             { stock: 'GM', status: 'buy', quantity: 15, pricePerUnit: 220 },
//             { stock: 'F', status: 'sold', quantity: 25, pricePerUnit: 120 },
//             { stock: 'KO', status: 'buy', quantity: 30, pricePerUnit: 110 },
//             { stock: 'PEP', status: 'sold', quantity: 10, pricePerUnit: 150 },
//             { stock: 'GS', status: 'buy', quantity: 25, pricePerUnit: 380 },
//             { stock: 'JPM', status: 'sold', quantity: 20, pricePerUnit: 150 },
//             { stock: 'C', status: 'buy', quantity: 30, pricePerUnit: 120 },
//             { stock: 'MS', status: 'sold', quantity: 15, pricePerUnit: 150 },
//             { stock: 'BAC', status: 'buy', quantity: 22, pricePerUnit: 200 },
//             { stock: 'VZ', status: 'sold', quantity: 18, pricePerUnit: 55 },
//             { stock: 'NKE', status: 'buy', quantity: 20, pricePerUnit: 500 },
//             { stock: 'ADBE', status: 'sold', quantity: 15, pricePerUnit: 400 },
//             { stock: 'ORCL', status: 'buy', quantity: 35, pricePerUnit: 75 },
//             { stock: 'IBM', status: 'sold', quantity: 12, pricePerUnit: 130 },
//             { stock: 'RTX', status: 'buy', quantity: 18, pricePerUnit: 180 },
//             { stock: 'LMT', status: 'sold', quantity: 10, pricePerUnit: 120 },
//             { stock: 'SPG', status: 'buy', quantity: 22, pricePerUnit: 150 },
//             { stock: 'UPS', status: 'sold', quantity: 15, pricePerUnit: 160 },
//             { stock: 'EXC', status: 'buy', quantity: 25, pricePerUnit: 80 },
//             { stock: 'DUK', status: 'sold', quantity: 18, pricePerUnit: 200 },
//             { stock: 'KMB', status: 'buy', quantity: 28, pricePerUnit: 110 },
//             { stock: 'CLX', status: 'sold', quantity: 15, pricePerUnit: 160 },
//             { stock: 'MDT', status: 'buy', quantity: 35, pricePerUnit: 150 },
//             { stock: 'SYK', status: 'sold', quantity: 12, pricePerUnit: 120 },
//             { stock: 'AMT', status: 'buy', quantity: 20, pricePerUnit: 300 },
//             { stock: 'PLD', status: 'sold', quantity: 25, pricePerUnit: 200 },
//             { stock: 'REGN', status: 'buy', quantity: 18, pricePerUnit: 500 },
//             { stock: 'ZTS', status: 'sold', quantity: 15, pricePerUnit: 300 }
//         ],
//     });
//     const [totalValuation, setTotalValuation] = useState(0);


//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem('user'));

//         if (storedUser) {
//             setUser({
//                 name: storedUser.name || storedUser.email?.split('@')[0] || 'Guest',
//                 email: storedUser.email || '',
//             });
//         }


//         const storedToken = localStorage.getItem('token');
//         const fetchUserData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/user', {
//                     headers: { Authorization: `Bearer ${ storedToken }` },
//         });
//     setUser({
//         name: response.data.name || response.data.email?.split('@')[0] || 'Guest',
//         email: response.data.email || '',
//     });
// } catch (error) {
//     console.error('Failed to fetch user data:', error.response || error.message);
// }
//     };

// if (storedToken) fetchUserData();
//   }, []);


// useEffect(() => {
//     const buyStocks = stockData.stocks.filter(stock => stock.status === 'buy');
//     const total = buyStocks.reduce((sum, stock) => sum + stock.quantity * stock.pricePerUnit, 0);
//     setTotalValuation(total);
// }, [stockData]);


// const categorizeStocks = (stocks) => {
//     return stocks.map(stock => {
//         if (stock.status === 'sold') {
//             return 'sold';
//         } else if (stock.quantity * stock.pricePerUnit <= 20000) {
//             return 'low';
//         } else if (stock.quantity * stock.pricePerUnit <= 30000) {
//             return 'medium';
//         } else {
//             return 'high';
//         }
//     });
// };


// const sortedStocks = {
//     sold: [],
//     low: [],
//     medium: [],
//     high: [],
// };

// stockData.stocks.forEach((stock) => {
//     const category = categorizeStocks([stock])[0];
//     sortedStocks[category].push(stock.quantity * stock.pricePerUnit);
// });


// const colorPalette = {
//     sold: 'rgba(214, 37, 25, 0.8)',
//     low: 'rgba(33, 150, 243, 0.8)',
//     medium: 'rgba(255, 235, 59, 0.8)',
//     high: 'rgba(76, 175, 80, 0.8)',
// };

// const chartData = {
//     labels: ['Sold', 'High', 'Medium', 'Low'],
//     datasets: [
//         {
//             data: [
//                 sortedStocks.sold.length,
//                 sortedStocks.high.length,
//                 sortedStocks.medium.length,
//                 sortedStocks.low.length,
//             ],
//             backgroundColor: [
//                 colorPalette.sold,
//                 colorPalette.high,
//                 colorPalette.medium,
//                 colorPalette.low,
//             ],
//             borderWidth: 1,
//         },
//     ],
// };

// const chartOptions = {
//     responsive: true,
//     plugins: {
//         legend: {
//             display: false,
//         },
//         tooltip: {
//             callbacks: {
//                 label: function (tooltipItem) {
//                     const stockIndex = tooltipItem.dataIndex;
//                     const stockName = stockData.stocks[stockIndex]?.stock || 'Unknown';
//                     const quantity = stockData.stocks[stockIndex]?.quantity || 0;
//                     const pricePerUnit = stockData.stocks[stockIndex]?.pricePerUnit || 0;
//                     const stockValue = quantity * pricePerUnit;

//                     return `${ stockName }: ₹${ stockValue.toLocaleString() }`;
//                 },
//             },
//         },
//     },
//     elements: {
//         arc: {
//             borderWidth: 0,
//         },
//     },
//     cutoutPercentage: 80,
// };

// return (
//     <div className="home-container">

//         <div className="main-content">
//             <h1>Welcome, {user.name}</h1>
//             <p><bold>Master Your Investments: Track, Analyze & Maximize Your Portfolio</bold></p>


//             <div className="chart-box">

//                 <div className="donut-chart">
//                     <Doughnut data={chartData} options={chartOptions} />
//                 </div>


//                 <div className="total-valuation-container">
//                     <h2>Total Valuation</h2>
//                     <p className="total-valuation">₹{totalValuation.toLocaleString()}</p>
//                 </div>
//             </div>

//             <div className="recent-transactions">
//                 <h3>Recent Transactions</h3>
//                 <div className="transactions-list">
//                     {stockData.stocks.map((stock, index) => (
//                         <div key={index} className="transaction-item">
//                             <div className="transaction-details">
//                                 <h2>{stock.stock}</h2>
//                                 <div className="transaction-status">
//                                     <span
//                                         style={{
//                                             color: stock.status === 'buy' ? 'green' : 'red',
//                                             fontWeight: 'bold',
//                                         }}
//                                     >
//                                         ₹{(stock.quantity * stock.pricePerUnit).toLocaleString()}
//                                     </span>
//                                     <span className="transaction-type">
//                                         {` ${stock.status.charAt(0).toUpperCase() + stock.status.slice(1)}`}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>

//         <div className="right-sidebar">
//             <ProfileCard
//                 name={user.name}
//                 email={user.email}
//                 image="/logo.jpg"
//             />
//             <img src="/card.png" alt="Card" className="demat-image" />
//         </div>
//     </div>
// );
// };

// export default Home;