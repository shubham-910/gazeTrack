import React, { useEffect, useState, useRef } from 'react';
import CalModal from './CalModal';
import Lottie from 'react-lottie';
import * as AnimationDot from "../assets/AnimationDot.json";
import GazeTest from './GazeTest';
import CameraError from './CameraError';

const CalibrationGrid = () => {
    const [dots, setDots] = useState([
        { id: 1, x: '5%', y: '10%', color: 'red', clicks: 0 },
        { id: 2, x: '50%', y: '10%', color: 'red', clicks: 0 },
        { id: 3, x: '95%', y: '10%', color: 'red', clicks: 0 },
        { id: 4, x: '5%', y: '50%', color: 'red', clicks: 0 },
        { id: 5, x: '50%', y: '50%', color: 'red', clicks: 0 },
        { id: 6, x: '95%', y: '50%', color: 'red', clicks: 0 },
        { id: 7, x: '5%', y: '90%', color: 'red', clicks: 0 },
        { id: 8, x: '50%', y: '90%', color: 'red', clicks: 0 },
        { id: 9, x: '95%', y: '90%', color: 'red', clicks: 0 }
    ]);

    const [view, setView] = useState('calibration'); // Manage views: calibration, modal, or test
    const [cameraError, setCameraError] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const webgazerRef = useRef(null);

    const toggleInfo = () => setShowInfo(!showInfo);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: AnimationDot.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    useEffect(() => {
        const initializeWebGazer = async () => {
            if (!webgazerRef.current) {
                try {
                    // Ensure camera access
                    await navigator.mediaDevices.getUserMedia({ video: true });
    
                    // Load WebGazer script
                    const script = document.createElement("script");
                    script.src = "https://cdn.jsdelivr.net/npm/webgazer";
                    script.async = true;
                    document.body.appendChild(script);
    
                    script.onload = () => {
                        const webgazer = window.webgazer;
                        
                        // Set up gaze listener
                        webgazer.setGazeListener((data, timestamp) => {
                            if (data) {
                                console.log("Prediction:", data);
                            } else {
                                console.warn("No prediction data available");
                            }
                        }).begin();
    
                        // Enable video preview and prediction points
                        webgazer.showVideoPreview(true);
                        webgazer.showPredictionPoints(false);
    
                        webgazerRef.current = webgazer;
                    };
    
                    script.onerror = () => {
                        console.error("Failed to load WebGazer script");
                        setCameraError(true);
                    };
                } catch (error) {
                    console.error("Camera access error:", error);
                    setCameraError(true);
                }
            }
        };
    
        initializeWebGazer();
    
        return () => {
            const webgazer = webgazerRef.current;
            if (webgazer) {
                webgazer.end();
                webgazerRef.current = null;
            }
        };
    }, []);

    const handleClick = (id) => {
        setDots((prevDots) =>
            prevDots.map((dot) => {
                if (dot.id === id && dot.clicks < 5) {
                    const newClicks = dot.clicks + 1;
                    const newColor = newClicks === 5 ? 'green' : 'red';
                    return { ...dot, clicks: newClicks, color: newColor };
                }
                return dot;
            })
        );
    };

    useEffect(() => {
        const allGreen = dots.every((dot) => dot.color === 'green');
        if (allGreen) {
            setView('modal'); // Show CalModal before transitioning to test
        }
    }, [dots]);

    const handleModalComplete = () => {
        const webgazer = webgazerRef.current;
        if (webgazer) {
            webgazer.showVideoPreview(false); // Disable video preview when transitioning
            webgazer.showPredictionPoints(false);
        }
        setView('test'); // Move to the GazeTest component
    };

    return (
        <div className="relative w-screen h-screen">
            {cameraError && <CameraError />}
            {view === 'calibration' && (
                <>
                    {dots.map((dot) => (
                        <div
                            key={dot.id}
                            onClick={() => handleClick(dot.id)}
                            className={`absolute rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${dot.color === 'green' ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{
                                top: dot.y,
                                left: dot.x,
                                width: '20px',
                                height: '20px',
                            }}
                        />
                    ))}
                </>
            )}
            {view === 'modal' && <CalModal onTimerComplete={handleModalComplete} />}
            {view === 'test' && <GazeTest />} {/* Render GazeTest component */}

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
                    <h4 className="font-bold text-lg mb-2 text-gray-800">Calibration Instructions</h4>
                    <div className="flex items-center justify-center mb-4">
                        <Lottie
                            options={defaultOptions}
                            height={150}
                            width={150}
                        />
                    </div>
                    <dl className="text-sm text-gray-700 leading-relaxed">
                        <dt className="font-semibold">Step 1:</dt>
                        <dd className="ml-4">
                            Click on each red dot 5 times with your gaze and mouse until it turns green.
                        </dd>
                        <dt className="font-semibold">Step 2:</dt>
                        <dd className="ml-4">
                            Once a dot turns green, move to the next dot.
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

export default CalibrationGrid;
