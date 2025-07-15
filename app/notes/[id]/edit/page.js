"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchNote() {
      try {
        const res = await fetch(`/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch note");

        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error(err);
        setError("Could not load note.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchNote();
  }, [id, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update note");
        return;
      }

      router.push("/notes");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white border-opacity-20 text-black">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Edit Note</h1>
        {error && <p className="bg-red-500 bg-opacity-70 p-3 rounded-md mb-4 text-center text-white text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 border border-black border-opacity-30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Note Content"
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 border border-black border-opacity-30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 3.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L6 12.586l9.293-9.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Save Changes
          </button>
        </form>
        <button
          onClick={() => router.push(`/notes/${id}`)}
          className="mt-4 w-full bg-gray-300 text-gray-800 p-3 rounded-full text-lg font-semibold hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Cancel
        </button>
      </div>
    </div>
  );
}
