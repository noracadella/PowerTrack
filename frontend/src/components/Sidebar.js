import React from "react";
import "../css/sidebar.css";

const Sidebar = ({ onSidebarClick }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span>PowerTrack</span>
            </div>
            <ul className="sidebar-menu">
                <li onClick={() => onSidebarClick("dashboard")}>Dashboard</li>
                <li onClick={() => onSidebarClick("prediction")}>Prediction</li>
                <li onClick={() => onSidebarClick("simulation")}>Simulation</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
