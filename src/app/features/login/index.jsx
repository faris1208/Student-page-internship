"use client";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./styles.module.scss";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

const firebaseConfig = {
  apiKey: "AIzaSyBhZA1CLzCi3zsI0GV1H-1ZFPbuED_9K40",
  authDomain: "student-internship-project.firebaseapp.com",
  projectId: "student-internship-project",
  storageBucket: "student-internship-project.firebasestorage.app",
  messagingSenderId: "823811819941",
  appId: "1:823811819941:web:2f8edbba49fce08cc5404c",
  measurementId: "G-02FRQNNFG8",
};

initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false)

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      if (userCredential.user) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h3>Login</h3>
        <form onSubmit={handleLogin} className={styles.log_form}>
          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.form_group}>
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
          <div className={styles.login_button}>
            <button type="submit" disabled={loading} className={styles.login_btn}>
              {loading? "loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
