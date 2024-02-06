"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to another route after the component mounts
    router.push("/login");
  }, []);

  return (
    <div>
      <h1>Welcome to the Bialysis</h1>
    </div>
  );
}
