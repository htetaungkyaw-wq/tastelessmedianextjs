interface TagPillProps {
        label: string;
}

export function TagPill({ label }: TagPillProps) {
        return (
                <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-300 shadow-inner shadow-purple-500/10">
                        {label}
                </span>
        );
}
