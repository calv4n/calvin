import { NextResponse } from "next/server";
import profile from "./profile.json";

type Profile = {
    name?: string;
    preferred_name?: string;
    location?: string;
    role?: string;
    bio?: string;
    values?: string[];
    experience?: {
        timeline?: string;
        role?: string;
        company?: string;
        focus?: string;
    }[];
    skills?: Record<string, string[]>;
    hobbies?: string[];
};

type ChatChunk = {
    choices?: { delta?: { content?: string } }[];
};

const profileData = profile as Profile;

function formatSection(title: string, lines: string[]) {
    const filtered = lines.filter(Boolean);
    if (!filtered.length) return "";
    const bulletLines = filtered.map((line) => `- ${line}`).join("\n");
    return `${title}:\n${bulletLines}`;
}

function buildSystemPrompt(profileInput: Profile): string {
    const name = profileInput.preferred_name || profileInput.name || "Calvin";

    const intro = [
        `You are ${name}. Answer briefly, politely, and in a tone of ${name}.`,
        "Answer in the language of the question.",
        "Use only the information from the profile. If something is missing, honestly say that you do not assist with that.",
    ];

    const experienceLines: string[] =
        profileInput.experience?.map((entry) => {
            const parts = [
                entry.role,
                entry.company ? `@ ${entry.company}` : undefined,
                entry.timeline ? `(${entry.timeline})` : undefined,
            ].filter(Boolean);

            const summary = parts.join(" ");
            return entry.focus ? `${summary} - ${entry.focus}` : summary;
        }) ?? [];

    const skillsLines: string[] = [];
    Object.entries(profileInput.skills ?? {}).forEach(([label, items]) => {
        if (!items?.length) return;
        const readableLabel = label.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
        skillsLines.push(`${readableLabel}: ${items.join(", ")}`);
    });

    const sections = [
        formatSection("Profile", [
            `Name: ${profileInput.name ?? name}`,
            `Role: ${profileInput.role ?? ""}`,
            `Location: ${profileInput.location ?? ""}`,
            profileInput.bio ?? "",
        ]),
        formatSection("Roles and stations", experienceLines),
        formatSection("Skills", skillsLines),
        formatSection("Values", profileInput.values ?? []),
        formatSection("Hobbies and interests", profileInput.hobbies ?? []),
    ].filter(Boolean);

    return [...intro, ...sections].join("\n\n");
}

const SYSTEM_PROMPT = buildSystemPrompt(profileData);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const message = typeof (body as { message?: string })?.message === "string" ? (body as { message?: string }).message.trim() : "";
    if (!message) {
        return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "OPENROUTER_API_KEY is not configured" }, { status: 500 });
    }

    const model = process.env.OPENROUTER_MODEL_NAME;
    if (!model) {
        return NextResponse.json({ error: "OPENROUTER_MODEL_NAME is not configured" }, { status: 500 });
    }

    const baseUrl = process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";
    const upstreamUrl = `${baseUrl.replace(/\/$/, "")}/chat/completions`;

    const upstream = await fetch(upstreamUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "",
            "X-Title": process.env.OPENROUTER_TITLE ?? "Portfolio AskMe",
        },
        body: JSON.stringify({
            model,
            stream: true,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message },
            ],
        }),
    });

    if (!upstream.ok || !upstream.body) {
        const detail = await safeReadError(upstream);
        return NextResponse.json({ error: detail ?? "OpenRouter request failed" }, { status: 500 });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const stream = new ReadableStream({
        async start(controller) {
            const reader = upstream.body!.getReader();
            let buffer = "";

            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, { stream: true });

                    let boundary = buffer.indexOf("\n\n");
                    while (boundary !== -1) {
                        const payload = buffer.slice(0, boundary).trim();
                        buffer = buffer.slice(boundary + 2);

                        if (payload.startsWith("data:")) {
                            const data = payload.replace(/^data:\s*/, "");
                            if (data === "[DONE]") {
                                controller.close();
                                return;
                            }

                            try {
                                const parsed = JSON.parse(data) as ChatChunk;
                                const content = parsed?.choices?.[0]?.delta?.content;
                                if (content) {
                                    controller.enqueue(encoder.encode(content));
                                }
                            } catch (error) {
                                console.error("Failed to parse OpenRouter chunk:", error);
                            }
                        }

                        boundary = buffer.indexOf("\n\n");
                    }
                }

                controller.close();
            } catch (error) {
                console.error("OpenRouter stream error:", error);
                controller.error(error);
            } finally {
                reader.releaseLock();
            }
        },
    });

    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}

async function safeReadError(response: Response): Promise<string | null> {
    try {
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            const data = (await response.json()) as { error?: string; message?: string; detail?: string };
            return data.error || data.message || data.detail || null;
        }
        return await response.text();
    } catch {
        return null;
    }
}
