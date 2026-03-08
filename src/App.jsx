// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
// import Analytics from "./pages/Analytics";
function App() {
 // 1. The "Gatekeeper" State
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isRegistering, setIsRegistering] = useState(false); // 👈 New state

     // 2. The "Check on Refresh" Logic
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
        }
    }, []);

    // 3. The Login "Handshake" Function
    const login = (token) => {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
    };

    // 4. The Logout Function
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
    };

  if (!isAuthenticated) {
      return isRegistering ? (
          <Register 
              onRegisterSuccess={login} 
              onBackToLogin={() => setIsRegistering(false)} 
          />
      ) : (
          <Login 
              onLoginSuccess={login} 
              onRegisterClick={() => setIsRegistering(true)} 
          />
      );
  }

 

 

  return (
    <BrowserRouter>
        <header className="navbar">
          <h1>Finance Tracker</h1>
          <nav className="nav-links">
            <NavLink to="/" end>Dashboard</NavLink>
            <NavLink to="/analytics">Analytics</NavLink>
            <button onClick={logout}>Logout</button>
          </nav>
        </header>
        <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/analytics" element={<Analytics />} /> */}
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;