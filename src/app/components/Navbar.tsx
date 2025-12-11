"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
        { href: "/", label: "Home" },
        { href: "/comic", label: "Comics" },
        { href: "/comic-admin", label: "Admin" },
];

export function Navbar() {
        const pathname = usePathname();

        return (
                <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-[#050816]/80 backdrop-blur">
                        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
                                <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Tasteless Media</p>
                                        <h1 className="text-xl font-semibold text-slate-100">Comic Hub</h1>
                                </div>
                                <nav className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                        {links.map((link) => {
                                                const isActive = pathname === link.href;
                                                return (
                                                        <Link
                                                                key={link.href}
                                                                href={link.href}
                                                                className={`rounded-full px-3 py-2 transition-colors ${
                                                                        isActive
                                                                                ? "bg-slate-800 text-white"
                                                                                : "hover:bg-slate-800/70 text-slate-300"
                                                                }`}
                                                        >
                                                                {link.label}
                                                        </Link>
                                                );
                                        })}
                                </nav>
                        </div>
                </header>
        );
}
