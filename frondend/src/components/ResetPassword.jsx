import React from 'react';
import AuthForm from './AuthForm';
import axios from 'axios';

const ResetPassword = () => {
  const handleResetPassword = async (formData) => {
    try {
      // Ensure to use the full URL with the protocol
      const response = await axios.post('http://localhost:8989/user/reset_pass', formData);
      alert('Password reset successful');
    } catch (error) {
      console.error('Reset Password error:', error);
    }
  };

  return (
    <AuthForm title="Reset Password" onSubmit={handleResetPassword}>
      {(handleChange) => (
        <>
          <div>
            <label htmlFor="id">User ID</label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="User ID"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
    </AuthForm>
  );
};

export default ResetPassword;
