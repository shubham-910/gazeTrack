import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import nature from '../assets/nature.jpg';
import maleFace from '../assets/maleFace.jpg';
import femaleFace from '../assets/femaleFace.jpg';

const StimuliCategory = () => {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false);

    const categories = [
        { id: 1, name: "Nature pictures", image: nature },
        { id: 2, name: "Male Faces", image: maleFace },
        { id: 3, name: "Female Faces", image: femaleFace },
    ];

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelectCategory = (id) => {
        setSelectedCategory(id);
    };

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };

    const handleProceed = () => {
        if (selectedCategory !== null) {
            localStorage.setItem('selectedCategory', selectedCategory); // Save selected category to local storage
            navigate('/permission');
        } else {
            toast.error('Please select one category.');
        }
    };

    const handleHome = () => {
        navigate('/home'); // Redirect to the home page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-theme-background p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Select a Stimuli Category of your choice</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleSelectCategory(category.id)}
                        className={`p-4 bg-white rounded-lg shadow-md cursor-pointer hover:text-green-500 hover:border-green-500 transition-all duration-200 ${
                            selectedCategory === category.id ? 'border-4 border-green-500 text-green-500' : 'border-4 border-gray-300'
                        }`}
                    >
                        <img src={category.image} alt={category.name} className="w-full h-40 object-cover mb-4 rounded-lg" loading="lazy" />
                        <h2 className="text-center font-semibold">{category.name}</h2>
                    </div>
                ))}
            </div>
            {/* Disclaimer text */}
            <div className="mt-6 text-center max-w-4xl px-4">
                <p className="text-white">
                    <strong>Disclaimer:</strong> The images displayed on this site are solely for research and study purposes. 
                    We do not endorse or promote any form of racial, cultural, or discriminatory activity. The content is intended to foster learning 
                    and innovation in an ethical and inclusive manner.
                </p>
            </div>
            {/* Buttons */}
            <div className="flex space-x-4 mt-8">
                <button
                    onClick={handleHome}
                    className="bg-white text-black py-2 px-4 rounded hover:bg-white hover:text-theme-background transition"
                >
                    Home
                </button>
                <button
                    onClick={handleProceed}
                    className="bg-white text-black py-2 px-4 rounded hover:text-theme-background transition"
                >
                    Next
                </button>
            </div>
            {/* Floating Question Mark Button */}
            <div className="fixed bottom-5 right-5">
                <button
                    className="bg-gray-800 text-white text-xl p-4 rounded-full hover:bg-gray-700 focus:outline-none"
                    onClick={toggleInfo}
                >
                    ?
                </button>
            </div>
            {showInfo && (
                <div className="fixed bottom-20 right-5 bg-white text-black p-6 rounded-xl shadow-lg w-80 border border-gray-200 transition-all duration-200 ease-in-out">
                    <h4 className="font-bold text-center text-lg mb-2 text-gray-800">Category selection info</h4>
                    <dl className="text-sm text-gray-700 leading-relaxed">
                        <dt className="font-semibold">1:</dt>
                        <dd className="ml-4">Select one category from the three available options.</dd>
                        <dt className="font-semibold">2:</dt>
                        <dd className="ml-4">
                            Your selected category will be saved, and changes will not be allowed after this stage.
                        </dd>
                        <dt className="font-semibold">3:</dt>
                        <dd className="ml-4">Images will be displayed based on your selected category.</dd>
                    </dl>
                    <button
                        className="text-blue-500 mt-4 underline hover:text-blue-700"
                        onClick={toggleInfo}
                    >
                        Got it
                    </button>
                </div>
            )}
        </div>
    );
};

export default StimuliCategory;
