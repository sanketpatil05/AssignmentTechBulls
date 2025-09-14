import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';


export default function Header() {
    const { logout } = useContext(AuthContext);
    const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');


    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);


    return (
        <header className="app-header">
            <div className="header-left">
                <h1 className="app-title">Analytics Dashboard</h1>
            </div>
            <div className="header-right">
                <label className="switch">
                    <input type="checkbox" checked={dark} onChange={() => setDark(d => !d)} />
                    <span className="slider" />
                </label>
                <button className="btn btn-ghost" onClick={logout}>Logout</button>
            </div>
        </header>
    );
}