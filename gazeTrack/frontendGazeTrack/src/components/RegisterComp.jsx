import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterComp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState({});
    const [retypePasswordError, setRetypePasswordError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isRetypePasswordTouched, setIsRetypePasswordTouched] = useState(false);

    const navigate = useNavigate();

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

    const validatePassword = (password) => {
        const errors = {
            minLength: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setPasswordErrors(errors);
        return Object.values(errors).every(Boolean);
    };

    const validateRetypePassword = (password, retypePassword) => {
        if (password !== retypePassword) {
            setRetypePasswordError("Passwords do not match.");
            return false;
        } else {
            setRetypePasswordError('');
            return true;
        }
    };

    useEffect(() => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isRetypePasswordValid = validateRetypePassword(password, retypePassword);
        setIsFormValid(isEmailValid && isPasswordValid && isRetypePasswordValid);
    }, [email, password, retypePassword]);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_BACKEND_URL;
            await axios.post(
                `${apiUrl}/api/register/`,
                { name, email, password, retypePassword },
                { headers: { 'Content-Type': 'application/json' } }
            );
            navigate('/login');
            toast.success('Registration successful!');
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="login-compdiv bg-white">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-theme-primarybutton md:text-2xl dark:text-white text-center">
                        Register
                    </h1>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="John Doe" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsEmailTouched(true);
                                    validateEmail(e.target.value);
                                }}
                                onBlur={() => setIsEmailTouched(true)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="name@gmail.com" 
                                required 
                            />
                            {isEmailTouched && emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setIsPasswordTouched(true);
                                    validatePassword(e.target.value);
                                }}
                                onFocus={() => setIsPasswordTouched(true)}
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required 
                            />

                            {isPasswordTouched && (
                                <ul className="text-sm mt-2 space-y-1">
                                    <li className={passwordErrors.minLength ? "text-green-600" : "text-red-500"}>
                                        Minimum 8 characters required
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
                            )}
                        </div>
                        <div>
                            <label htmlFor="retype-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-type Password</label>
                            <input 
                                type="password" 
                                name="retype-password" 
                                id="retype-password" 
                                value={retypePassword}
                                onChange={(e) => {
                                    setRetypePassword(e.target.value);
                                    setIsRetypePasswordTouched(true);
                                    validateRetypePassword(password, e.target.value);
                                }}
                                onFocus={() => setIsRetypePasswordTouched(true)}
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required 
                            />
                            {isRetypePasswordTouched && retypePasswordError && <p className="text-red-500 text-sm mt-1">{retypePasswordError}</p>}
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full text-white bg-theme-primarybutton hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                            disabled={!isFormValid} 
                        >
                            Register
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                            Have an account?{" "}
                            <a href="/login" className="font-medium text-theme-primarybutton hover:underline dark:text-primary-500">
                                Sign In
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterComp;
