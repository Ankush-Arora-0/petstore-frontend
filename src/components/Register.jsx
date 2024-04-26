import React, { useState } from 'react';
import "../style/Register.css";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  // sending a post request to signup user
  const registerData = async () => {
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name: formData.fullName, email: formData.email, phone: formData.phone, password: formData.password })
      })
      const data = await res.text();
      if (res.status === 200) {
        alert(data);
        navigate('/login');
      } else if (res.status === 400) {
        alert(data); // Display error message received from backend
      } else {
        alert('An error occurred during registration.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again later.');
    }
  }
  // creating a function to change inputs values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  //creating a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset form fields after submission
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: ''
    });
  };

  return (
    <div className="register-form">
      <h2>Register Now</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name :-</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className='reg-input'
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :-</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className='reg-input'
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number :-</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className='reg-input'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :-</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className='reg-input'
          />
        </div>
        <button className='reg-btn' type="submit" onClick={registerData}> Register</button>
      </form>
    </div>
  );
};

export default Register;
