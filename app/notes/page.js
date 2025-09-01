"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notesApi } from "../../lib/api";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
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
        setFilteredNotes(data);
      } catch (err) {
        console.error(err);
        setError("Could not load notes.");
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [router]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [searchQuery, notes]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf3ff] via-[#f7faff] to-[#eaf3ff] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-8 mb-10 shadow-xl border border-[#e0e7ff]/60 backdrop-blur-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold bg-gradient-to-r from-[#2b59ff] to-[#b17cff] bg-clip-text text-transparent">
                Your Notes
              </h1>
              <p className="text-lg text-[#5c6b7c] mt-2">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} • {filteredNotes.length} shown
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/notes/new")}
                className="btn-primary flex items-center gap-2 px-5 py-2 text-base rounded-lg shadow-md bg-gradient-to-r from-[#2b59ff] to-[#b17cff] text-white hover:scale-105 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" x2="12" y1="5" y2="19"></line>
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
                <span className="hidden sm:inline">New Note</span>
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2 px-5 py-2 text-base rounded-lg shadow-md bg-white text-[#2b59ff] border border-[#e0e7ff] hover:bg-[#f7faff] hover:scale-105 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" x2="9" y1="12" y2="12"></line>
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Search and View Mode */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5c6b7c]"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 py-3 text-base rounded-lg border border-[#e0e7ff] bg-white text-[#2b59ff] focus:ring-2 focus:ring-[#b17cff]"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`btn-secondary p-2 rounded-lg border border-[#e0e7ff] ${viewMode === "grid" ? "bg-gradient-to-r from-[#2b59ff] to-[#b17cff] text-white" : "bg-white text-[#2b59ff]"}`}
                title="Grid view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`btn-secondary p-2 rounded-lg border border-[#e0e7ff] ${viewMode === "list" ? "bg-gradient-to-r from-[#2b59ff] to-[#b17cff] text-white" : "bg-white text-[#2b59ff]"}`}
                title="List view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" x2="21" y1="6" y2="6"></line>
                  <line x1="8" x2="21" y1="12" y2="12"></line>
                  <line x1="8" x2="21" y1="18" y2="18"></line>
                  <line x1="3" x2="3.01" y1="6" y2="6"></line>
                  <line x1="3" x2="3.01" y1="12" y2="12"></line>
                  <line x1="3" x2="3.01" y1="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="glass-card border border-error/20 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <svg
                className="text-error"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <p className="text-error">{error}</p>
            </div>
          </div>
        )}

        {/* Notes Grid/List */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-20">
            <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
              <svg
                className="mx-auto text-text-secondary mb-4"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {searchQuery ? "No notes found" : "No notes yet"}
              </h3>
              <p className="text-text-secondary">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Create your first note to get started!"}
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }`}
          >
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className={`relative bg-white/80 rounded-2xl shadow-xl p-8 mb-4 border border-[#e0e7ff]/60 backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${viewMode === "list" ? "flex items-center justify-between" : ""}`}
                style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)", background: "linear-gradient(135deg, #f7faff 60%, #eaf3ff 100%)" }}
              onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/notes/${note._id}`);
                      }}
              >
                {/* Top Row: Icon + Window Dots */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#2b59ff] rounded-xl p-3 flex items-center justify-center">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 8h8M8 12h8M8 16h4"/></svg>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#6ee7b7] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#60a5fa] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#c084fc] inline-block"></span>
                  </div>
                </div>
                {/* Title & Content */}
                <h3 className="text-2xl font-bold text-[#22223b] mb-2 line-clamp-1">
                  {note.title || "Untitled Note"}
                </h3>
                <div className="h-4 bg-[#e0e7ff] rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-[#e0e7ff] rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-[#e0e7ff] rounded mb-6 w-1/2"></div>
                {/* Footer: Updated time & Actions */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#5c6b7c] text-base">Updated {note.updatedAt ? new Date(note.updatedAt).toLocaleString() : new Date(note.createdAt).toLocaleString()}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/notes/${note._id}`);
                      }}
                      className="p-2 rounded hover:bg-[#e0e7ff] transition-colors"
                      title="View note"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/notes/${note._id}/edit`);
                      }}
                      className="p-2 rounded hover:bg-[#e0e7ff] transition-colors"
                      title="Edit note"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        const confirmed = window.confirm("Are you sure you want to delete this note? This action cannot be undone.");
                        if (!confirmed) return;
                        try {
                          await notesApi.deleteNote(note._id);
                          setNotes(notes.filter((n) => n._id !== note._id));
                        } catch (err) {
                          setError(err.message || "Failed to delete note.");
                        }
                      }}
                      className="p-2 rounded hover:bg-[#ffe4e6] transition-colors"
                      title="Delete note"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => router.push("/notes/new")}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-accent text-black rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        title="Create new note"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" x2="12" y1="5" y2="19"></line>
          <line x1="5" x2="19" y1="12" y2="12"></line>
        </svg>
        <span className="absolute -top-12 right-0 bg-slate-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          New Note
        </span>
      </button>
    </div>
  );
}
