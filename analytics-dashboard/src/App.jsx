import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';


export default function App() {
  const { isAuthenticated } = useContext(AuthContext);


  if (!isAuthenticated) return <Login />;


  return (
    <div className="app-root">
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<div style={{ padding: 20 }}>Page not found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}