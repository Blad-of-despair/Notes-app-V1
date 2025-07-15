"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notesApi } from "@/lib/api";
import Button from "@/components/Button";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchNotes() {
      try {
        const data = await notesApi.getNotes();
        setNotes(data);
      } catch (err) {
        console.error(err);
        setError("Could not load notes.");
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 border border-white border-opacity-20 text-black">
        <div className="flex flex-row justify-between items-center flex-nowrap">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Your Notes</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/notes/new")}
              className="bg-white text-blue-600 flex items-center justify-center gap-2 w-12 h-12 p-0 rounded-full sm:w-auto sm:h-auto sm:px-6 sm:py-3 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                className="block sm:hidden"
              >
                <path
                  d="M12 8V16M16 12H8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="hidden sm:inline">New Note</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white flex items-center justify-center gap-2 w-12 h-12 p-0 rounded-full sm:w-auto sm:h-auto sm:px-6 sm:py-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                className="block sm:hidden"
              >
                <path
                  d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {error && (
          <p className="bg-red-500 bg-opacity-70 p-3 rounded-md mb-4 text-center text-white text-sm">
            {error}
          </p>
        )}

        {notes.length === 0 ? (
          <p className="text-white text-lg text-center opacity-80">
            No notes yet. Click &quot;New Note&quot; to create your first one!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-minmax-250px gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white bg-opacity-15 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 border border-white border-opacity-20 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {note.title}
                  </h2>
                  <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                    {note.content}
                  </p>
                </div>
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => router.push(`/notes/${note._id}`)}
                    className="text-white bg-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/notes/${note._id}/edit`)}
                    className="text-white bg-green-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this note?')) {
                        try {
                          await notesApi.deleteNote(note._id);
                          setNotes(notes.filter(n => n._id !== note._id));
                        } catch (err) {
                          setError(err.message || 'Failed to delete note.');
                        }
                      }
                    }}
                    className="text-white bg-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
