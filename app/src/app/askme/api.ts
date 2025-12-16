"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

export async function askQuestion(question: string, onChunk?: (chunk: string) => void): Promise<string> {
    const response = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
    });

    if (!response.ok) {
        const detail = await readError(response);
        throw new Error(detail ?? `Request failed: ${response.status}`);
    }

    if (!response.body) {
        throw new Error("No response body received from the server.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullAnswer = "";

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        fullAnswer += chunk;
        onChunk?.(chunk);
    }

    return fullAnswer.trim();
}

async function readError(response: Response): Promise<string | null> {
    try {
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            const body = (await response.json()) as { error?: string; message?: string; detail?: string };
            return body.error || body.message || body.detail || null;
        }
        return await response.text();
    } catch {
        return null;
    }
}
