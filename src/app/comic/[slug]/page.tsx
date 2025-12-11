"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ReaderShell } from "@/app/components/ReaderShell";
import { TagPill } from "@/app/components/TagPill";
import { PageShell } from "@/app/components/PageShell";
import { COMICS_DB } from "@/data/comics";

export default function ComicReaderPage() {
        const params = useParams<{ slug: string }>();
        const router = useRouter();
        const comic = useMemo(() => COMICS_DB.find((item) => item.slug === params.slug), [params.slug]);

        const [page, setPage] = useState<number>(1);

        useEffect(() => {
                if (!comic) return;
                setPage(1);
        }, [comic]);

        useEffect(() => {
                const handleKey = (event: KeyboardEvent) => {
                        if (event.key === "ArrowRight") {
                                setPage((prev) => Math.min(prev + 1, comic?.pageCount ?? prev));
                        }
                        if (event.key === "ArrowLeft") {
                                setPage((prev) => Math.max(prev - 1, 1));
                        }
                        if (event.key === "Escape" || event.key === "Home") {
                                router.push("/comic");
                        }
                };

                window.addEventListener("keydown", handleKey);
                return () => window.removeEventListener("keydown", handleKey);
        }, [comic?.pageCount, router]);

        if (!comic) {
                return (
                        <PageShell className="py-16 text-center text-slate-200">
                                <div className="card-surface mx-auto max-w-xl p-8">
                                        <h2 className="text-2xl font-semibold text-slate-50">Comic not found</h2>
                                        <p className="mt-2 text-slate-400">Check the URL or pick another title from the library.</p>
                                        <Link
                                                href="/comic"
                                                className="mt-4 inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-2 text-sm font-semibold text-white"
                                        >
                                                Back to Comics
                                        </Link>
                                </div>
                        </PageShell>
                );
        }

        const currentSrc = `${comic.pagesPrefix}${page}.${comic.pageExtension ?? "jpg"}`;
        const disablePrev = page <= 1;
        const disableNext = page >= comic.pageCount;

        return (
                <ReaderShell
                        header={
                                <div className="border-b border-slate-800/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-300 sm:px-8 lg:px-10">
                                        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                        <Link
                                                                href="/comic"
                                                                className="rounded-full border border-slate-700/80 px-3 py-1 font-semibold text-slate-200 transition hover:border-indigo-500 hover:text-white"
                                                        >
                                                                ← Back to list
                                                        </Link>
                                                        <div>
                                                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                                                        {comic.category}
                                                                </p>
                                                                <h2 className="text-lg font-semibold text-slate-50">{comic.title}</h2>
                                                        </div>
                                                </div>
                                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200">
                                                        Page {page} / {comic.pageCount}
                                                </span>
                                        </div>
                                </div>
                        }
                        footer={
                                <div className="border-t border-slate-800/70 bg-slate-900/70 px-4 py-4 text-sm text-slate-300 sm:px-8 lg:px-10">
                                        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                                        <label className="flex items-center gap-2">
                                                                Page
                                                                <input
                                                                        type="range"
                                                                        min={1}
                                                                        max={comic.pageCount}
                                                                        value={page}
                                                                        onChange={(e) => setPage(Number(e.target.value))}
                                                                        className="h-2 w-40 accent-indigo-500"
                                                                />
                                                        </label>
                                                        <select
                                                                value={page}
                                                                onChange={(event) => setPage(Number(event.target.value))}
                                                                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 text-slate-100"
                                                        >
                                                                {Array.from({ length: comic.pageCount }).map((_, index) => (
                                                                        <option key={index} value={index + 1}>
                                                                                Page {index + 1}
                                                                        </option>
                                                                ))}
                                                        </select>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                        <button
                                                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                                                        disablePrev
                                                                                ? "cursor-not-allowed border-slate-800 text-slate-600"
                                                                                : "border-slate-700 text-slate-100 hover:border-indigo-500"
                                                                }`}
                                                                disabled={disablePrev}
                                                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                                        >
                                                                Previous
                                                        </button>
                                                        <button
                                                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                                                        disableNext
                                                                                ? "cursor-not-allowed border-slate-800 text-slate-600"
                                                                                : "border-slate-700 text-slate-100 hover:border-indigo-500"
                                                                }`}
                                                                disabled={disableNext}
                                                                onClick={() => setPage((prev) => Math.min(prev + 1, comic.pageCount))}
                                                        >
                                                                Next
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        }
                >
                        <div className="flex w-full max-w-5xl flex-col gap-4">
                                <div className="relative mx-auto flex h-[65vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-950/80">
                                        <img
                                                src={currentSrc}
                                                alt={`${comic.title} page ${page}`}
                                                className="max-h-full max-w-full object-contain"
                                        />
                                </div>
                                <div className="card-surface gradient-ring flex flex-col gap-3 p-5 text-sm text-slate-300">
                                        <div className="flex flex-wrap gap-2">
                                                {comic.tags.map((tag) => (
                                                        <TagPill key={tag} label={tag} />
                                                ))}
                                        </div>
                                        <p className="text-slate-300">{comic.description}</p>
                                        <p className="text-xs text-slate-500">
                                                Replace mock images with Cloudflare R2 URLs later. Pages are generated from prefix + page number + extension.
                                        </p>
                                </div>
                        </div>
                </ReaderShell>
        );
}
