"use client";

import { useMemo, useState } from "react";
import { ComicCard } from "../components/ComicCard";
import { PageShell } from "../components/PageShell";
import { allCategories, COMICS_DB } from "@/data/comics";

const statusFilters = ["All", "Published"] as const;

type StatusFilter = (typeof statusFilters)[number];

export default function ComicListPage() {
        const [category, setCategory] = useState<string>("All");
        const [status, setStatus] = useState<StatusFilter>("All");
        const [search, setSearch] = useState<string>("");

        const filtered = useMemo(() => {
                return COMICS_DB.filter((comic) => {
                        const matchesCategory = category === "All" || comic.category === category;
                        const matchesStatus = status === "All" || comic.status === "Published";
                        const matchesSearch = comic.title.toLowerCase().includes(search.toLowerCase());
                        return matchesCategory && matchesStatus && matchesSearch;
                }).sort((a, b) => a.order - b.order);
        }, [category, search, status]);

        return (
                <PageShell className="space-y-8 py-10">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Library</p>
                                        <h1 className="text-3xl font-semibold text-slate-50">All Comics</h1>
                                        <p className="text-slate-400">Filter by category, status, or search by title.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        <label className="flex flex-col text-sm text-slate-400">
                                                Category
                                                <select
                                                        value={category}
                                                        onChange={(event) => setCategory(event.target.value)}
                                                        className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                                                >
                                                        {allCategories.map((cat) => (
                                                                <option key={cat} value={cat}>
                                                                        {cat}
                                                                </option>
                                                        ))}
                                                </select>
                                        </label>
                                        <label className="flex flex-col text-sm text-slate-400">
                                                Status
                                                <select
                                                        value={status}
                                                        onChange={(event) => setStatus(event.target.value as StatusFilter)}
                                                        className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                                                >
                                                        {statusFilters.map((state) => (
                                                                <option key={state} value={state}>
                                                                        {state}
                                                                </option>
                                                        ))}
                                                </select>
                                        </label>
                                        <label className="flex flex-col text-sm text-slate-400">
                                                Search
                                                <input
                                                        value={search}
                                                        onChange={(event) => setSearch(event.target.value)}
                                                        placeholder="Title contains..."
                                                        className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                                                />
                                        </label>
                                </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {filtered.map((comic) => (
                                        <ComicCard key={comic.id} comic={comic} />
                                ))}
                                {filtered.length === 0 && (
                                        <div className="card-surface p-6 text-slate-300">
                                                No comics match that filter yet. Try another category.
                                        </div>
                                )}
                        </div>
                </PageShell>
        );
}
