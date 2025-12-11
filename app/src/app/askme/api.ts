"use client";

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.BASE_URL ??
    "/api";

export async function askQuestion(question: string): Promise<string> {
    const response = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.answer ?? "No answer received.";
}
