import Link from "next/link";
import { ComicCard } from "./components/ComicCard";
import { PageShell } from "./components/PageShell";
import { COMICS_DB } from "@/data/comics";

const featured = COMICS_DB.slice(0, 3);

export default function Home() {
        return (
                <div className="space-y-16">
                        <section className="bg-gradient-to-br from-indigo-600/20 via-purple-700/10 to-cyan-500/10 py-12">
                                <PageShell className="grid gap-10 lg:grid-cols-2 lg:items-center">
                                        <div className="space-y-6">
                                                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-200">
                                                        Tasteless Media Comics
                                                </div>
                                                <div className="space-y-4">
                                                        <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
                                                                A neon hub for the Tasteless Media Buyer universe
                                                        </h1>
                                                        <p className="text-lg text-slate-300">
                                                                Read serialized stories, cyberpunk heists, and eldritch mysteries. Built for a focused, cinematic
                                                                reading experience.
                                                        </p>
                                                </div>
                                                <div className="flex flex-wrap gap-3">
                                                        <Link
                                                                href="/comic"
                                                                className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:scale-[1.01]"
                                                        >
                                                                Enter Comics
                                                        </Link>
                                                        <Link
                                                                href="#featured"
                                                                className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-500/70 hover:text-white"
                                                        >
                                                                Featured Series
                                                        </Link>
                                                </div>
                                        </div>
                                        <div className="relative">
                                                <div className="gradient-ring rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-2xl shadow-purple-500/20">
                                                        <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-sky-500" />
                                                        <div className="mt-4 text-sm text-slate-400">Mock cover art. Replace with Cloudflare R2 assets later.</div>
                                                </div>
                                                <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/20 blur-3xl" />
                                                <div className="absolute -bottom-10 right-0 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl" />
                                        </div>
                                </PageShell>
                        </section>

                        <section id="featured">
                                <PageShell className="space-y-6">
                                        <div className="flex items-center justify-between">
                                                <div>
                                                        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Featured Series</p>
                                                        <h2 className="text-2xl font-semibold text-slate-50">Spotlights from the universe</h2>
                                                </div>
                                                <Link
                                                        href="/comic"
                                                        className="text-sm font-semibold text-indigo-300 transition hover:text-white"
                                                >
                                                        View all
                                                </Link>
                                        </div>
                                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                                {featured.map((comic) => (
                                                        <ComicCard key={comic.id} comic={comic} />
                                                ))}
                                        </div>
                                </PageShell>
                        </section>

                        <section>
                                <PageShell>
                                        <div className="card-surface gradient-ring p-8">
                                                <h3 className="text-xl font-semibold text-slate-50">What This Is</h3>
                                                <p className="mt-3 max-w-3xl text-slate-300">
                                                        This hub is a focused reader for all things Tasteless Media Buyer. Enjoy digital comics with keyboard navigation,
                                                        neon vibes, and later — direct Cloudflare R2 delivery. Everything here runs off a simple mock manifest for now,
                                                        ready to be swapped with your API.
                                                </p>
                                        </div>
                                </PageShell>
                        </section>
                </div>
        );
}
