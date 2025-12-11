export type Comic = {
        id: string;
        title: string;
        slug: string;
        category: "Horror" | "Cyberpunk" | "Fantasy" | "Noir" | "Sci-Fi" | string;
        status: "Published" | "Draft" | "Coming Soon";
        order: number;
        coverGradient: string;
        tags: string[];
        description: string;
        pageCount: number;
        pagesPrefix: string;
        pageExtension?: "png" | "jpg" | "jpeg" | "webp" | "svg";
};

/**
 * Mock DB for now. Later replace this with a fetch to Cloudflare R2 or your API layer.
 */
export const COMICS_DB: Comic[] = [
        {
                id: "1",
                title: "Neon Drifter",
                slug: "neon-drifter",
                category: "Cyberpunk",
                status: "Published",
                order: 1,
                coverGradient: "from-indigo-500 via-purple-500 to-sky-500",
                tags: ["synthwave", "night city", "heist"],
                description:
                        "A courier with a stolen AI core outruns megacorps through rain-soaked alleys and neon deserts.",
                pageCount: 6,
                pagesPrefix: "/mock-pages/neon-drifter/page-",
                pageExtension: "svg",
        },
        {
                id: "2",
                title: "Grim Harbor",
                slug: "grim-harbor",
                category: "Horror",
                status: "Published",
                order: 2,
                coverGradient: "from-slate-800 via-rose-700 to-amber-500",
                tags: ["eldritch", "investigation", "fog"],
                description: "Investigators uncover a drowned chapel and summon what should have stayed asleep.",
                pageCount: 5,
                pagesPrefix: "/mock-pages/grim-harbor/page-",
                pageExtension: "svg",
        },
        {
                id: "3",
                title: "Arc Forge",
                slug: "arc-forge",
                category: "Sci-Fi",
                status: "Coming Soon",
                order: 3,
                coverGradient: "from-emerald-400 via-cyan-400 to-indigo-600",
                tags: ["mechs", "orbital", "salvage"],
                description: "Salvagers discover an ancient forge that forges weapons from sunglass and gravity storms.",
                pageCount: 4,
                pagesPrefix: "/mock-pages/arc-forge/page-",
                pageExtension: "svg",
        },
        {
                id: "4",
                title: "Mycelium Crown",
                slug: "mycelium-crown",
                category: "Fantasy",
                status: "Draft",
                order: 4,
                coverGradient: "from-purple-700 via-fuchsia-500 to-lime-400",
                tags: ["spores", "royalty", "rebirth"],
                description: "An exiled heir bargains with sentient fungi to reclaim a crystal throne.",
                pageCount: 3,
                pagesPrefix: "/mock-pages/mycelium-crown/page-",
                pageExtension: "svg",
        },
];

export const allCategories = ["All", ...new Set(COMICS_DB.map((comic) => comic.category))];
