
import React, { createContext, useState, useEffect } from "react";

// Create a Context
export const DarkMode = createContext();

export const DarkModeProvider = ({ children }) => {
  // Load dark mode preference from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Toggle function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Apply dark mode class to body and save preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkMode.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkMode.Provider>
  );
};
