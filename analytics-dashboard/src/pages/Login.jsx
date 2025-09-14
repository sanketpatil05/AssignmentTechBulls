import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');


    const onSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) return setErr('Enter email & password');
        const ok = login(email, password);
        if (!ok) setErr('Invalid');
    };


    return (
        <div className="login-page">
            <form className="login-box" onSubmit={onSubmit}>
                <h2>Login</h2>
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {err && <div className="error">{err}</div>}
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    );
}