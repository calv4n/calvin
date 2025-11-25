"use client";

import { useEffect, useMemo, useState } from "react";

type Repo = {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    updated_at: string;
};

const githubUsername = "calv4n";

function formatDate(value: string) {
    return new Intl.DateTimeFormat("de-DE", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(value));
}

export function LatestRepositories() {
    const [repos, setRepos] = useState<Repo[]>([]);
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

                setRepos(latest);
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
                <div className="col-span-full text-gray-400 text-sm">
                    Loading repositories...
                </div>
            );
        }

        if (repos.length === 0) {
            return (
                <div className="col-span-full text-gray-400 text-sm">
                    Currently no repositories available. Please try again later.
                </div>
            );
        }

        return repos.map((repo) => (
            <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-white/10 bg-white/5 p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
            >
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold">
                            {repo.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {repo.description || "No description available."}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                    {repo.language && (
                        <span className="rounded-full bg-white/10 px-2 py-1 text-white">
                            {repo.language}
                        </span>
                    )}
                    <span>* {repo.stargazers_count}</span>
                    <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
            </a>
        ));
    }, [loading, repos]);

    return <div className="grid gap-4 md:grid-cols-3">{content}</div>;
}
