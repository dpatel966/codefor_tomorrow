import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
  const [view, setView] = useState('login'); 

  return (
    <div className="app-container">
      <nav>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('signup')}>Sign Up</button>
        <button onClick={() => setView('forgot')}>Forgot Password</button>
        <button onClick={() => setView('reset')}>Reset Password</button>
      </nav>
      <div className="form-container">
        {view === 'login' && <Login />}
        {view === 'signup' && <Signup />}
        {view === 'forgot' && <ForgotPassword />}
        {view === 'reset' && <ResetPassword />}
      </div>
    </div>
  );
};

export default App;
