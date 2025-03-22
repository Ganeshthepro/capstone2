import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ name, email, image }) => {
    return (
        <div className="profile-card">
            {/* Grey bar for the image */}
            <div className="image-bar">
                <img src={image} alt={`${name}'s profile`} className="profile-image" />
            </div>
            <div className="profile-details">
                <h4>{name}</h4>
                <p>{email}</p>
            </div>
        </div>
    );
};

export default ProfileCard;
