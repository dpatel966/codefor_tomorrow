import React from 'react';
import AuthForm from './AuthForm';
import axios from 'axios';

const Signup = () => {
  const handleSignup = async (formData) => {
    try {
      // Ensure to use the full URL with the protocol
      await axios.post('http://localhost:8989/user/signup', formData);
      alert('Signup successful');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <AuthForm title="Sign Up" onSubmit={handleSignup}>
      {(handleChange) => (
        <div>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
        </div>
      )}
    </AuthForm>
  );
};

export default Signup;
