"use client";

import React from "react";

function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  const { className = "", children, ...restAtrributes } = props;
  return (
    <button
      className={`px-3 h-8 bg-white text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${className}`}
      {...restAtrributes}
    >
      {children}
    </button>
  );
}

export default Button;
