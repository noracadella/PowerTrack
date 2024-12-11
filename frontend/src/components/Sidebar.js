

import React from 'react';
import './../css/sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul className="sidebar-menu">
                <li className="sidebar-item">Dashboard</li>
                <li className="sidebar-item">Prediction</li>
                <li className="sidebar-item">Simulation</li>
                <li className="sidebar-item">Settings</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
