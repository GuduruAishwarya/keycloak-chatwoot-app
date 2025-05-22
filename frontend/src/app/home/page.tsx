"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getKeycloak, initKeycloak } from "../../services/keycloak";
// import KnowledgeBase from "../components/KnowledgeBase";

import styles from "./home.module.css";
import ChatWootWidget from "../components/ChatWootWidget";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    initKeycloak({ onLoad: 'check-sso', pkceMethod: 'S256' })
      .then((auth: boolean) => {
        if (!auth && isMounted) {
          router.replace("/login");
        }
      })
      .catch(() => {
        if (isMounted) setError("Keycloak initialization failed");
      });
    return () => { isMounted = false; };
  }, [router]);

  const handleLogout = async () => {
    try {
      await initKeycloak({ onLoad: 'check-sso', pkceMethod: 'S256' });
      getKeycloak().logout({ redirectUri: window.location.origin + '/login' });
    } catch {
      setError("Keycloak logout failed");
    }
  };

  return (
    <div className={styles.homeWrapper}>
      <header className={styles.homeHeader}>
        <h2 className={styles.homeTitle}>Welcome, you are logged in!</h2>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>
      {error && <p className={styles.error}>{error}</p>}
      {/* <main className={styles.homeMain}> */}
        {/* <KnowledgeBase /> */}
      {/* </main> */}
      <ChatWootWidget/>
    </div>
  );
}
