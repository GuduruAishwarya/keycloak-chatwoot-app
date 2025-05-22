"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./register.module.css";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => router.replace("/login"), 1500);
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
  };

  return (
    <div>
      <div className={styles.registerContainer}>
        <div className={styles.registerBox}>
          <h1 className={styles.registerTitle}>Register</h1>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <input
              className={styles.registerInput}
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              className={styles.registerInput}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button className={styles.registerButton} type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </div>
        <p style={{textAlign: 'center', marginTop: '1rem'}}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}
