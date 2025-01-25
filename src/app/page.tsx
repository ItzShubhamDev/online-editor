"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { CheckSquare, Square } from "lucide-react";
import modes from "@/utils/modes";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
    ssr: false,
});

export default function Home() {
    const [value, setValue] = useState<string>("");
    const [mime, setMime] = useState("text/javascript");
    const [theme, setTheme] = useState("material");
    const [readOnly, setReadOnly] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const code = localStorage.getItem("code");
        if (code) {
            setValue(code);
        }
    }, []);

    const share = async () => {
        if (value.length === 0) {
            setError("Code cannot be empty");
            return;
        }
        const res = await fetch("/api/codes", {
            method: "POST",
            body: JSON.stringify({
                code: value,
                mime,
                readOnly,
            }),
        });
        const r = await res.json();
        if (r.error) {
            setError(r.error);
            return;
        }
        router.push(`/${r.id}`);
    };

    useEffect(() => {
        if (value.length > 0 && value.length < 65535) {
            setError(null);
            localStorage.setItem("code", value);
        }
    }, [value]);

    return (
        <div className="w-full h-screen">
            <div className="bg-white dark:bg-gray-900 p-4">
                <Navbar theme={theme} setTheme={setTheme}>
                    <div className="flex items-center">
                        <select
                            value={mime}
                            onChange={(v) => setMime(v.target.value)}
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
                        <button
                            onClick={() => {
                                setReadOnly(1);
                                share();
                            }}
                            className="mr-2 p-2 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 focus:outline-none rounded-md"
                        >
                            Share ReadOnly
                        </button>
                        <button
                            onClick={() => {
                                setReadOnly(0);
                                share();
                            }}
                            className="flex items-center p-2 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 focus:outline-none rounded-md"
                        >
                            Share
                        </button>
                    </div>
                </Navbar>
                {error && <Alert message={error} />}
                <CodeEditor
                    theme={theme}
                    mime={mime}
                    value={value}
                    onChange={setValue}
                />
            </div>
        </div>
    );
}
