"use client";
import Image from 'next/image';
import logoimg from "./logo.webp";
import { useState, useEffect, useRef } from 'react';
import { db } from './firebaseConnector'; // Ensure you import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const DemoVideos = () => {
  const [videos, setVideos] = useState([]); // For storing the videos
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const router = useRouter(); // Initialize useRouter
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  // Handle input change for contact form
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

  const loadVideos = async () => {
    try {
      const videoCollection = collection(db, "videos"); // Reference to the 'videos' collection
      const videoSnapshot = await getDocs(videoCollection); // Fetch all videos
      const videoList = videoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the documents to an array
      
      setVideos(videoList); // Set the parsed videos data to state
      console.log(videoList); // Log the video data for debugging
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-primary shadow-lg">
        <div className="container mx-auto flex items-center justify-between p-5 relative">
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center text-lg text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle the menu
          >
            {isMenuOpen ? '✖' : '☰'} {/* Icon for menu open/close */}
          </button>

          {/* Navigation Links */}
          <nav className={`hidden md:flex md:flex-row md:items-center`}>
            <a href="#home" className="text-lg text-white hover:text-accent transition duration-300 p-2">
              Home
            </a>
            <a href="#demos" className="text-lg text-white hover:text-accent transition duration-300 p-2">
              Demo Videos
            </a>
            <a href="#contact" className="text-lg text-white hover:text-accent transition duration-300 p-2">
              Contact Us
            </a>
            <button 
              onClick={() => router.push('/admin')} // Navigate to the admin page
              className="text-lg text-white hover:text-accent transition duration-300 p-2">
              Admin Page
            </button>
          </nav>

          {/* Dropdown for Mobile Menu */}
          {isMenuOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white text-primary rounded-lg shadow-lg z-20 w-40">
              <button 
                onClick={() => setIsMenuOpen(false)} // Close button
                className="block text-right px-4 py-2 text-lg font-bold text-red-500 hover:bg-gray-200 transition duration-300 w-full">
                Close
              </button>
              <a href="#home" className="block px-4 py-2 hover:bg-gray-200 transition duration-300">
                Home
              </a>
              <a href="#demos" className="block px-4 py-2 hover:bg-gray-200 transition duration-300">
                Demo Videos
              </a>
              <a href="#contact" className="block px-4 py-2 hover:bg-gray-200 transition duration-300">
                Contact Us
              </a>
              <button 
                onClick={() => router.push('/admin')} // Navigate to the admin page
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition duration-300">
                Admin Page
              </button>
            </div>
          )}
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

        {/* List of Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="border rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${video.link}?controls=0&modestbranding=1&rel=0`}
                title={video.description}
                allowFullScreen
                className="aspect-video"
              ></iframe>
              <div className="p-4">
                <h3 className="font-bold text-lg">{video.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="bg-gray-100 text-primary py-16 px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary"
            ></textarea>
          </div>
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="bg-primary py-4">
        <p className="text-center text-white">&copy; 2024 Success Wave. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DemoVideos;
