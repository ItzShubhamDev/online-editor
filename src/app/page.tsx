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
    const [mime, setMime] = useState("text/plain");
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
        <div className="bg-white dark:bg-gray-900 p-4 w-full h-screen">
            <Navbar
                theme={theme}
                setTheme={setTheme}
                mime={mime}
                setMime={setMime}
            >
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
            </Navbar>
            {error && <Alert message={error} />}
            <CodeEditor
                theme={theme}
                mime={mime}
                value={value}
                onChange={setValue}
            />
        </div>
    );
}
