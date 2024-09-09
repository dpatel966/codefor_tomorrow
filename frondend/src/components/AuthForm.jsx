import React, { useState } from 'react';

const AuthForm = ({ title, onSubmit, children }) => {
  const [formData, setFormData] = useState({});
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-form">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {children(handleChange)}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
