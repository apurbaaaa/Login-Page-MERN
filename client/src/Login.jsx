import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [formData, setFormData] = useState({
    userType: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.userType || !formData.email || !formData.password) {
      setError('Please fill out all fields!');
      return;
    }

    setError('');  // Clear any existing errors

    // Use Axios to send a POST request to your local server
    axios.post('http://localhost:3000/login', formData)
      .then(response => {
        console.log('Login success:', response.data);
        // Redirect based on userType
        if (formData.userType === 'investor') {
          navigate('/investor-dashboard'); // Redirect to the investor dashboard
        } else if (formData.userType === 'company') {
          navigate('/company-dashboard'); // Redirect to the company dashboard
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        setError('Login failed. Please try again.');
      });
  };

  return (
    <div className="card">
      <div className="container">
        <h1>LOGIN</h1>

        {error && <div className="error-message">{error}</div>}

        <form id="loginForm" onSubmit={handleSubmit}>
          <select
            className="btn"
            name="userType"
            required
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="" disabled>Select Option</option>
            <option value="investor">Investor</option>
            <option value="company">Company</option>
          </select>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <button className="btn" type="submit">LOGIN</button>

        </form>

        <a href="/"><button className="btn">BACK</button></a> 

      </div>
    </div>
  );
};

export default Login;
