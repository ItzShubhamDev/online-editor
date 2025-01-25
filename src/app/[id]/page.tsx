"use client";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import { use, useEffect, useState } from "react";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
    ssr: false,
});

export default function Page({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const resolvedParams = use<{
        id: string;
    }>(params);
    const [data, setData] = useState<{
        code: string;
        mime: string;
        readOnly: 0 | 1;
    }>({
        code: "",
        mime: "text/plain",
        readOnly: 0,
    });
    const [theme, setTheme] = useState("material");
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [mime, setMime] = useState("text/plain");
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/codes/${resolvedParams.id}`);
            if (!res.ok) {
                setError(res.statusText);
                return setLoading(false);
            }
            const data = await res.json();
            setData(data);
            setMime(data.mime);
            setLoading(false);
        };
        fetchData();
    }, []);

    const clone = async () => {
        const res = await fetch(`/api/codes`, {
            method: "POST",
            body: JSON.stringify({
                code: data.code,
                mime: data.mime,
                readOnly: 0,
            }),
        });
        const r = await res.json();
        if (r.error) {
            setError(r.error);
            return;
        }
        router.push(`/${r.id}`);
    };

    const save = async () => {
        if (data.code.length === 0) {
            setError("Code cannot be empty");
            return;
        }
        const res = await fetch(`/api/codes/${resolvedParams.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                code: data.code,
                mime: data.mime,
            }),
        });
        const r = await res.json();
        if (r.error) {
            setError(r.error);
            return;
        }
    };

    return (
        <div className="p-4">
            <Navbar
                theme={theme}
                setTheme={setTheme}
                mime={mime}
                setMime={data.readOnly === 1 ? null : setMime}
            >
                <div className="flex items-center">
                    <button
                        onClick={clone}
                        className="p-2 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 focus:outline-none rounded-md"
                    >
                        Clone
                    </button>
                    <button
                        onClick={() => {
                            router.push("/");
                        }}
                        className="ml-2 p-2 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 focus:outline-none rounded-md"
                    >
                        New
                    </button>
                    {data.readOnly === 0 && (
                        <button
                            onClick={save}
                            className="ml-2 p-2 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 focus:outline-none rounded-md"
                        >
                            Save
                        </button>
                    )}
                </div>
            </Navbar>
            {data.readOnly === 1 && (
                <Alert message="This code is Read Only, make a clone to save changes" />
            )}
            {loading && <Loading />}
            {error && <Alert message={error} />}
            {data.code && (
                <CodeEditor
                    value={data.code}
                    theme={theme}
                    mime={data.mime}
                    onChange={(v) => setData({ ...data, code: v })}
                    options={{
                        readOnly: data.readOnly === 1,
                    }}
                />
            )}
        </div>
    );
}
