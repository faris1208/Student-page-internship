"use client"
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from "./styles.module.scss"

// Firebase initialization (ensure Firebase is properly configured in your project)
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBhZA1CLzCi3zsI0GV1H-1ZFPbuED_9K40",
    authDomain: "student-internship-project.firebaseapp.com",
    projectId: "student-internship-project",
    storageBucket: "student-internship-project.firebasestorage.app",
    messagingSenderId: "823811819941",
    appId: "1:823811819941:web:2f8edbba49fce08cc5404c",
    measurementId: "G-02FRQNNFG8"
  };

initializeApp(firebaseConfig);

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      alert('Sign-up successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.signup_container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

