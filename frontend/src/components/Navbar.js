/*
import React from 'react';
import './../css/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>PowerTrack</h1>
            </div>



        </nav>
    );
};

export default Navbar;*/
import React from "react";
import "../css/navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Dades</h2>
            <div className="tabs">
                <button className="active">Daily</button>
                <button>Monthly</button>
                <button>Annually</button>
            </div>
        </nav>
    );
};

export default Navbar;
