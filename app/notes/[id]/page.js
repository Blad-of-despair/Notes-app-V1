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

  const [deleting, setDeleting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-secondary mt-4 font-medium">Loading note...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="glass-card p-8 text-center border border-red-500/20">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-heading text-text-primary mb-2">Note Not Found</h2>
          <p className="text-text-secondary mb-4">{error}</p>
          <button
              onClick={() => router.push('/notes')}
              className="btn-primary"
            >
              Back to Notes
            </button>
        </div>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="min-h-screen bg-[#f6faff] flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto p-8 md:p-12 bg-white rounded-3xl shadow-xl border border-gray-100">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-500 hover:text-blue-700 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {note.title}
          </h1>
          <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Created: {new Date(note.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            {note.createdAt !== note.updatedAt && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Updated: {new Date(note.updatedAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            )}
          </div>
        </header>
        <div className="prose prose-lg max-w-none font-body mb-8">
          <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {note.content}
          </div>
        </div>
        <footer className="pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400">
            This note is saved securely in your workspace
          </p>
        </footer>
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => router.push(`/notes/${id}/edit`)}
            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-sm transition-colors"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-sm transition-colors"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : '🗑️ Delete'}
          </button>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => router.push(`/notes/${id}`)}
            className="text-blue-500 hover:text-blue-700 transition-colors text-sm font-semibold"
          >
            🔄 Refresh
          </button>
          <span className="text-gray-300">•</span>
          <button
            onClick={() => router.push('/notes')}
            className="text-gray-500 hover:text-gray-900 transition-colors text-sm font-semibold"
          >
            📖 All Notes
          </button>
        </div>
      </div>
    </div>
  );
}
