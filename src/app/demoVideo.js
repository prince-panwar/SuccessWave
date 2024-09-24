"use client"
// components/DemoVideos.js
import Image from 'next/image';
import logoimg from "./logo.webp"
import { useState } from 'react';
const DemoVideos = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          alert('Message sent successfully!');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        } else {
          alert('Failed to send message.');
        }
      };
  return (
    <div className="min-h-screen bg-primary text-white">
      <header className="sticky top-0 z-50 bg-primary shadow-lg">
        <div className="container mx-auto flex items-center justify-between p-5">
          <div className="flex items-center space-x-3">
            {/* Logo Section */}
            <Image
              src={logoimg}
              alt="Success Wave Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-white">Success Wave</span>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#home"
                  className="text-lg text-white hover:text-accent transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#demos"
                  className="text-lg text-white hover:text-accent transition duration-300"
                >
                  Demo Videos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-lg text-white hover:text-accent transition duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="home" className="flex flex-col items-center justify-center text-center py-20">
        <div className="mb-8">
          <Image
            src={logoimg}
            alt="Success Wave Logo"
            width={150}
            height={150}
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Success Wave</h1>
        <p className="mt-4 text-lg md:text-xl text-light max-w-2xl">
          Discover our innovative EdTech platform and watch demo videos that show how we make learning engaging and impactful.
        </p>
      </main>

      {/* Demo Videos Section */}
      <section id="demos" className="bg-white text-primary py-16 px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Demo Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-light p-4 rounded-lg shadow-lg">
            <video controls className="w-full rounded-lg">
              <source src="/demo1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3 className="text-xl font-semibold mt-4">Video Title 1</h3>
            <p className="text-gray-700">Brief description of the demo video.</p>
          </div>
          <div className="bg-light p-4 rounded-lg shadow-lg">
            <video controls className="w-full rounded-lg">
              <source src="/demo2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3 className="text-xl font-semibold mt-4">Video Title 2</h3>
            <p className="text-gray-700">Brief description of the demo video.</p>
          </div>
          <div className="bg-light p-4 rounded-lg shadow-lg">
            <video controls className="w-full rounded-lg">
              <source src="/demo3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3 className="text-xl font-semibold mt-4">Video Title 3</h3>
            <p className="text-gray-700">Brief description of the demo video.</p>
          </div>
        </div>
      </section>
      
       {/* Contact Us Section */}
       <footer id="contact" className="bg-accent py-8 text-center">
        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
        <form className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-left text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-left text-gray-700 font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="5"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-teal-700"
          >
            Send Message
          </button>
        </form>

        <p className="mt-4 text-light">&copy; 2024 Success Wave. All rights reserved.</p>
      </footer>
 
    </div>
  );
};

export default DemoVideos;
