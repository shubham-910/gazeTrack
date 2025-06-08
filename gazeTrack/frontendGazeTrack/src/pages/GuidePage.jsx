import React from 'react';
import Lottie from 'react-lottie';
// import * as WelcomeAnimation from '../assets/welcome.json'; // Replace with your Lottie file

const GuidePage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData: WelcomeAnimation.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="min-h-screen bg-theme-background p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-theme-primary mb-4">Welcome to Your Mental Health App!</h1>
        <p className="text-lg text-gray-600">
          Discover how to use the app to track your mental health and improve well-being.
        </p>
      </header>

      {/* Animation */}
      <div className="flex justify-center mb-8">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>

      {/* Sections */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <ul className="list-disc ml-8 text-lg text-gray-700">
          <li>Gaze Tracking for personalized insights</li>
          <li>Step-by-step mental health exercises</li>
          <li>Real-time feedback to track progress</li>
          <li>Comprehensive reports on mental well-being</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How to Use the App</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h3 className="text-xl font-bold mb-2">Step 1</h3>
            <p>Register and log in to access your dashboard.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h3 className="text-xl font-bold mb-2">Step 2</h3>
            <p>Start the calibration process to train the app for gaze tracking.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h3 className="text-xl font-bold mb-2">Step 3</h3>
            <p>Follow the exercises and get personalized feedback.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-lg text-gray-700">
          Our app combines cutting-edge technology with mental health expertise to provide you with a seamless and effective way to manage stress and anxiety.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center mt-12">
        <p className="text-gray-500 text-sm">
          © 2024 Your Mental Health App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default GuidePage;
