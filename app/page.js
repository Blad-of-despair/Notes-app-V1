"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-black p-4">
      <div className="max-w-4xl text-black w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-12 text-center border border-white border-opacity-20">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Organize Your Thoughts, Effortlessly.
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Capture ideas, manage tasks, and keep your life in sync with our intuitive notes application.
        </p>

        {isLoggedIn ? (
          <button
            onClick={() => router.push("/notes")}
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Go to Your Notes
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="bg-transparent border-2 border-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Sign Up for Free
            </button>
          </div>
        )}
      </div>

   
      <footer className="mt-16 text-black text-sm opacity-70">
        © 2025 Notes App. All rights reserved.
      </footer>
    </div>
  );
}
