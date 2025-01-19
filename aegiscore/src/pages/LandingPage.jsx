import React, { useState } from "react";

const LandingPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-primary text-white flex flex-col">
      <nav className="flex justify-between items-center px-6 py-4 bg-dark shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-dark font-bold">CRH</span>
          </div>
          <h1 className="text-xl font-semibold">AegisCore</h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <button className="hover:text-gray-300">Home</button>
          <button className="hover:text-gray-300">About</button>
          <button className="hover:text-gray-300">Contact Us</button>
        </div>
      </nav>

      <main className="flex flex-1 flex-col justify-center items-center text-center space-y-6 relative">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/homepage.jpeg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark bg-opacity-50 backdrop-blur-md"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Stay Safe. Stay Informed.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl">
          In an era of global warming and climate change, disasters have become
          increasingly frequent. The need for effective disaster management and
          timely evacuation plans for communities has never been more
          urgent—and that’s precisely the challenge we address.
        </p>
        <button className="px-6 py-3 bg-white text-dark font-semibold rounded-full shadow-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </main>

      <section className="flex flex-col md:flex-row items-center justify-center my-10 px-6 md:px-20">
        <img
          src="/images/homepage.jpeg"
          alt="Descriptive"
          className="w-full md:w-1/2 object-cover rounded-lg shadow-lg"
        />
        <div className="md:ml-10 mt-6 md:mt-0">
          <h2 className="text-2xl md:text-3xl font-bold">
            Comprehensive Crisis Management
          </h2>
          <p className="text-lg mt-4">
            AegisCore is your ultimate solution to effectively manage crisis
            scenarios. With real-time updates, location-based services, and
            support for both individuals and government officials, this
            platform bridges the gap between safety and preparedness.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center my-10 px-6 md:px-20">
        <div className="md:ml-10 mt-6 md:mt-0">
          <h2 className="text-2xl md:text-3xl font-bold">
            AegisCore-Your Shield in Times of Crisis
          </h2>
          <p className="text-lg mt-4">
            Aegis symbolizes protection and guardianship, rooted in Greek
            mythology, while Core represents a central, foundational hub.
            Together, they convey the app's purpose as a reliable platform for
            organizing and managing crisis responses.
          </p>
        </div>
      </section>

      <section className="my-10 px-6 md:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">FAQs</h2>
        <div className="space-y-4">
          {["What is AegisCore and how does it work?",
            "How can I access real-time updates during a crisis?",
            "Is AegisCore suitable for government officials?",
          ].map((question, index) => (
            <div key={index} className="border-b border-gray-700 pb-4">
              <button
                className="w-full text-left text-lg font-semibold focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {question}
                <span className="float-right">{openFAQ === index ? "-" : "+"}</span>
              </button>
              {openFAQ === index && (
                <p className="mt-2 text-gray-300 text-sm">
                  {index === 0 &&
                    "AegisCore is a crisis management platform that integrates location-based services and real-time updates to ensure safety and preparedness during emergencies."}
                  {index === 1 &&
                    "Real-time updates can be accessed through our app or web portal. Enable notifications to receive timely alerts directly to your device."}
                  {index === 2 &&
                    "Yes, AegisCore is designed to support both individuals and government officials with features tailored for efficient crisis response."}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-dark mt-auto py-4 text-center">
        <p className="text-sm">© 2025 Crisis Response Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
