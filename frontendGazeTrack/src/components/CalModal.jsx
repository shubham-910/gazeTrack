import React, { useEffect, useState } from 'react';

const CalModal = ({ onTimerComplete }) => {
    const [secondsLeft, setSecondsLeft] = useState(20);

    useEffect(() => {
        if (secondsLeft > 0) {
            const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (onTimerComplete) {
            onTimerComplete(); // Trigger the callback when the timer ends
        }
    }, [secondsLeft, onTimerComplete]);
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg text-center w-96 h-auto">
                <h2 className="text-xl font-bold text-theme-background mb-2">Congratulations! Calibration Completed.</h2>
                <h3> Sit back and relax, no need to use your mouse.</h3>
                <h3>You will be presented with 3 pairs of photos from the category you selected. Each pair will be displayed for 15 seconds.</h3>
                <p className="mb-2">
                    Redirecting in <span className="text-theme-background font-bold">{secondsLeft}</span> seconds...
                </p>
                <h4 className="text-m mb-2">Let's continue with gaze tracking.</h4>
            </div>
        </div>
    );
};

export default CalModal;
