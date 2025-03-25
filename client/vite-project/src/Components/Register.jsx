import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css"; // Ensure you have this CSS file
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Register() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${apiUrl}/register`, userDetails);
            setMessage(response.data.message);
            
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500);
        } catch (err) {
            setMessage("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="imagea-section"></div>
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={userDetails.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={userDetails.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={userDetails.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                {message && <p className="register-message">{message}</p>}
                <p>Already have an Account? <a href="/login">Login</a></p>
            </form>
        </div>
    );
}

export default Register;
