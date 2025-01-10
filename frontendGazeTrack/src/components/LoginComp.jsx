import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordRules, setPasswordRules] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);

    const navigate = useNavigate();

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

    // Password validation function
    const validatePassword = (password) => {
        const rules = {
            minLength: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setPasswordRules(rules);
        return Object.values(rules).every(rule => rule === true);
    };

    // Update form validity when email or password changes
    useEffect(() => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        setIsFormValid(isEmailValid && isPasswordValid);
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            toast.error('Please fix validation errors.');
            return;
        }

        try {
            const apiUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.post(
                `${apiUrl}/api/login/`,
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userId', response.data.user_id);
            localStorage.setItem('is_filled', response.data.is_filled);

            toast.success('Login successful!');
            navigate('/home');
        } catch (error) {
            setError('Invalid credentials or something went wrong');
            toast.error('Invalid credentials or something went wrong');
        }
    };

    return (
        <div className="login-compdiv bg-white">
            <div className="w-full bg-white rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-theme-primarybutton mt-5 mb-14 md:text-2xl dark:text-white text-center">
                        Welcome Back!
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail(e.target.value);
                                }}
                                onBlur={() => setIsEmailTouched(true)} // Set touched on blur
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@gmail.com"
                            />
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {isEmailTouched && emailError && <p className="text-red-500 text-center">{emailError}</p>}
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
                                    validatePassword(e.target.value);
                                }}
                                onFocus={() => setIsPasswordTouched(true)} // Set touched on focus
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <a href="/forgetpassword" className="text-theme-background text-right block mx-auto">Forgot password?</a>

                            {/* Password Validation Rules */}
                            {isPasswordTouched && (
                                <ul className="text-sm mt-2">
                                    <li className={passwordRules.minLength ? 'text-green-600' : 'text-red-500'}>
                                        Minimum 8 characters
                                    </li>
                                    <li className={passwordRules.uppercase ? 'text-green-600' : 'text-red-500'}>
                                        At least one uppercase letter
                                    </li>
                                    <li className={passwordRules.lowercase ? 'text-green-600' : 'text-red-500'}>
                                        At least one lowercase letter
                                    </li>
                                    <li className={passwordRules.number ? 'text-green-600' : 'text-red-500'}>
                                        At least one number
                                    </li>
                                    <li className={passwordRules.specialChar ? 'text-green-600' : 'text-red-500'}>
                                        At least one special character
                                    </li>
                                </ul>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`w-full text-white bg-theme-primarybutton hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                                isFormValid ? '' : 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!isFormValid}
                        >
                            Sign in
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                            Don’t have an account yet? <a href="/register" className="font-medium text-theme-primarybutton hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginComp;
