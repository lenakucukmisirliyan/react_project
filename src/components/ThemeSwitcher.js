import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="theme-switcher" onClick={toggleTheme}>
      <div className={`switch ${theme === "dark" ? "switch-dark" : "switch-light"}`}>
        <div className="thumb" />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
