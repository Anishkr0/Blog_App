import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">About TechA</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">TechA</span>, your go-to platform for the latest in 
          <span className="text-blue-500 font-semibold"> technology, software development, and programming.</span> 
          Our mission is to bring insightful blogs, tutorials, and industry trends to keep you updated.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Whether you’re a beginner or an experienced developer, TechA offers valuable knowledge, 
          expert insights, and hands-on coding guides. Join our community to stay ahead in the tech world.
        </p>

        <div className="mt-8">
          <a
            href="/articles"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition"
          >
            Explore Articles
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
