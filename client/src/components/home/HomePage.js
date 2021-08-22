import React from 'react';

const HomePage = () => {
    return (
        <div className="qacart-container">
            <h2 className="home-header"> Application features </h2>
            <ul className="home-list">
                <li>This application was build to learn Automation testing</li>
                <li>Only Logged in user can see the list of the courses</li>
                <li>Only Admin can add or delete course</li>
            </ul>
        </div>
    );
};

export default HomePage;
