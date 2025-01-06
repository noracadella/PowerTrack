/*

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
*/
import React from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css"

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span>PowerTrack</span>
            </div>
            <ul className="sidebar-menu">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/prediction">Cost Projection</Link></li>
                <li><Link to="/simulation">Simulation</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
