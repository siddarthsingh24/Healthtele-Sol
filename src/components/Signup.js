// src/components/SignUp.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    console.log('SignUp form submitted'); // Debugging statement
    console.log(`Email: ${email}, Password: ${password}`); // Debugging statement

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign up successful'); // Debugging statement
      navigate('/'); // Redirect to home page after successful sign up
    } catch (error) {
      console.error('Error signing up with email and password', error);
      setError(error.message); // Set error message
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
