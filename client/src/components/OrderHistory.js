import React from 'react';
import './OrderHistory.css';

const stocksData = [
    { stock: 'Apple', pricePerUnit: 150, quantity: 10, date: '2024-12-01', status: 'Buy', amount: 1500 },
    { stock: 'Tesla', pricePerUnit: 200, quantity: 5, date: '2024-11-29', status: 'Buy', amount: 1000 },
    { stock: 'Amazon', pricePerUnit: 120, quantity: 15, date: '2024-11-25', status: 'Buy', amount: 1800 },
    { stock: 'Microsoft', pricePerUnit: 250, quantity: 8, date: '2024-11-21', status: 'Sold', amount: 2000 },
    { stock: 'Google', pricePerUnit: 280, quantity: 6, date: '2024-11-15', status: 'Buy', amount: 1680 },
    { stock: 'Meta', pricePerUnit: 180, quantity: 20, date: '2024-11-12', status: 'Sold', amount: 3600 },
    { stock: 'Netflix', pricePerUnit: 350, quantity: 4, date: '2024-11-10', status: 'Buy', amount: 1400 },
    { stock: 'Nvidia', pricePerUnit: 500, quantity: 2, date: '2024-11-09', status: 'Sold', amount: 1000 },
    { stock: 'Berkshire Hathaway', pricePerUnit: 400, quantity: 3, date: '2024-11-05', status: 'Buy', amount: 1200 },
    { stock: 'Adobe', pricePerUnit: 500, quantity: 5, date: '2024-11-02', status: 'Sold', amount: 2500 },
    { stock: 'Intel', pricePerUnit: 60, quantity: 25, date: '2024-10-30', status: 'Buy', amount: 1500 },
    { stock: 'Walmart', pricePerUnit: 140, quantity: 10, date: '2024-10-28', status: 'Sold', amount: 1400 },
    { stock: 'Visa', pricePerUnit: 250, quantity: 7, date: '2024-10-25', status: 'Buy', amount: 1750 },
    { stock: 'Johnson & Johnson', pricePerUnit: 180, quantity: 12, date: '2024-10-22', status: 'Sold', amount: 2160 },
    { stock: 'Procter & Gamble', pricePerUnit: 135, quantity: 14, date: '2024-10-18', status: 'Buy', amount: 1890 },
    { stock: 'Coca-Cola', pricePerUnit: 50, quantity: 30, date: '2024-10-15', status: 'Sold', amount: 1500 },
    { stock: 'Pfizer', pricePerUnit: 40, quantity: 20, date: '2024-10-10', status: 'Buy', amount: 800 },
    { stock: 'ExxonMobil', pricePerUnit: 100, quantity: 18, date: '2024-10-05', status: 'Sold', amount: 1800 },
    { stock: 'Chevron', pricePerUnit: 90, quantity: 22, date: '2024-10-01', status: 'Buy', amount: 1980 },
    { stock: 'Shell', pricePerUnit: 110, quantity: 12, date: '2024-09-28', status: 'Sold', amount: 1320 },
    { stock: 'General Electric', pricePerUnit: 60, quantity: 15, date: '2024-09-25', status: 'Buy', amount: 900 },
    { stock: 'Home Depot', pricePerUnit: 170, quantity: 8, date: '2024-09-22', status: 'Sold', amount: 1360 },
    { stock: 'Target', pricePerUnit: 155, quantity: 10, date: '2024-09-20', status: 'Buy', amount: 1550 },
    { stock: 'McDonald\'s', pricePerUnit: 250, quantity: 5, date: '2024-09-18', status: 'Sold', amount: 1250 },
    { stock: 'Nike', pricePerUnit: 130, quantity: 12, date: '2024-09-15', status: 'Buyt', amount: 1560 },
    { stock: 'Starbucks', pricePerUnit: 90, quantity: 18, date: '2024-09-12', status: 'Sold', amount: 1620 },
    { stock: 'Walt Disney', pricePerUnit: 180, quantity: 10, date: '2024-09-10', status: 'Buy', amount: 1800 },
    { stock: 'L’Oréal', pricePerUnit: 180, quantity: 10, date: '2024-09-05', status: 'Sold', amount: 1800 },
    { stock: 'Nestle', pricePerUnit: 110, quantity: 15, date: '2024-09-02', status: 'Buy', amount: 1650 },
    { stock: 'PepsiCo', pricePerUnit: 150, quantity: 8, date: '2024-08-30', status: 'Sold', amount: 1200 },
    { stock: 'Unilever', pricePerUnit: 45, quantity: 35, date: '2024-08-28', status: 'Buy', amount: 1575 },
    { stock: 'AT&T', pricePerUnit: 25, quantity: 40, date: '2024-08-22', status: 'Buy', amount: 1000 },
    { stock: 'Verizon', pricePerUnit: 50, quantity: 20, date: '2024-08-18', status: 'Buy', amount: 1000 },
];

function OrderHistory() {
    return (
        <div className="order-history">
            <h1>Order History</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Price per Unit</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocksData.map((stock, index) => (
                            <tr key={index}>
                                <td>{stock.stock}</td>
                                <td>₹{stock.pricePerUnit}</td>
                                <td>{stock.quantity}</td>
                                <td>{stock.date}</td>
                                <td className={stock.status === 'Buy' ? 'status-bought' : 'status-sold'}>
                                    {stock.status}
                                </td>
                                <td>₹{stock.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderHistory;
