"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  async function checkLogin() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return localStorage.getItem("token");
    }
  }

  useEffect(() => {
    // Redirect to another route after the component mounts
    checkLogin().then((token) => { router.push("/dashboard"); });
  }, []);

  return <div></div>;
}
