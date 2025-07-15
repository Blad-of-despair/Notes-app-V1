// components/Button.js
import React from 'react';

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-6 py-3 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}