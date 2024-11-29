import React from 'react';

const ProfileCard = ({ name, email, image }) => (
    <div className="profile">
        <img src={image} alt="Profile" />
        <h3>{name}</h3>
        <p>{email}</p>
    </div>
);

export default ProfileCard;
