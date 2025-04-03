import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import Courses from './pages/Courses';
import CourseData from './pages/CourseData';
import VideoLecturePage from './pages/VideoLecturePage'; // Import the new VideoLecturePage
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SignupPage from './pages/SignupPage';
import { CartProvider } from './context/CartContext'; // Import the CartProvider

function App() {
  return (
    <CartProvider> {/* Wrap your App component with CartProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseData />} />
          <Route path="/lectures/:lectureId" element={<VideoLecturePage />} /> {/* Add this line */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
