import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Online Editor",
    description: "An online editor for sharing code snippets.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
