import React from 'react';
import '../Assets/Index.css';

const App = () => {
  return (
    <div>
      <header>
        <h1>Welcome to Car Garage</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>
        </nav>
      </header>
      <section className="hero">
        <h2>Your trusted car repair and maintenance service</h2>
        <p>Book your next service with us today!</p>
        <a href="/signup" className="btn">Get Started</a>
      </section>
      <footer>
        <p>&copy; 2024 Car Garage. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
