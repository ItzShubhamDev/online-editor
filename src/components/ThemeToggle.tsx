"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            className="text-gray-500"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "dark" ? <Sun /> : <Moon />}
        </button>
    );
};

export default ThemeToggle;
