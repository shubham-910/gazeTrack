import React from "react";
import { useNavigate } from "react-router-dom"; 
import cameraPermission from "../assets/cameraPermission.svg"; 
import { MdArrowBackIos } from "react-icons/md";

const PermissionComp = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleCancel = () => {
        // Navigate to the main page (or whatever route you define for the main page)
        navigate("/home");
    };

    const handleContinue = () => {
        // Navigate to the next step, maybe a camera permission granting step or another route
        navigate("/calibration"); // Replace with your actual route for the next step
    };

    const handleCategorySelection = () => {
        // Navigate to the category selection page
        navigate("/category"); // Replace with your actual route for category selection
    };

    return (
        <div className="permission-comp bg-theme-background min-h-screen flex flex-col items-center justify-center">
    {/* Back to Category Link */}
    <div 
        className="text-sm text-theme-background mb-4 ml-[-20%] cursor-pointer flex items-center"
        onClick={handleCategorySelection} // Redirect to the category page
    >
        
        <span className="text-white hover:underline"><MdArrowBackIos></MdArrowBackIos></span>
        <span className="text-white hover:underline">Back to Category</span>
    </div>

    {/* Permission Box */}
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
            <img src={cameraPermission} alt="Camera Permission" className="w-44 h-49" loading="lazy"/>
        </div>

        <div className="mb-6">
            <h1 className="text-sm font-bold text-center">Smile please!</h1>
            <h4 className="text-sm text-center">
                We need camera access to track your gaze.
            </h4>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-between mt-4">
            {/* Cancel Button */}
            <button 
                className="w-1/2 mr-2 py-2 px-4 border border-red-600 text-red-600 bg-white rounded-lg hover:bg-gray-100 hover:text-white hover:bg-red-500 transition"
                onClick={handleCancel} // Call handleCancel when clicked
            >
                Cancel
            </button>
            {/* Continue Button */}
            <button 
                className="w-1/2 ml-2 py-2 px-4 bg-theme-primarybutton text-white rounded-lg hover:bg-white hover:text-theme-background hover:border-theme-background border border-transparent transition duration-200"
                onClick={handleContinue} // Call handleContinue when clicked
            >
                Continue
            </button>
        </div>
    </div>
</div>

    );
};

export default PermissionComp;
