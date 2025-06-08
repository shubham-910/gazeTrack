import React, { useState } from "react";
import forgotpassword from "../assets/forgotpassword.svg";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetpasswordComp = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format. Please use name@domain.com.');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_BACKEND_URL;

        // Validate email before sending the request
        if (!validateEmail(email)) {
            // Only show toast if email format is invalid
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            await axios.post(
                `${apiUrl}/api/sendresetlink/`,
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success("Reset password link sent successfully.");
            toast.success("You can close this page.");
        } catch (error) {
            toast.error("Error sending reset link. Please try again.");
        }
    };

    return (
        <div className="forgetpass bg-theme-background min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Forgot your password?</h2>
                <div className="flex justify-center mb-6">
                    <img src={forgotpassword} alt="Forgot Password" className="w-44 h-49" />
                </div>
                <h4 className="text-xs justify-center flex text-left mb-6">
                    Enter the email address associated with your account, <br /> 
                    and we'll send you a link to reset your password.
                </h4>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm mb-2 font-medium text-gray-700">
                            Enter your email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => validateEmail(email)} // Validate on blur instead of every change
                            required 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="name@example.com" 
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1">{emailError}</p>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        className={`w-full bg-theme-primarybutton text-white py-2 px-4 rounded-lg hover:bg-theme-primarybutton-hover transition ${
                            emailError ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!!emailError} // Disable if there's an error
                    >
                        Send Reset Link
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Have an account? <a href="/login" className="text-theme-primarybutton font-medium hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgetpasswordComp;
