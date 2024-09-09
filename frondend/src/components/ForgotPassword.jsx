import React, { useState } from 'react';
import AuthForm from './AuthForm';
import axios from 'axios';

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async (formData) => {
    try {
      // Ensure to use the full URL with the protocol
      const response = await axios.post('http://localhost:8989/user/forgot-password', formData);
      alert('Check your email for reset instructions');
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      // Set error message from server response if available
      const message = error.response?.data?.message || 'An error occurred. Please try again.';
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <AuthForm title="Forgot Password" onSubmit={handleForgotPassword}>
        {(handleChange) => (
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
        )}
      </AuthForm>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ForgotPassword;
