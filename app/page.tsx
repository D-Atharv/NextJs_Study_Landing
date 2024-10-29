'use client'
import Landing from "@/components/landing/Landing";
import Loader from "@/components/loader/Loader";
import { useState, useEffect } from "react";

export default function Home() {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Landing />
      )}
    </>
  );
}
