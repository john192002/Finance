import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Register = ({ onRegisterSuccess, onBackToLogin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // 🛑 Frontend Validation
        if (password !== passwordConfirmation) {
            return setError("Passwords do not match!");
        }

        try {
            // 1. Send data to Laravel
            const response = await axios.post('http://finance-api.test/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation 
            });
            setError("");
            // 2. 🗝️ Use the same login function from App.jsx
            onRegisterSuccess(response.data.token);
            alert("Account created successfully!");
            
        } catch (err) {
            // 3. Show Laravel validation errors (e.g., Email already taken)
            if (err.response && err.response.data.errors) {
                const firstError = Object.values(err.response.data.errors)[0][0];
                setError(firstError);
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Create Account</h2>
                
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />

                <button type="submit">Sign Up</button>

                <p onClick={onBackToLogin} style={{cursor: 'pointer', marginTop: '10px', color: 'blue', textAlign: 'center'}}>
                    Already have an account? Login here.
                </p>
            </form>
        </div>
    );
};

export default Register;