"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ShinyText from "@/components/ShinyText";

type Repo = {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    updated_at: string;
    languages_url: string;
};

const githubUsername = "calv4n";

function formatDate(value: string) {
    return new Intl.DateTimeFormat("de-DE", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(value));
}

type RepoWithLanguages = Repo & { languages: string[] };

export function LatestRepositories() {
    const [repos, setRepos] = useState<RepoWithLanguages[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchRepos = async () => {
            try {
                const response = await fetch(
                    `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=3`,
                    {
                        headers: {
                            Accept: "application/vnd.github+json",
                        },
                    }
                );

                if (!response.ok) {
                    return;
                }

                const data = (await response.json()) as Repo[];
                if (cancelled) return;

                const latest = data
                    .sort(
                        (a, b) =>
                            new Date(b.updated_at).getTime() -
                            new Date(a.updated_at).getTime()
                    )
                    .slice(0, 3);

                const latestWithLangs = await Promise.all(
                    latest.map(async (repo) => {
                        try {
                            const langRes = await fetch(repo.languages_url);
                            if (!langRes.ok) {
                                return { ...repo, languages: [] as string[] };
                            }
                            const langObj = (await langRes.json()) as Record<string, number>;
                            const sortedLangs = Object.entries(langObj)
                                .sort((a, b) => b[1] - a[1])
                                .map(([lang]) => lang)
                                .slice(0, 3);
                            return { ...repo, languages: sortedLangs };
                        } catch {
                            return { ...repo, languages: [] as string[] };
                        }
                    })
                );

                setRepos(latestWithLangs);
            } catch (error) {
                console.warn("GitHub fetch failed; returning empty list.", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchRepos();

        return () => {
            cancelled = true;
        };
    }, []);

    const content = useMemo(() => {
        if (loading) {
            return (
                <ShinyText
                    text="Loading repositories..."
                    disabled={false}
                    speed={2}
                    className="col-span-full text-gray-400 text-sm"
                />
            );
        }

        if (repos.length === 0) {
            return (
                <div className="col-span-full text-gray-400 text-sm">
                    Currently no repositories available. Please try again later.
                </div>
            );
        }

        return repos.map((repo) => <RepoCard3D key={repo.id} repo={repo} />);
    }, [loading, repos]);

    return <div className="grid gap-4 md:grid-cols-3">{content}</div>;
}

function RepoCard3D({ repo }: { repo: RepoWithLanguages }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [transform, setTransform] = useState(
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    );

    const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 6;
        const rotateX = (0.5 - y) * 6;
        setTransform(
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`
        );
    };

    const handleLeave = () => {
        setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
    };

    return (
        <a
            ref={ref}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative block rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/30"
            style={{
                transform,
                transformStyle: "preserve-3d",
            }}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-white">{repo.name}</h3>
                    <p className="text-sm text-gray-400">
                        {repo.description || "No description available."}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-start gap-3 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-2 py-1 text-white border border-white/10">
                        &#9733; {repo.stargazers_count}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-white border border-white/10">
                        Updated {formatDate(repo.updated_at)}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {repo.languages?.length > 0 &&
                        repo.languages.map((lang) => (
                            <span
                                key={lang}
                                className="rounded-full border border-white/15 px-2 py-1 text-white"
                            >
                                {lang}
                            </span>
                        ))}
                </div>
            </div>
        </a>
    );
}
