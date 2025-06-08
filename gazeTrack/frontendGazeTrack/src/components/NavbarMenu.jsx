import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavbarManu = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.log('No auth token found');
      return;
    }

    try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL
        const response = await axios.post(
            `${apiUrl}/api/logout/`,
            {}, // Send an empty body
            {
                headers: {
                    'Authorization': `Token ${authToken}`, // Include the token in the Authorization header
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log(response.data);
        
        // Clear the token and navigate to login
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('userId'); 
        localStorage.removeItem('is_filled'); 
        if(localStorage.getItem('selectedCategory')){
            localStorage.removeItem('selectedCategory');
        }
        navigate('/login');
        toast.success("logged out successfully...");
    } catch (error) {
        console.error("Logout failed:", error.response ? error.response.data : error.message);
    }
};


  return (
    <nav className={`fixed top-0 left-0 w-full py-4 px-8 z-10 transition-colors duration-300 ${isScrolled ? 'bg-hover-navcolor' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className={`text-2xl font-bold ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
          <a href='/home' className='hover:text-black'>GazeTrack</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`text-3xl ${isScrolled ? 'text-black' : 'text-white'}`}
          >
            ☰
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex flex-grow justify-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <a href="/home" className={`hover:text-gray-300 ${isScrolled ? 'text-black hover:text-gray-800' : 'text-white'}`}>
                Home
              </a>
            </li>
            <li>
              <a href="/profile" className={`hover:text-gray-300 ${isScrolled ? 'text-black hover:text-gray-800' : 'text-white'}`}>
                Profile
              </a>
            </li>
            <li>
              <a href="/insights" className={`hover:text-gray-300 ${isScrolled ? 'text-black hover:text-gray-800' : 'text-white'}`}>
                Insights
              </a>
            </li>
            <li>
              <a href="/gadpage" className={`hover:text-gray-300 ${isScrolled ? 'text-black hover:text-gray-800' : 'text-white'}`}>
                GAD7 Form
              </a>
            </li>
            <li>
              <a href="/about-us" className={`hover:text-gray-300 ${isScrolled ? 'text-black hover:text-gray-800' : 'text-white'}`}>
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Logout Button for Desktop */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className={`py-2 px-4 border rounded transition-colors ${
              isScrolled 
                ? 'border-black text-black hover:bg-red-500 hover:border-red-500 hover:text-white' 
                : 'border-white text-white hover:bg-red-500 hover:border-red-500 hover:text-white'
            }`}
          >
            Log out
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-hover-navcolor p-4 text-black space-y-4">
          <a href="/home" className="block">Home</a>
          <a href="/profile" className="block">Profile</a>
          <a href="/insights" className="block">Insights</a>
          <a href="/gadpage" className="block">GAD7 Form</a>
          <a href="/about-us" className="block">About Us</a>
          <button onClick={handleLogout} className="block">Log out</button>
        </div>
      )}
    </nav>
  );
};

export default NavbarManu;
