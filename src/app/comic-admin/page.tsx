"use client";

import { useMemo, useState } from "react";
import { PageShell } from "../components/PageShell";
import { COMICS_DB, Comic } from "@/data/comics";

type EditableComic = Comic & { notes?: string };

export default function ComicAdminPage() {
        const [selectedSlug, setSelectedSlug] = useState<string>(COMICS_DB[0]?.slug ?? "");
        const [comics, setComics] = useState<EditableComic[]>(COMICS_DB);

        const selectedComic = useMemo(() => comics.find((c) => c.slug === selectedSlug), [comics, selectedSlug]);

        const updateSelected = (updates: Partial<EditableComic>) => {
                setComics((prev) => prev.map((comic) => (comic.slug === selectedSlug ? { ...comic, ...updates } : comic)));
        };

        return (
                <PageShell className="space-y-8 py-10">
                        <div className="flex items-center justify-between">
                                <div>
                                        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Admin Shell</p>
                                        <h1 className="text-3xl font-semibold text-slate-50">Comic Manager</h1>
                                        <p className="text-slate-400">Front-end only for now. Wire to /api/comics later.</p>
                                </div>
                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Mock state only</span>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                                <div className="card-surface gradient-ring overflow-hidden">
                                        <div className="border-b border-slate-800/70 bg-slate-900/70 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                                                Comics
                                        </div>
                                        <div className="divide-y divide-slate-800/80">
                                                <div className="grid grid-cols-6 gap-2 px-4 py-3 text-xs font-semibold text-slate-400">
                                                        <span className="col-span-1">Order</span>
                                                        <span className="col-span-2">Title</span>
                                                        <span>Status</span>
                                                        <span>Category</span>
                                                        <span className="text-right">Pages</span>
                                                </div>
                                                {comics.map((comic) => (
                                                        <button
                                                                key={comic.id}
                                                                onClick={() => setSelectedSlug(comic.slug)}
                                                                className={`grid w-full grid-cols-6 gap-2 px-4 py-3 text-left text-sm transition ${
                                                                        comic.slug === selectedSlug
                                                                                ? "bg-slate-800/70 text-white"
                                                                                : "hover:bg-slate-900/70 text-slate-200"
                                                                }`}
                                                        >
                                                                <span className="col-span-1 font-mono text-xs text-slate-400">{comic.order}</span>
                                                                <span className="col-span-2 font-semibold">{comic.title}</span>
                                                                <span className="text-slate-300">{comic.status}</span>
                                                                <span className="text-slate-300">{comic.category}</span>
                                                                <span className="text-right text-slate-400">{comic.pageCount}</span>
                                                        </button>
                                                ))}
                                        </div>
                                </div>

                                <div className="card-surface gradient-ring space-y-4 p-5">
                                        {selectedComic ? (
                                                <>
                                                        <div className="flex items-center justify-between">
                                                                <div>
                                                                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Edit</p>
                                                                        <h2 className="text-xl font-semibold text-slate-50">{selectedComic.title}</h2>
                                                                </div>
                                                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200">
                                                                        {selectedComic.status}
                                                                </span>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                                <label className="text-sm text-slate-400">
                                                                        Status
                                                                        <select
                                                                                value={selectedComic.status}
                                                                                onChange={(event) => updateSelected({ status: event.target.value as Comic["status"] })}
                                                                                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                                                                        >
                                                                                <option>Published</option>
                                                                                <option>Draft</option>
                                                                                <option>Coming Soon</option>
                                                                        </select>
                                                                </label>
                                                                <label className="text-sm text-slate-400">
                                                                        Category
                                                                        <input
                                                                                value={selectedComic.category}
                                                                                onChange={(event) => updateSelected({ category: event.target.value })}
                                                                                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                                                                        />
                                                                </label>
                                                                <label className="text-sm text-slate-400">
                                                                        Tags (comma separated)
                                                                        <input
                                                                                value={selectedComic.tags.join(", ")}
                                                                                onChange={(event) => updateSelected({ tags: event.target.value.split(",").map((t) => t.trim()) })}
                                                                                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                                                                        />
                                                                </label>
                                                                <label className="text-sm text-slate-400">
                                                                        Page Count
                                                                        <input
                                                                                type="number"
                                                                                min={1}
                                                                                value={selectedComic.pageCount}
                                                                                onChange={(event) => updateSelected({ pageCount: Number(event.target.value) })}
                                                                                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                                                                        />
                                                                </label>
                                                                <label className="text-sm text-slate-400 col-span-2">
                                                                        Description
                                                                        <textarea
                                                                                value={selectedComic.description}
                                                                                onChange={(event) => updateSelected({ description: event.target.value })}
                                                                                className="mt-1 w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                                                                                rows={3}
                                                                        />
                                                                </label>
                                                                <label className="text-sm text-slate-400 col-span-2">
                                                                        Notes (local-only)
                                                                        <textarea
                                                                                value={selectedComic.notes ?? ""}
                                                                                onChange={(event) => updateSelected({ notes: event.target.value })}
                                                                                className="mt-1 w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                                                                                rows={2}
                                                                        />
                                                                </label>
                                                        </div>
                                                        <p className="text-xs text-slate-500">
                                                                TODO: Replace mock state with API calls (GET/POST/PUT/DELETE) to /api/comics secured with an admin token.
                                                        </p>
                                                </>
                                        ) : (
                                                <p className="text-slate-300">Select a comic to edit.</p>
                                        )}
                                </div>
                        </div>
                </PageShell>
        );
}
