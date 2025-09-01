"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated.");
      return;
    }

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create note");
        return;
      }

      router.push("/notes");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf3ff] via-[#f7faff] to-[#eaf3ff] p-4">
      <div className="bg-white/80 rounded-2xl shadow-xl max-w-xl w-full p-10 border border-[#e0e7ff]/60 backdrop-blur-lg">
        <h1 className="text-4xl font-heading font-bold text-[#22223b] mb-6 text-center">
          Create New Note
        </h1>
        {error && (
          <p className="bg-[#ffe4e6] border border-[#fecdd3] text-[#ef4444] px-4 py-3 rounded-lg mb-4 text-center text-sm">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label text-[#5c6b7c]">Title</label>
            <input
              type="text"
              placeholder="Note Title"
              className="form-input py-3 px-4 rounded-lg border border-[#e0e7ff] bg-white text-[#2b59ff] focus:ring-2 focus:ring-[#b17cff]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label text-[#5c6b7c]">Content</label>
            <textarea
              placeholder="Write your note here..."
              className="form-input py-3 px-4 rounded-lg border border-[#e0e7ff] bg-white text-[#22223b] focus:ring-2 focus:ring-[#b17cff] min-h-[120px] resize-vertical"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-lg font-semibold py-3 rounded-lg bg-gradient-to-r from-[#2b59ff] to-[#b17cff] text-white shadow-md hover:scale-105 transition-transform"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
}
