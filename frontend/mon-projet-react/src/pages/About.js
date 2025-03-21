import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-900 to-indigo-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">About Us</h1>
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
        <p className="text-gray-700">
          We are a team of passionate developers and project managers dedicated to providing the best tools for managing your projects efficiently. Our mission is to simplify project management and help you achieve your goals with ease.
        </p>
      </div>
    </div>
  );
};

export default About;