import React, { useState } from 'react';
import "../Assets/Signup.css";

const Signup = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // State for handling response
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setStatus({ loading: true, error: null, success: false });

    // Validation
    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setStatus({ loading: false, error: "Please fill in all fields.", success: false });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus({ loading: false, error: "Passwords do not match!", success: false });
      return;
    }

    // Prepare data for API
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      // Clear form and show success
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setStatus({ loading: false, error: null, success: true });
    } catch (error) {
      setStatus({ 
        loading: false, 
        error: error.message || "Registration failed. Please try again.", 
        success: false 
      });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
      
      {status.error && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          color: '#dc2626'
        }}>
          {status.error}
        </div>
      )}
      
      {status.success && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#dcfce7',
          border: '1px solid #22c55e',
          borderRadius: '4px',
          color: '#16a34a'
        }}>
          Registration successful! You can now log in.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          style={{
            padding: '10px',
            backgroundColor: status.loading ? '#93c5fd' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: status.loading ? 'not-allowed' : 'pointer',
            opacity: status.loading ? 0.7 : 1
          }}
        >
          {status.loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account?{' '}
        <a 
          href="/login" 
          style={{ color: '#2563eb', textDecoration: 'none' }}
        >
          Login here
        </a>
      </p>
    </div>
  );
};

export default Signup;