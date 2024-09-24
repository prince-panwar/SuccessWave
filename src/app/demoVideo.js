"use client"
// components/DemoVideos.js
import Image from 'next/image';
import logoimg from "./logo.webp"
import { useState,useEffect } from 'react';
const DemoVideos = () => {
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [adminCredentials, setAdminCredentials] = useState({ id: '', password: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [videoData, setVideoData] = useState({ link: '', description: '' });
    const [videos, setVideos] = useState([]); // For storing the videos
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
      const loadVideos = async () => {
        try {
          const response = await fetch('/api/video');
      
          if (!response.ok) {
            // If the response is not ok, throw an error with the status text
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          // Check if the response has content before parsing
          const data = await response.text();  // Get raw text response
          const videos = data ? JSON.parse(data) : [];  // Parse the JSON if there is data, otherwise use an empty array
      
          setVideos(videos);  // Set the parsed videos data to state
          console.log(videos);  // Log the video data for debugging
        } catch (error) {
          console.error('Error loading videos:', error);
        }
      };
      
    
    useEffect(()=>{
    loadVideos()
    },[])
     
    
    const handleAdminLogin = (e) => {
        e.preventDefault();
        const { id, password } = adminCredentials;
      
        // Accessing the environment variables
        const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
        const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS;
      
        console.log("Admin ID: ", adminId);
        console.log("Admin Pass: ", adminPass);
      
        // Check if the credentials match
        if (id === adminId && password === adminPass) {
          setIsAuthenticated(true);
          setIsAdminModalOpen(false);
        } else {
          alert('Invalid credentials');
        }
      };
      
    
      const handleVideoSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch('/api/saveVideo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(videoData),
        });
    
        if (response.ok) {
          alert('Video added successfully');
          setVideoData({ link: '', description: '' });
          loadVideos(); // Reload videos after saving
        } else {
          alert('Failed to add video');
        }
      };
    
      // Open the admin modal
  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  // Close modal (either Admin Login or Video Modal)
  const closeModal = () => {
    setIsAdminModalOpen(false);
    setIsAuthenticated(false);
  };
    
  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Header Section */}
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
          <nav className="flex items-center space-x-6">
            <a href="#home" className="text-lg text-white hover:text-accent transition duration-300">
              Home
            </a>
            <a href="#demos" className="text-lg text-white hover:text-accent transition duration-300">
              Demo Videos
            </a>
            <a href="#contact" className="text-lg text-white hover:text-accent transition duration-300">
              Contact Us
            </a>

            {/* Admin Button */}
            <button
              className="bg-accent text-white font-bold py-2 px-4 rounded hover:bg-teal-700"
              onClick={openAdminModal}
            >
              Admin
            </button>
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

  {/* List of Videos */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {videos.map((video, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
        {/* Adjust aspect ratio for taller height */}
        <div className="relative pb-[75%]"> {/* For 4:3 aspect ratio (height increased) */}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.link}?controls=0&modestbranding=1&rel=0`}
            allow="encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        <p className="mt-4 text-gray-700 truncate">
          {video.description.length > 100
            ? `${video.description.substring(0, 100)}...`
            : video.description}
        </p>
      </div>
    ))}
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
              className="w-full p-2 border border-gray-300 rounded text-black bg-white"
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
              className="w-full p-2 border border-gray-300 rounded text-black bg-white"
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
              className="w-full p-2 border border-gray-300 rounded text-black bg-white"
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
     {/* Admin Login Modal */}
     {isAdminModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={closeModal}>
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-black">Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-left text-black font-bold mb-2" htmlFor="adminId">
                  Admin ID
                </label>
                <input
                  id="adminId"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  value={adminCredentials.id}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, id: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-black font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-accent text-white font-bold py-2 px-4 rounded w-full hover:bg-teal-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Modal for Adding Video */}
     {/* Admin Modal for Adding Video */}
{isAuthenticated && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={closeModal}>
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4 text-black">Add New Video</h2>
      <form onSubmit={handleVideoSubmit}>
        <div className="mb-4">
          <label className="block text-left text-black font-bold mb-2">Video Link</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-black" // Ensured text-black is applied
            value={videoData.link}
            onChange={(e) => setVideoData({ ...videoData, link: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left text-black font-bold mb-2">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded text-black" // Ensured text-black is applied
            value={videoData.description}
            onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-accent text-white font-bold py-2 px-4 rounded w-full hover:bg-teal-700">
          Add Video
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default DemoVideos;
