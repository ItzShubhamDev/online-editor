"use client";

import modes from "@/utils/modes";
import themes from "@/utils/themes";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
    ssr: false,
});

const Navbar = ({
    theme,
    setTheme,
    mime,
    setMime,
    children,
}: {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    mime: string;
    setMime: React.Dispatch<React.SetStateAction<string>> | null;
    children?: React.ReactNode;
}) => {
    useEffect(() => {
        const theme = localStorage.getItem("codeMirrorTheme");
        if (theme) {
            setTheme(theme);
        }
        const mime = localStorage.getItem("codeMirrorMime");
        if (mime && setMime) {
            setMime(mime);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("codeMirrorTheme", theme);
    }, [theme]);

    useEffect(() => {
        if (setMime) {
            localStorage.setItem("codeMirrorMime", mime);
        }
    }, [mime]);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mb-5">
            <div className="flex items-center">
                <select
                    value={mime}
                    disabled={!setMime}
                    onChange={(v) => setMime && setMime(v.target.value)}
                    className="mr-2 p-2 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md"
                >
                    {modes.map((mode, i) => (
                        <option
                            key={i}
                            value={mode.mime}
                            className="dark:bg-gray-800"
                        >
                            {mode.name}
                        </option>
                    ))}
                </select>
                {children}
            </div>
            <div className="flex items-center mt-2 sm:mt-0 max-sm:w-full">
                <select
                    value={theme}
                    onChange={(v) => setTheme(v.target.value)}
                    className="max-sm:w-full mr-2 p-2 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md"
                >
                    {themes.map((theme, i) => (
                        <option
                            key={i}
                            value={theme.theme}
                            className="dark:bg-gray-800"
                        >
                            {theme.name}
                        </option>
                    ))}
                </select>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;
