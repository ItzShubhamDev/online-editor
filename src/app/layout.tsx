import type { Metadata } from "next";
import "./globals.css";
import ThemeLayout from "@/components/ThemeLayout";

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
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeLayout>{children}</ThemeLayout>
            </body>
        </html>
    );
}
