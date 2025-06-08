import React from 'react';
import CameraDisabled from "../assets/cameraDisabled.svg";

const CameraError = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-theme-background bg-opacity-90 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 className="text-lg font-bold mb-2 text-red-600">Camera Not Found</h2>
                <div className="flex justify-center mb-6">
                    <img src={CameraDisabled} alt="Camera Error" className="w-44 h-49" loading="lazy"/>
                </div>
                <p className="text-black">
                    Please make sure the camera is connected and turned on.
                </p>
            </div>
        </div>
    );
};

export default CameraError;
