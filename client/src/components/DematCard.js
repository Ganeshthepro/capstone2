import React from 'react';

const DematCard = ({ name, amount, cardNumber }) => (
    <div className="demat-accounts">
        <div className="demat-card">
            <p>{name}</p>
            <h3>{amount}</h3>
            <p>{cardNumber}</p>
        </div>
        <div></div>
        <button className="add-account-btn">+ Add Demat Account</button>
    </div>
);

export default DematCard;
