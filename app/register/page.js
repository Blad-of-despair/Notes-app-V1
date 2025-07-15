"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/notes");
  }
}, []);


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white border-opacity-20 text-black">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Create Your Account</h1>
        {error && (
          <p className="bg-red-500 bg-opacity-70 p-3 rounded-md mb-4 text-center text-black text-sm">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-md bg-white bg-opacity-20 border border-black border-opacity-30 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
           className="w-full p-3 rounded-md bg-white bg-opacity-20 border border-black border-opacity-30 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-purple-600 p-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm opacity-90">
          Already have an account? <a href="/login" className="text-black font-semibold hover:underline">Login Here</a>
        </p>
      </div>
    </div>
  );
}
