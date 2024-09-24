// components/AdminPage.js
"use client";
import { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConnector';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [videoData, setVideoData] = useState({ link: '', description: '' });
  const [videos, setVideos] = useState([]);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        loadVideos(); // Load videos when user is authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  const loadVideos = async () => {
    try {
      const videoCollection = collection(db, "videos");
      const videoSnapshot = await getDocs(videoCollection);
      const videoList = videoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVideos(videoList);
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "videos"), videoData);
      alert('Video added successfully');
      setVideoData({ link: '', description: '' });
      loadVideos(); // Reload videos after adding
    } catch (error) {
      alert('Failed to add video: ' + error.message);
    }
  };

  const handleVideoDelete = async (videoId) => {
    try {
      await deleteDoc(doc(db, "videos", videoId));
      alert('Video deleted successfully');
      loadVideos(); // Reload videos after deletion
    } catch (error) {
      alert('Failed to delete video: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (error) {
      alert('Failed to log out: ' + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      setLoginData({ email: '', password: '' });
    } catch (error) {
      alert('Failed to log in: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Admin Page</h1>
      {isAuthenticated ? (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mb-4 w-full">
            Logout
          </button>
          <form onSubmit={handleVideoSubmit} className="mb-4">
            <h3 className="text-xl font-bold mb-2">Add a Video</h3>
            <input
              type="text"
              placeholder="Video Link"
              value={videoData.link}
              onChange={(e) => setVideoData({ ...videoData, link: e.target.value })}
              required
              className="border p-2 rounded w-full mb-2 text-black"
            />
            <input
              type="text"
              placeholder="Video Description"
              value={videoData.description}
              onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
              required
              className="border p-2 rounded w-full mb-2 text-black"
            /> 
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded w-full">
              Submit Video
            </button>
          </form>

          <h3 className="text-xl font-bold mb-2">Existing Videos</h3>
          <ul className="space-y-4">
            {videos.map((video) => (
              <li key={video.id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                <div className="flex flex-col">
                  <iframe width="200" height="150" src={`https://www.youtube.com/embed/${video.link}?controls=0&modestbranding=1&rel=0`}
                   title={video.description} allowFullScreen></iframe>
                  <span className="block text-center mt-2">{video.description}</span>
                </div>
                <button
                  onClick={() => handleVideoDelete(video.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
              className="border p-2 rounded w-full mb-2 text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
              className="border p-2 rounded w-full mb-2 text-black"
            />
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded w-full">
              Login
            </button>
          </form>
          <p className="text-center text-gray-400">You must be logged in to view the admin functionalities.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
