import React from "react";
import { useLocation } from "react-router-dom";
import loginImage from "../assets/loginImage.svg";
import LoginComp from "./LoginComp";
import RegisterComp from "./RegisterComp";

const HomePage = () => {
  const location = useLocation();

  const renderForm = () => {
    if (location.pathname === "/register") {
      return <RegisterComp />;
    }
    return <LoginComp />;
  };

  return (
    <div className="min-h-screen w-full bg-theme-background flex flex-col md:flex-row items-center justify-center px-4 md:pl-16">
      {/* Left Section: Text and Image */}
      <div className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 p-6 md:p-10 md:ml-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 text-center md:text-left">
          Empower your focus,<br /> Transform your mind
        </h1>
        <img
          className="w-3/4 md:w-2/3 h-auto mt-4"
          src={loginImage}
          alt="login screen"
          loading="lazy"
        />
      </div>

      {/* Right Section: Conditional Form Rendering */}
      <div className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 p-6 md:pl-16">
        <div className="w-full max-w-md">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
