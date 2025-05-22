"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Test() {
  const router = useRouter();
  useEffect(() => {
    // Example: redirect to login if not authenticated
    // You can add your own logic here
  }, [router]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Test Page</h1>
      <p>This is a test route using the App Router.</p>
    </div>
  );
}
