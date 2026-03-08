import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

// 1. Make sure BOTH props are inside these curly braces!
const Login = ({ onLoginSuccess, onRegisterClick }) => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post('http://finance-api.test/api/login', {
                email,
                password
            });
            onLoginSuccess(response.data.token);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError("Something went wrong.");
            }
        }
    };

    return (
        <div className="auth-container">
            {/* 2. ONLY ONE FORM TAG HERE */}
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                

                <button type="submit">Login</button>

                {/* 3. This link is OUTSIDE a second form tag, but INSIDE the main form */}
                <p 
                    onClick={onRegisterClick} 
                    style={{cursor: 'pointer', marginTop: '10px', color: 'blue', textAlign: 'center'}}
                >
                    Don't have an account? Sign up here.
                </p>
            </form>
        </div>
    );
};

export default Login;