import { PageShell } from "./PageShell";

export function Footer() {
        return (
                <footer className="border-t border-slate-800/70 bg-[#050816]/80 py-6 text-xs text-slate-500">
                        <PageShell className="flex items-center justify-between">
                                <span>© Tasteless Media Buyer</span>
                                <span className="text-slate-600">Crafted with neon and coffee.</span>
                        </PageShell>
                </footer>
        );
}
