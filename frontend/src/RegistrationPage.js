import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegistrationPage() {
  const [RegistrationData, setRegistrationData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]:value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', RegistrationData);
      alert('Registration successful!');
      console.log(response.data);
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed. Please try again.');
    }
    setRegistrationData({
      username:'',
      password:'',
    })
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="username"
            value={RegistrationData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={RegistrationData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegistrationPage;
