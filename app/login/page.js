"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/notes");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf3ff] via-[#f7faff] to-[#eaf3ff] p-4">
      <div className="bg-white/80 rounded-2xl shadow-xl max-w-md w-full p-10 border border-[#e0e7ff]/60 backdrop-blur-lg">
        <h1 className="text-4xl font-heading font-bold text-[#22223b] mb-6 text-center">
          Welcome Back
        </h1>
        <p className="text-[#5c6b7c] text-center mb-8">
          Sign in to access your notes
        </p>
        {error && (
          <p className="bg-[#ffe4e6] border border-[#fecdd3] text-[#ef4444] px-4 py-3 rounded-lg mb-4 text-center text-sm">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label text-[#5c6b7c]">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="form-input py-3 px-4 rounded-lg border border-[#e0e7ff] bg-white text-[#2b59ff] focus:ring-2 focus:ring-[#b17cff]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label text-[#5c6b7c]">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-input py-3 px-4 rounded-lg border border-[#e0e7ff] bg-white text-[#2b59ff] focus:ring-2 focus:ring-[#b17cff]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-lg font-semibold py-3 rounded-lg bg-gradient-to-r from-[#2b59ff] to-[#b17cff] text-white shadow-md hover:scale-105 transition-transform"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-[#5c6b7c] mt-6">
          Don't have an account?{' '}
          <a 
            href="/register" 
            className="text-[#7c3aed] font-medium hover:text-[#a78bfa] transition-colors"
          >
            Create one now
          </a>
        </p>
      </div>
    </div>
  );
}
