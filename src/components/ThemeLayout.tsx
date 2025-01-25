"use client";

import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";

export default function ThemeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider attribute="class">
            <NextTopLoader />
            {children}
        </ThemeProvider>
    );
}
