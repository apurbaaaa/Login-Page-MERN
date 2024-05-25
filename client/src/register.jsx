import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    for (let key in formData) {
      if (formData[key].trim() === '') {
        setError('Please fill out all fields!');
        return;
      }
    }

    setError(''); 


    axios.post('http://localhost:3000/register', {
      userType: userType,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    })
    .then(response => {
      console.log('Success:', response.data);
      setFormData({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
      setUserType('');
      // Redirect or inform user of successful registration
    })
    navigate('/Login')
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to register. Please try again.');
    });
  };

  return (
    <div className="register-card">
      <div className="register-container">
        <h1>REGISTER</h1>
        <hr />

        {error && <div className="error-message">{error}</div>}

        <form id="registerForm" onSubmit={handleSubmit}>
          <label htmlFor="user_type">User Type</label>
          <select
            className="form-control"
            name="user_type"
            required
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="" disabled>Select Option</option>
            <option value="investor">Investor</option>
            <option value="company">Company</option>
          </select>

          <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} />
          <button type="submit" className="btn submit-btn">REGISTER</button>
        </form>

        <a href="/"><button className="btn back-btn">BACK</button></a>
      </div>
    </div>
  );
};

export default Register;
