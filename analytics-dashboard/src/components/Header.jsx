import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';


export default function Header() {
    const { logout } = useContext(AuthContext);
    const { dark, toggleTheme } = useContext(ThemeContext);


  


    return (
        <header className="app-header">
            <div className="header-left">
                <h1 className="app-title">Analytics Dashboard</h1>
            </div>
            <div className="header-right">
                <label className="switch">
                    <input type="checkbox" checked={dark} onChange={toggleTheme} />
                    <span className="slider" />
                </label>
                <button className="btn btn-ghost" onClick={logout}>Logout</button>
            </div>
        </header>
    );
}