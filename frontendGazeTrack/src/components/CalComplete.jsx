import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import gazeFollow from "../assets/gazeFollow.svg";

const CalComplpete = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [showInfo, setShowInfo] = useState(false); // State to handle info display

  const handleSkip = () => {
    // Navigate to the main page (or any route you define)
    navigate("/home");
  };

  const handleContinue = () => {
    // Navigate to the next step (like camera permission page)
    navigate("/gazetrack"); // Replace with your actual route for the next step
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo); // Toggle the info box visibility
  };

  return (
    <div className="permission-comp bg-theme-background min-h-screen flex justify-center items-center relative">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src={gazeFollow} // Add your image here
            alt="gaze instruction"
            className="w-44 h-49"
            loading="lazy"
          />
        </div>

        <div className="mb-6">
          <h1 className="text-sm font-bold text-center">Follow red dots on your screen with gaze.</h1>
          <h4 className="text-sm text-center">
          Once the dot turns to green move to a different dot.
          </h4>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          {/* Skip Button */}
          <button
            className="w-1/2 mr-2 py-2 px-4 border border-black text-red-500 bg-white rounded-lg hover:bg-gray-100 transition"
            onClick={handleSkip} // Call handleSkip when clicked
          >
            Skip
          </button>

          {/* Continue Button */}
          <button
            className="w-1/2 ml-2 py-2 px-4 bg-theme-primarybutton text-white rounded-lg hover:bg-theme-primarybutton-hover transition"
            onClick={handleContinue} // Call handleContinue when clicked
          >
            Continue
          </button>
        </div>
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

      {/* Info message when question mark button is clicked */}
      {showInfo && (
        <div className="fixed bottom-20 right-5 bg-white text-black p-4 rounded-lg shadow-lg w-64">
          <h4 className="font-bold mb-2">More Information</h4>
          <p className="text-sm">
            This page requests camera access to track your gaze for improved functionality.
          </p>
          <button
            className="text-blue-500 mt-2 underline"
            onClick={toggleInfo}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CalComplpete;
