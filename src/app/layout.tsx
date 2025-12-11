import type { Metadata } from "next";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
        title: "Tasteless Media Comic Hub",
        description: "A neon-styled reader for the Tasteless Media Buyer universe.",
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <html lang="en">
                        <body className="min-h-screen bg-[#050816] text-slate-100 antialiased">
                                <div className="flex min-h-screen flex-col">
                                        <Navbar />
                                        <main className="flex-1 pb-12">{children}</main>
                                        <Footer />
                                </div>
                        </body>
                </html>
        );
}
