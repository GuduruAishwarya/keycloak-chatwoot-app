"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getKeycloak, initKeycloak } from "../../services/keycloak";

import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    initKeycloak({ onLoad: 'check-sso', pkceMethod: 'S256' })
      .then((auth: boolean) => {
        if (auth && isMounted) {
          router.replace("/home");
        }
      })
      .catch((err:unknown) => {
        console.error(err);
        if (isMounted) setError("Keycloak initialization failed");
      });
    return () => { isMounted = false; };
  }, [router]);

  const handleKeycloakLogin = async () => {
    try {
      await initKeycloak({ onLoad: 'login-required', pkceMethod: 'S256' });
      getKeycloak().login({ redirectUri: window.location.origin + "/home" });
    } catch (err) {
      console.error(err);
      setError("Keycloak login failed");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>Login</h1>
        <button className={styles.loginButton} onClick={handleKeycloakLogin}>
          Login with Keycloak
        </button>
        <p>
          Don&apos;t have an account? <a className={styles.loginLink} href="/register">Register here</a>
        </p>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
