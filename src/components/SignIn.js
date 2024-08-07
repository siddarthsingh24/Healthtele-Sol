// src/components/SignIn.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase'; // Ensure the path is correct
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    console.log('SignIn form submitted'); // Debugging statement
    console.log(`Email: ${email}, Password: ${password}`); // Debugging statement
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful'); // Debugging statement
      navigate('/'); // Redirect to home page after successful sign in
    } catch (error) {
      console.error('Error signing in with password and email', error);
      setError(error.message); // Set error message
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignIn;
