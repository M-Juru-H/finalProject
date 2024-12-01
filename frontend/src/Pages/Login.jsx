import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  // Status state for handling loading and errors
  const [status, setStatus] = useState({
    loading: false,
    error: null
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
    setStatus({ loading: true, error: null });

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for handling cookies/session
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Login failed');
      }

      const data = await response.json();
      
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(data));
      
      // Clear form and redirect to dashboard/home
      setFormData({ username: '', password: '' });
      navigate('/home'); // Make sure you have this route set up
      
    } catch (error) {
      setStatus({ 
        loading: false, 
        error: error.message || "Invalid username or password"
      });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      
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
          {status.loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ marginBottom: '10px' }}>
          Don't have an account?{' '}
          <a 
            href="/signup" 
            style={{ color: '#2563eb', textDecoration: 'none' }}
          >
            Sign Up here
          </a>
        </p>
        <a 
          href="/resetPassword" 
          style={{ color: '#2563eb', textDecoration: 'none' }}
        >
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

export default Login;