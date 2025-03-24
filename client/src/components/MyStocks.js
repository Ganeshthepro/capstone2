import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyStocks = () => {
  const [stocks, setStocks] = useState([]); // Available stocks to buy
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Assume token is stored in localStorage after login
  const token = localStorage.getItem('token'); // Adjust based on your auth setup

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/stocks?page=1&limit=10');
        setStocks(response.data.stocks || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stocks:', err);
        setStocks([]);
        setError('Failed to load stocks. Please try again.');
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  const handleBuyStock = async (symbol) => {
    if (!token) {
      setError('Please log in to buy stocks.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/portfolio',
        { symbol },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage(`Successfully added ${symbol} to your portfolio!`);
      setError(null);
      // Optionally refresh portfolio data here if you display it
    } catch (err) {
      console.error('Error buying stock:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to buy stock. Please try again.');
      setSuccessMessage(null);
    }
  };

  if (loading) return <div className="loading">Loading stocks...</div>;

  // Filter stocks with price > 200
  const filteredStocks = stocks.filter(stock => stock.price > 200);

  return (
    <div className="stocks-container">
      <h1>Available Stocks</h1>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {filteredStocks.length === 0 ? (
        <p>No stocks available above $200.</p>
      ) : (
        <table className="stocks-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map(stock => (
              <tr key={stock.id}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleBuyStock(stock.symbol)}
                    className="buy-button"
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Optional CSS for better presentation
const styles = `
  .stocks-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .stocks-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .stocks-table th, .stocks-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  .stocks-table th {
    background-color: #f4f4f4;
  }
  .buy-button {
    padding: 5px 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  .buy-button:hover {
    background-color: #218838;
  }
  .error-message {
    color: red;
    margin-bottom: 10px;
  }
  .success-message {
    color: green;
    margin-bottom: 10px;
  }
  .loading {
    text-align: center;
    margin-top: 20px;
  }
`;

// Inject styles into the document (or move to a .css file)
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default MyStocks;