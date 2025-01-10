import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gazeFollow from "../assets/gazeFollow.svg";
import Lottie from "react-lottie";
import * as AnimationDot from "../assets/AnimationDot.json";

const CalMainComp = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  const handleContinue = () => {
    navigate("/calibrate");
  };

  const handleChangeCategory = () => {
    navigate("/category");
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationDot.default, // Use .default if necessary for ES6 imports
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="permission-comp bg-theme-background min-h-screen flex justify-center items-center relative">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-sm font-bold text-center">Calibration Exercise</h1>
        <div className="flex justify-center mb-6">
          <img
            src={gazeFollow}
            alt="gaze instruction"
            className="w-44 h-49"
            loading="lazy"
          />
        </div>

        <div className="mb-6">
          <h1 className="text-sm font-bold text-center">
            Follow red dots on your screen with mouse and gaze.
          </h1>
          <h4 className="text-sm text-center">Click ? button for more information.</h4>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4 space-x-2">
          {/* Change Category Button */}
          <button
            onClick={handleChangeCategory}
            className="w-1/2 py-2 px-4 bg-white text-black rounded-lg border-2 hover:bg-gray-300 hover:text-gray-900 transition duration-200"
          >
            Change Category
          </button>
          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-1/2 py-2 px-4 bg-theme-primarybutton text-white rounded-lg hover:bg-white hover:text-theme-background hover:border-theme-background border border-transparent transition duration-200"
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
        <div className="fixed bottom-20 right-5 bg-white text-black p-6 rounded-xl shadow-lg w-80 border border-gray-200 transition-all duration-200 ease-in-out">
          <h4 className="font-bold text-center text-lg mb-2 text-gray-800">Calibration Instructions</h4>
          <div className="flex items-center justify-center mb-4">
            {/* Lottie Animation */}
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
          <dl className="text-sm text-gray-700 leading-relaxed">
            <dt className="font-semibold">Step 1:</dt>
            <dd className="ml-4">
              Click on each red dot 5 times with your gaze and mouse until it turns green.
            </dd>
            <dt className="font-semibold">Step 2:</dt>
            <dd className="ml-4">Once a dot turns green, move to the next dot.</dd>
            <dt className="font-semibold mt-2">Step 3:</dt>
            <dd className="ml-4">
              After successful calibration, you can continue without using the mouse.
            </dd>
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

export default CalMainComp;
