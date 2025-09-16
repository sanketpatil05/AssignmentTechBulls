import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
                    <li><NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>Users</NavLink></li>
                    <li><NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>Reports</NavLink></li>
                </ul>
            </nav>
        </aside>
    );
}