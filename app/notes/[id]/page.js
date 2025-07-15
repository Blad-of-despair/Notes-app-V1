"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ViewNotePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [note, setNote] = useState(null);
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
        setNote(data);
      } catch (err) {
        console.error(err);
        setError("Could not load note.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchNote();
  }, [id, router]);

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

      router.push("/notes");
    } catch (err) {
      console.error(err);
      setError("Failed to delete note.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white border-opacity-20 text-white">
        <h1 className="text-4xl font-extrabold mb-4 break-words text-gray-800">{note.title}</h1>
        <p className="text-gray-700 mb-8 whitespace-pre-wrap leading-relaxed text-lg">{note.content}</p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => router.push(`/notes/${id}/edit`)}
            className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" />
            </svg>
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm6 2a1 1 0 100 2H8a1 1 0 100-2h5z" clipRule="evenodd" />
            </svg>
            Delete
          </button>
          <button
            onClick={() => router.push("/notes")}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Notes
          </button>
        </div>
      </div>
    </div>
  );
}
