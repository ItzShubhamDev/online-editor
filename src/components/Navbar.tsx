"use client";

import modes from "@/utils/modes";
import themes from "@/utils/themes";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
    ssr: false,
});

const Navbar = ({
    theme,
    setTheme,
    children,
}: {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    children?: React.ReactNode;
}) => {
    return (
        <div className="flex items-center justify-between mb-5">
            {children}
            <div className="flex items-center">
                <ThemeToggle />
                <select
                    value={theme}
                    onChange={(v) => setTheme(v.target.value)}
                    className="ml-4 p-2 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md"
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
            </div>
        </div>
    );
};

export default Navbar;
