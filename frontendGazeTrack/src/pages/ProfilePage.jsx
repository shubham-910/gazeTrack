import React, { useState, useEffect } from 'react';
import NavbarMenu from '../components/NavbarMenu';
import Footer from './Footer';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        datejoined: '',
        isActive: '',
    });
    const [loading, setLoading] = useState(true); // Loader state
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null); // Success message

    // Fetch user profile data from the API
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true); // Start loading
            try {
                const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
                const apiUrl = process.env.REACT_APP_BACKEND_URL;
                const response = await fetch(
                    `${apiUrl}/api/getuser/?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setProfile({
                        username: data.username,
                        email: data.email,
                        datejoined: data.datejoined,
                        isActive: data.status ? 'Active' : 'Inactive',
                    });
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to load profile data');
                }
            } catch (err) {
                setError('An error occurred while fetching the profile data');
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchProfile();
    }, []);

    // Toggle edit mode
    const toggleEdit = () => setIsEditing(!isEditing);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    // Validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Save updated profile to API
    const handleSave = async () => {
        setError(null);
        setMessage(null); // Reset messages

        if (!isValidEmail(profile.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsEditing(false);

        try {
            const userId = localStorage.getItem('userId');
            const apiUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${apiUrl}/api/updateuser/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    username: profile.username,
                    email: profile.email,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message); // Display success message
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to update profile');
            }
        } catch (err) {
            setError('An error occurred while updating the profile');
        }
    };

    return (
        <div className="min-h-screen bg-theme-background flex flex-col">
            {/* Navbar */}
            <div className="mb-8">
                <NavbarMenu />
            </div>

            {/* Loader */}
            {loading ? (
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="loader mb-4"></div> {/* Optional loader animation */}
                        <p className="text-xl text-white">Hold tight, loading your profile...</p>
                    </div>
                </div>
            ) : (
                // Profile Card
                <div className="flex-grow flex items-center justify-center px-4 sm:px-8 mb-8 mt-8">
                    <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-xl sm:text-2xl text-theme-background font-bold text-center mb-4">
                        Your Profile Card
                        </h1>

                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

                        <div className="mb-4">
                        <label className="block font-semibold text-theme-background">
                            Username:
                        </label>
                        {isEditing ? (
                            <input
                            type="text"
                            name="username"
                            value={profile.username}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            />
                        ) : (
                            <p className="break-words">{profile.username}</p> // Break text on small screens
                        )}
                        </div>

                        <div className="mb-4">
                        <label className="block font-semibold text-theme-background">
                            Email:
                        </label>
                        {isEditing ? (
                            <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            />
                        ) : (
                            <p className="break-words">{profile.email}</p> // Break text for long emails
                        )}
                        </div>

                        <div className="mb-4">
                        <label className="block font-semibold text-theme-background">
                            Date Joined:
                        </label>
                        <p>{profile.datejoined}</p>
                        </div>

                        <div className="mb-4">
                        <label className="block font-semibold text-theme-background">
                            Status:
                        </label>
                        <p>{profile.isActive}</p>
                        </div>

                        <div className="text-center">
                        {isEditing ? (
                            <button
                            onClick={handleSave}
                            className="bg-theme-background text-white hover:bg-white hover:text-theme-background hover:border-theme-background px-4 py-2 rounded mr-2 border border-transparent transition duration-200"
                            >
                            Save
                            </button>
                        ) : (
                            <button
                            onClick={toggleEdit}
                            className="bg-theme-background text-white hover:bg-white hover:text-theme-background hover:border-theme-background px-4 py-2 rounded mr-2 border border-transparent transition duration-200"
                            >
                            Edit
                            </button>
                        )}
                        {isEditing && (
                            <button
                            onClick={toggleEdit}
                            className="bg-white text-red-500 border-2 border-red-400 hover:bg-red-500 hover:text-white hover:border-white px-4 py-2 rounded ml-2"
                            >
                            Cancel
                            </button>
                        )}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default ProfilePage;
