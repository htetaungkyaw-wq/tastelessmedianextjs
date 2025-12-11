import Link from "next/link";
import { Comic } from "@/data/comics";
import { TagPill } from "./TagPill";

interface ComicCardProps {
        comic: Comic;
}

export function ComicCard({ comic }: ComicCardProps) {
        return (
                <div className="card-surface glow-hover flex flex-col overflow-hidden">
                        <div className={`relative h-44 w-full bg-gradient-to-br ${comic.coverGradient}`}>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-4">
                                <div className="flex items-start justify-between gap-2">
                                        <div>
                                                <p className="text-xs uppercase tracking-wide text-slate-400">{comic.category}</p>
                                                <h3 className="text-lg font-semibold text-slate-100">{comic.title}</h3>
                                        </div>
                                        <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        comic.status === "Published"
                                                                ? "bg-emerald-900/60 text-emerald-200"
                                                                : comic.status === "Draft"
                                                                        ? "bg-slate-800 text-slate-200"
                                                                        : "bg-purple-900/60 text-purple-200"
                                                }`}
                                        >
                                                {comic.status}
                                        </span>
                                </div>
                                <p className="text-sm text-slate-300 line-clamp-3">{comic.description}</p>
                                <div className="flex flex-wrap gap-2">
                                        {comic.tags.map((tag) => (
                                                <TagPill key={tag} label={tag} />
                                        ))}
                                </div>
                                <div className="mt-auto flex items-center justify-between pt-2 text-sm text-slate-400">
                                        <span>{comic.pageCount} pages</span>
                                        <Link
                                                href={`/comic/${comic.slug}`}
                                                className="rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-500/20 transition hover:opacity-90"
                                        >
                                                Read
                                        </Link>
                                </div>
                        </div>
                </div>
        );
}
