import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();


export function AuthProvider({ children }) {
const [isAuthenticated, setIsAuthenticated] = useState(() => {
return !!localStorage.getItem('auth-token');
});


useEffect(() => {
if (isAuthenticated) localStorage.setItem('auth-token', '1');
else localStorage.removeItem('auth-token');
}, [isAuthenticated]);


const login = (email, password) => {
// Dummy login: accept any non-empty email/password
if (email=="test@gmail.com" && password=="Tech@123") {
setIsAuthenticated(true);
return true;
}
return false;
};


const logout = () => setIsAuthenticated(false);


return (
<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
{children}
</AuthContext.Provider>
);
}