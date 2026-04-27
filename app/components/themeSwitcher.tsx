"use client";

import { useEffect, useState } from "react";
import Switch from "./switch";

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme based on stored preference or system setting
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : prefersDark;
    setIsDark(initial);
    if (initial) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggle = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Switch onToggle={handleToggle} />
    </div>
  );
};

export default ThemeSwitcher;
