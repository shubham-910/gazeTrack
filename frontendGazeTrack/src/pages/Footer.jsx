import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
  <div className="container mx-auto px-4">
    {/* Company Information */}
    <div className="mb-4 text-center">
      <h2 className="text-xl font-bold mb-1">GazeTrack</h2>
      <p className="text-sm leading-relaxed">
        Helping you understand and manage anxiety through personalized gaze tracking and attention bias insights. Our mission is to provide a reliable tool for reducing bias in attention and improving well-being.
      </p>
    </div>

    {/* Quick Links */}
    <div className="flex justify-center space-x-4 mb-4">
      <a href="/home" className="text-sm hover:text-gray-300">Home</a>
      <a href="/privacypolicy" className="text-sm hover:text-gray-300">Privacy Policy</a>
      {/* <a href="/terms" className="text-sm hover:text-gray-300">Terms & Conditions</a> */}
    </div>

    {/* Copyright Information */}
    <div className="text-center text-xs">
      <p>© 2024 GazeTrack by Persuasive Computing Lab. All rights reserved.</p>
    </div>
  </div>
</footer>

    );
};

export default Footer;
