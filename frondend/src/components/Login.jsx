import React from 'react';
import AuthForm from './AuthForm';
import axios from 'axios';

const Login = () => {
  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8989/user/login', formData);
      
      if (response.status === 200) {
        alert('Login successful');
      
      }
    } catch (error) {
      
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Login error:', errorMessage);
      alert(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <AuthForm title="Login" onSubmit={handleLogin}>
      {(handleChange) => (
        <>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </>
      )}
    </AuthForm>
  );
};

export default Login;
