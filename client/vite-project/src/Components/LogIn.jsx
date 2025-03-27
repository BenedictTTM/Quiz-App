import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";  // Import the updated CSS
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Login() {
    const [userDetails, setUserDetails] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            const response = await axios.post(`${apiUrl}/login`, userDetails);
            setMessage(response.data.message);

            setTimeout(() => {
                console.log("Navigating to Leaderboard...");
                navigate("/Questions", { replace: true });
            }, 1500);
        } catch (err) {
            console.error("Error:", err);
            setMessage("Sign-in failed. Check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* Left side with blurred image */}
            <div className="image-section"></div>

            {/* Right side with form */}
            <div className="form-section">
                <h2 className="SignIn">Sign In</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={userDetails.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userDetails.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                    {message && <p className="login-message">{message}</p>}
                </form>
                <p className="signup-text">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
