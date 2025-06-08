import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarMenu from "../components/NavbarMenu";
import mindMapImage from "../assets/mindMapImage.svg";
import Footer from "./Footer";

const LandingPage = () => {
    const location = useLocation();

    useEffect(() => {
        // Show success message if passed through navigation state
        if (location.state && location.state.message) {
            toast.success(location.state.message);
        }
    }, [location]);

    return (
        <div className="bg-theme-background min-h-screen text-white">
            <NavbarMenu />
            <div className="flex flex-col md:flex-row justify-between items-center pt-20 py-16 px-10">
                <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
                    <img src={mindMapImage} alt="Information" className="rounded w-full" style={{ height: '356px' }} />
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-6 tracking-wide leading-tight">
                        Identify and Manage Anxiety Levels
                    </h2>
                    <p className="text-lg mb-20 inter text-center leading-relaxed">
                        Our platform uses proven strategies to help <br />
                        you understand your anxiety triggers and stress patterns. <br />
                        By tracking your behavior and providing personalized feedback, <br />
                        we guide you in reducing anxiety and improving your mental well-being.
                        <br /><br />
                        Click "Read More" to explore more.
                    </p>
                </div>
            </div>

            <div className="text-center mt-6">
            <button
              onClick={() => window.location.href = "/category"}
              className="py-3 px-8 bg-white text-[#7579E7] rounded-lg font-semibold hover:bg-gray-200 transition"
              >
              Get Started
            </button>
                <h4 className="mt-3">
                    By clicking the button above, you will be redirected to the "Category Selection" page
                </h4>

                <div className="mt-8 flex flex-col items-center">
                    <span className="text-xl font-medium mb-2">Read More</span>
                    <a href="#more-content" className="animate-bounce">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>
            </div>

            <div id="more-content" className="py-20 px-10 bg-theme-background text-white mt-10">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Which Persuasive Strategies we have used
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Block 1 - Framing */}
          <div className="bg-gray-100 text-black rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-theme-background text-center mb-4">Framing</h3>
            <p className="text-base leading-relaxed">
              Framing helps you focus on your progress and achievements rather than setbacks. By seeing your attention bias journey in a positive light, you'll feel more motivated to continue improving, reducing stress and anxiety over time.
            </p>
          </div>

          {/* Block 2 - Customization */}
          <div className="bg-gray-100 text-black rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-theme-background text-center mb-4">Customization</h3>
            <p className="text-base leading-relaxed">
              Tailoring attention bias interventions to your specific needs makes each step more effective. When advice or exercises are personalized, they resonate with your situation, helping to manage stress and improve your overall well-being.
            </p>
          </div>

          {/* Block 3 - Feedback Loops */}
          <div className="bg-gray-100 text-black rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-theme-background text-center mb-4">Feedback Loops</h3>
            <p className="text-base leading-relaxed">
              Continuous feedback helps you understand how your behavior affects your attention bias modificaion. Knowing how small actions make a difference can reduce anxiety, increase awareness, and keep you on track with your mental health goals.
            </p>
          </div>

          {/* Block 4 - Goal Setting */}
          <div className="bg-gray-100 text-black rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-theme-background text-center mb-4">Goal Setting</h3>
            <p className="text-base leading-relaxed">
              Setting small, achievable goals gives you a sense of accomplishment and reinforces positive behaviors. By consistently achieving these goals, you build resilience and reduce stress in a manageable way.
            </p>
          </div>

          {/* Block 5 - Positive Reinforcement */}
          <div className="bg-gray-100 text-black rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-theme-background text-center mb-4">Positive Reinforcement</h3>
            <p className="text-base leading-relaxed">
              Positive reinforcement, such as recognizing your progress, helps you feel rewarded for your efforts. This boosts your mood and strengthens healthy habits, leading to a more balanced and stress-free mindset.
            </p>
          </div>

          {/* Block 6 - Emotional Awareness */}
          <div className="bg-gray-100 text-black rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-theme-background text-center mb-4">Emotional Awareness</h3>
            <p className="text-base leading-relaxed">
              Recognizing and understanding your emotions can prevent anxiety from escalating. By being aware of emotional triggers, you can take action to stay calm and focused, improving your attention bias resilience over time.
            </p>
          </div>
        </div>
                {/* Strategy blocks */}
                {/* Reuse the same code for blocks here */}
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
