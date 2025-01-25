"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "dark" ? (
                <Sun className="text-white" />
            ) : (
                <Moon className="text-gray-800" />
            )}
        </button>
    );
};

export default ThemeToggle;
