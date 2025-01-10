import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordComp = () => {
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState({});
    const [retypePasswordError, setRetypePasswordError] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const { userId, token } = useParams();
    const navigate = useNavigate();

    // Password validation function
    const validatePassword = (password) => {
        const errors = {
            minLength: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setPasswordErrors(errors);
        const isValid = Object.values(errors).every(Boolean);
        setIsPasswordValid(isValid);
        return isValid;
    };

    // Check if passwords match
    const validateRetypePassword = (password, retypePassword) => {
        if (password !== retypePassword) {
            setRetypePasswordError("Passwords do not match.");
            return false;
        } else {
            setRetypePasswordError('');
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid || !validateRetypePassword(newPassword, retypePassword)) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        try {
            await axios.post(
                `${apiUrl}/api/resetPassword/${userId}/${token}/`,
                { new_password: newPassword, retype_password: retypePassword },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            toast.success("Password reset successfully.");
            navigate('/login');
        } catch (error) {
            toast.error("Failed to reset password. Please try again.");
        }
    };

    return (
        <div className="reset-pass bg-theme-background min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="new_password" className="block text-sm mb-2 font-medium text-gray-700">New Password</label>
                        <input 
                            type="password"
                            id="new_password"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                        />
                        {/* Password Validation Messages */}
                        <ul className="text-sm mt-2 space-y-1">
                            <li className={passwordErrors.minLength ? "text-green-600" : "text-red-500"}>
                                Minimum 8 characters
                            </li>
                            <li className={passwordErrors.uppercase ? "text-green-600" : "text-red-500"}>
                                At least one uppercase letter
                            </li>
                            <li className={passwordErrors.lowercase ? "text-green-600" : "text-red-500"}>
                                At least one lowercase letter
                            </li>
                            <li className={passwordErrors.number ? "text-green-600" : "text-red-500"}>
                                At least one number
                            </li>
                            <li className={passwordErrors.specialChar ? "text-green-600" : "text-red-500"}>
                                At least one special character
                            </li>
                        </ul>
                    </div>
                    <div>
                        <label htmlFor="retype_password" className="block text-sm mb-2 font-medium text-gray-700">Retype New Password</label>
                        <input 
                            type="password"
                            id="retype_password"
                            value={retypePassword}
                            onChange={(e) => {
                                setRetypePassword(e.target.value);
                                validateRetypePassword(newPassword, e.target.value);
                            }}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                        />
                        {retypePasswordError && <p className="text-red-500 text-sm mt-1">{retypePasswordError}</p>}
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-theme-primarybutton text-white py-2 px-4 rounded-lg hover:bg-theme-primarybutton-hover transition"
                        disabled={!isPasswordValid || retypePasswordError} // Disable button if conditions aren't met
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordComp;
