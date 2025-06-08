import React from 'react';
import Footer from './Footer';
import NavbarManu from '../components/NavbarMenu';

const PrivacyPolicy = () => {
    return (
        <div className="bg-theme-background min-h-screen flex flex-col">
            {/* Navbar */}
            <NavbarManu />

            {/* Main Content */}
            <div className="flex-grow">
                <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg my-12">
                    <h1 className="text-5xl font-bold mb-8 text-center text-theme-primary">
                        Privacy Policy
                    </h1>

                    {/* Introduction */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-theme-secondary">
                            1. Introduction
                        </h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-700">
                            <li>We prioritize your privacy and are committed to protecting your data.</li>
                            <li>This policy explains the data we collect and how we use it.</li>
                        </ul>
                    </section>

                    {/* Information We Collect */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-theme-secondary">
                            2. Information We Collect
                        </h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-700">
                            <li>We collect gaze tracking data, such as X and Y coordinates and timestamps.</li>
                            <li>No facial recognition, expressions, or video recordings are captured.</li>
                        </ul>
                    </section>

                    {/* How We Use the Data */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-theme-secondary">
                            3. How We Use the Data
                        </h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-700">
                            <li>To improve user interactions and enhance the platform experience.</li>
                            <li>To train machine learning models for better gaze prediction and classification.</li>
                            <li>Data is exclusively used for product development.</li>
                        </ul>
                    </section>

                    {/* Data Sharing */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-theme-secondary">
                            4. Data Sharing
                        </h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-700">
                            <li>Your data is not shared with third parties for marketing or commercial purposes.</li>
                            <li>Any legal or regulatory data sharing is conducted with anonymized information.</li>
                        </ul>
                    </section>

                    {/* Data Storage and Security */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-theme-secondary">
                            5. Data Storage and Security
                        </h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-700">
                            <li>All data is securely stored with encryption and strict access controls.</li>
                            <li>Data is retained only as long as necessary for the application’s improvement.</li>
                        </ul>
                    </section>

                    {/* User Rights */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-theme-secondary">
                            6. Your Rights
                        </h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-700">
                            <li>You have the right to access, modify, or delete your personal data.</li>
                            <li>If you wish to exercise these rights, please contact us at support@gazetrack.com.</li>
                        </ul>
                    </section>

                    {/* Third-Party Services */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-theme-secondary">
                            7. Third-Party Services
                        </h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-700">
                            <li>We work with trusted third-party service providers to host and manage data.</li>
                            <li>All third parties comply with relevant data protection regulations.</li>
                        </ul>
                    </section>

                    {/* Consent */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-theme-secondary">
                            8. Consent
                        </h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-700">
                            <li>By using this platform, you consent to our privacy practices as outlined here.</li>
                        </ul>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
