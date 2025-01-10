import React from "react";
import NavbarMenu from "../components/NavbarMenu";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="bg-theme-background min-h-screen text-white flex flex-col justify-between">
      {/* Navbar */}
      <NavbarMenu />

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8">About Our Application</h1>

            {/* General Info Section */}
            <p className="text-lg leading-relaxed text-justify mb-8">
                This application was built with the purpose of helping individuals manage and reduce anxiety and stress through modern technological solutions. By leveraging advanced features such as gaze tracking, personalized exercises, and real-time feedback, we aim to provide users with tools that will help improve their attention bias well-being. Our approach is rooted in scientifically-backed strategies designed to make attention bias modification support accessible and effective.
            </p>

            <div className="text-left">
    {/* What We Do */}
    <h2 className="text-3xl font-bold mb-4">What We Do</h2>
    <ul className="list-disc pl-6 mb-8 text-lg leading-relaxed">
        <li>Offer an innovative platform integrating <strong>gaze tracking</strong> and <strong>machine learning</strong>.</li>
        <li>Help users gain insights into their <strong>attentio bias patterns</strong>.</li>
        <li>Provide <strong>personalized feedback</strong> and targeted <strong>interventions</strong>.</li>
        <li>Empower individuals to:
            <ul className="list-disc pl-6">
                <li>Manage <strong>anxiety</strong>.</li>
                <li>Reduce <strong>stress</strong>.</li>
                <li>Build <strong>resilience</strong> using <strong>data-driven techniques</strong>.</li>
            </ul>
        </li>
    </ul>

    {/* Why Our Website */}
    <h2 className="text-3xl font-bold mb-4">Why Our Website</h2>
    <ul className="list-disc pl-6 mb-8 text-lg leading-relaxed">
        <li><strong>Bridges the gap</strong> in attention bias support with easy-to-use tools.</li>
        {/* <li>Provides <strong>science-backed resources</strong> accessible anytime, anywhere.</li> */}
        <li>Designed for anyone dealing with:
            <ul className="list-disc pl-6">
                <li><strong>Anxiety</strong>.</li>
                <li><strong>Stress</strong>.</li>
                <li>General improvement of <strong>attention bias well-being</strong>.</li>
            </ul>
        </li>
        <li>Meets you at any stage of your <strong>attention bias journey</strong>.</li>
    </ul>

    {/* How to Use This Website */}
    <h2 className="text-3xl font-bold mb-4">How to Use This Website</h2>
    <ul className="list-disc pl-6 mb-8 text-lg leading-relaxed">
        <li><strong>Register</strong> for an account.</li>
        <li>Follow the guided steps to set up:
            <ul className="list-disc pl-6">
                <li><strong>Personalized exercises</strong>.</li>
                <li><strong>attention bias modificaion tracking</strong>.</li>
            </ul>
        </li>
        <li>Use features like:
            <ul className="list-disc pl-6">
                <li><strong>Gaze tracking</strong>.</li>
                <li><strong>Real-time feedback</strong>.</li>
            </ul>
        </li>
        <li>Gain valuable insights to reduce <strong>stress</strong> and <strong>anxiety</strong>.</li>
    </ul>

    {/* How We Do Our Work */}
    <h2 className="text-3xl font-bold mb-4">How We Do Our Work</h2>
    <ul className="list-disc pl-6 mb-8 text-lg leading-relaxed">
        <li>Combine <strong>technology</strong> and <strong>psychology</strong> for effective attention bias modification solutions.</li>
        <li>Use <strong>user data</strong> and feedback to improve our system continuously.</li>
        <li>Tailor interventions through <strong>machine learning algorithms</strong> to meet individual needs.</li>
    </ul>
</div>


            {/* What Tools We Use */}
            <h2 className="text-3xl font-bold mb-4">The Tools We Use?</h2>
            <p className="text-lg leading-relaxed text-justify mb-8">
                We use a variety of modern tools to make our platform effective and user-friendly:
                <ul className="list-disc pl-8 mt-4">
                    <li><strong>Gaze Tracking:</strong> Monitors where users focus their attention, allowing us to provide real-time feedback on anxiety levels and ABM engagement.</li>
                    <li><strong>Machine Learning:</strong> Our system continuously learns from user data to make predictions and provide personalized interventions.</li>
                    <li><strong>Real-Time Feedback:</strong> Instant feedback is provided based on your interactions with the platform, helping you adjust your behavior for better outcomes.</li>
                    <li><strong>Persuasive Strategies:</strong> We use techniques like framing, customization, and positive reinforcement to encourage users to stay engaged and motivated.</li>
                </ul>
            </p>

            {/* Add more content as needed */}
        </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
