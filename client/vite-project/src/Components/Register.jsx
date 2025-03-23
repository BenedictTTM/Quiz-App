import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css"; // Import CSS file

function Register() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({ email: "", password: "" });
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
            const response = await axios.post("http://localhost:5000/register", userDetails);
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
            <div className="register-image"></div> {/* Left half with image */}
            <div className="register-form-container"> {/* Right half with form */}
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
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
                    <p className="anAccount">Already have an Account?</p>
                     <a className="loginref" href="/login">Login</a>

                </form>
               
            </div>
        </div>
    );
}

export default Register;
