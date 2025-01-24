"use client";

import { useState } from "react";
import modes from "@/utils/modes";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
    ssr: false,
});

export default function Home() {
    const [value, setValue] = useState<string>("");
    const [mime, setMime] = useState("text/javascript");

    return (
        <div className="w-full h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-5">
                    <select
                        value={mime}
                        onChange={(v) => setMime(v.target.value)}
                        className="p-2 border-gray-300 border focus:outline-none focus:ring focus:ring-gray-300 rounded-md"
                    >
                        {modes.map((mode, i) => (
                            <option key={i} value={mode.mime}>
                                {mode.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="h-full overflow-hidden">
                    <CodeEditor theme="material" mime={mime} value={value} onChange={setValue} />
                </div>
            </div>
        </div>
    );
}
