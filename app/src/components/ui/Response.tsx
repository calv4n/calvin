"use client";

import { cn } from "@/lib/utils";
import hardenReactMarkdown from "harden-react-markdown";
import type { ComponentProps, HTMLAttributes } from "react";
import { isValidElement, memo, useState } from "react";
import ReactMarkdown, { type Components, type Options } from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

/**
 * Parses markdown text and removes incomplete tokens to prevent partial rendering
 * of links, images, bold, and italic formatting during streaming.
 */
function parseIncompleteMarkdown(text: string): string {
    if (!text || typeof text !== "string") {
        return text;
    }

    let result = text;

    const linkImagePattern = /(!?\[)([^\]]*?)$/;
    const linkMatch = result.match(linkImagePattern);
    if (linkMatch) {
        const startIndex = result.lastIndexOf(linkMatch[1]);
        result = result.substring(0, startIndex);
    }

    const boldPattern = /(\*\*)([^*]*?)$/;
    const boldMatch = result.match(boldPattern);
    if (boldMatch) {
        const asteriskPairs = (result.match(/\*\*/g) || []).length;
        if (asteriskPairs % 2 === 1) {
            result = `${result}**`;
        }
    }

    const italicPattern = /(__)([^_]*?)$/;
    const italicMatch = result.match(italicPattern);
    if (italicMatch) {
        const underscorePairs = (result.match(/__/g) || []).length;
        if (underscorePairs % 2 === 1) {
            result = `${result}__`;
        }
    }

    const singleAsteriskPattern = /(\*)([^*]*?)$/;
    const singleAsteriskMatch = result.match(singleAsteriskPattern);
    if (singleAsteriskMatch) {
        const singleAsterisks = result.split("").reduce((acc, char, index) => {
            if (char === "*") {
                const prevChar = result[index - 1];
                const nextChar = result[index + 1];
                if (prevChar !== "*" && nextChar !== "*") {
                    return acc + 1;
                }
            }
            return acc;
        }, 0);

        if (singleAsterisks % 2 === 1) {
            result = `${result}*`;
        }
    }

    const singleUnderscorePattern = /(_)([^_]*?)$/;
    const singleUnderscoreMatch = result.match(singleUnderscorePattern);
    if (singleUnderscoreMatch) {
        const singleUnderscores = result.split("").reduce((acc, char, index) => {
            if (char === "_") {
                const prevChar = result[index - 1];
                const nextChar = result[index + 1];
                if (prevChar !== "_" && nextChar !== "_") {
                    return acc + 1;
                }
            }
            return acc;
        }, 0);

        if (singleUnderscores % 2 === 1) {
            result = `${result}_`;
        }
    }

    const inlineCodePattern = /(`)([^`]*?)$/;
    const inlineCodeMatch = result.match(inlineCodePattern);
    if (inlineCodeMatch) {
        const hasCodeBlockStart = result.includes("```");
        const codeBlockPattern = /```[\s\S]*?```/g;
        const completeCodeBlocks = (result.match(codeBlockPattern) || []).length;
        const allTripleBackticks = (result.match(/```/g) || []).length;
        void completeCodeBlocks;

        const insideIncompleteCodeBlock = allTripleBackticks % 2 === 1;

        if (!insideIncompleteCodeBlock || hasCodeBlockStart) {
            let singleBacktickCount = 0;
            for (let i = 0; i < result.length; i++) {
                if (result[i] === "`") {
                    const isTripleStart = result.substring(i, i + 3) === "```";
                    const isTripleMiddle = i > 0 && result.substring(i - 1, i + 2) === "```";
                    const isTripleEnd = i > 1 && result.substring(i - 2, i + 1) === "```";

                    if (!(isTripleStart || isTripleMiddle || isTripleEnd)) {
                        singleBacktickCount++;
                    }
                }
            }

            if (singleBacktickCount % 2 === 1) {
                result = `${result}\``;
            }
        }
    }

    const strikethroughPattern = /(~~)([^~]*?)$/;
    const strikethroughMatch = result.match(strikethroughPattern);
    if (strikethroughMatch) {
        const tildePairs = (result.match(/~~/g) || []).length;
        if (tildePairs % 2 === 1) {
            result = `${result}~~`;
        }
    }

    return result;
}

const HardenedMarkdown = hardenReactMarkdown(ReactMarkdown);

type HardenedProps = ComponentProps<ReturnType<typeof hardenReactMarkdown>>;

export type ResponseProps = HTMLAttributes<HTMLDivElement> & {
    children: Options["children"];
    options?: Options;
    allowedImagePrefixes?: HardenedProps["allowedImagePrefixes"];
    allowedLinkPrefixes?: HardenedProps["allowedLinkPrefixes"];
    defaultOrigin?: HardenedProps["defaultOrigin"];
    parseIncompleteMarkdown?: boolean;
};

function extractCode(children: unknown): string {
    if (Array.isArray(children)) {
        return children.map((child) => (typeof child === "string" ? child : "")).join("");
    }
    if (typeof children === "string") return children;
    if (isValidElement(children)) {
        const childContent = (children.props as { children?: unknown }).children;
        if (typeof childContent === "string") {
            return childContent;
        }
    }
    return "";
}

const components: Components = {
    p: ({ node, children, className, ...props }) => {
        void node;
        return (
            <p className={cn("mb-3 leading-relaxed last:mb-0", className)} {...props}>
                {children}
            </p>
        );
    },
    ol: ({ node, children, className, ...props }) => {
        void node;
        return (
            <ol className={cn("ml-4 list-outside list-decimal space-y-1", className)} {...props}>
                {children}
            </ol>
        );
    },
    li: ({ node, children, className, ...props }) => {
        void node;
        return (
            <li className={cn("py-1 leading-relaxed", className)} {...props}>
                {children}
            </li>
        );
    },
    ul: ({ node, children, className, ...props }) => {
        void node;
        return (
            <ul className={cn("ml-4 list-outside list-disc space-y-1", className)} {...props}>
                {children}
            </ul>
        );
    },
    hr: ({ node, className, ...props }) => {
        void node;
        return <hr className={cn("my-6 border-gray-200", className)} {...props} />;
    },
    strong: ({ node, children, className, ...props }) => {
        void node;
        return (
            <span className={cn("font-semibold", className)} {...props}>
                {children}
            </span>
        );
    },
    a: ({ node, children, className, ...props }) => {
        void node;
        return (
            <a
                className={cn("font-medium text-blue-600 underline underline-offset-2", className)}
                rel="noreferrer"
                target="_blank"
                {...props}
            >
                {children}
            </a>
        );
    },
    h1: ({ node, children, className, ...props }) => {
        void node;
        return (
            <h1 className={cn("mt-6 mb-2 text-3xl font-semibold leading-tight", className)} {...props}>
                {children}
            </h1>
        );
    },
    h2: ({ node, children, className, ...props }) => {
        void node;
        return (
            <h2 className={cn("mt-6 mb-2 text-2xl font-semibold leading-tight", className)} {...props}>
                {children}
            </h2>
        );
    },
    h3: ({ node, children, className, ...props }) => {
        void node;
        return (
            <h3 className={cn("mt-5 mb-2 text-xl font-semibold leading-tight", className)} {...props}>
                {children}
            </h3>
        );
    },
    h4: ({ node, children, className, ...props }) => {
        void node;
        return (
            <h4 className={cn("mt-4 mb-2 text-lg font-semibold leading-tight", className)} {...props}>
                {children}
            </h4>
        );
    },
    h5: ({ node, children, className, ...props }) => {
        void node;
        return (
            <h5 className={cn("mt-4 mb-2 text-base font-semibold leading-tight", className)} {...props}>
                {children}
            </h5>
        );
    },
    h6: ({ node, children, className, ...props }) => {
        void node;
        return (
            <h6 className={cn("mt-4 mb-2 text-sm font-semibold leading-tight", className)} {...props}>
                {children}
            </h6>
        );
    },
    table: ({ node, children, className, ...props }) => {
        void node;
        return (
            <div className="my-4 overflow-x-auto">
                <table className={cn("w-full border-collapse border border-gray-200", className)} {...props}>
                    {children}
                </table>
            </div>
        );
    },
    thead: ({ node, children, className, ...props }) => {
        void node;
        return (
            <thead className={cn("bg-gray-50", className)} {...props}>
                {children}
            </thead>
        );
    },
    tbody: ({ node, children, className, ...props }) => {
        void node;
        return (
            <tbody className={cn("divide-y divide-gray-200", className)} {...props}>
                {children}
            </tbody>
        );
    },
    tr: ({ node, children, className, ...props }) => {
        void node;
        return (
            <tr className={cn("border-b border-gray-200", className)} {...props}>
                {children}
            </tr>
        );
    },
    th: ({ node, children, className, ...props }) => {
        void node;
        return (
            <th className={cn("px-4 py-2 text-left text-sm font-semibold", className)} {...props}>
                {children}
            </th>
        );
    },
    td: ({ node, children, className, ...props }) => {
        void node;
        return (
            <td className={cn("px-4 py-2 text-sm", className)} {...props}>
                {children}
            </td>
        );
    },
    blockquote: ({ node, children, className, ...props }) => {
        void node;
        return (
            <blockquote
                className={cn(
                    "my-4 border-l-4 border-gray-200 pl-4 text-gray-700 italic [&>*:last-child]:mb-0",
                    className,
                )}
                {...props}
            >
                {children}
            </blockquote>
        );
    },
    code: ({ node, className, ...props }) => {
        const inline = node?.position?.start.line === node?.position?.end.line;

        if (!inline) {
            return <code className={className} {...props} />;
        }

        return (
            <code
                className={cn("rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.92em]", className)}
                {...props}
            />
        );
    },
    pre: ({ node, className, children }) => {
        let language: string | undefined;

        const nodeClass = node?.properties?.className;
        if (typeof nodeClass === "string") {
            language = nodeClass.replace("language-", "");
        } else if (Array.isArray(nodeClass)) {
            const langClass = nodeClass.find((entry) => typeof entry === "string" && entry.startsWith("language-"));
            if (langClass) {
                language = (langClass as string).replace("language-", "");
            }
        }

        const code = extractCode(children);

        return <CodeBlock className={className} code={code} language={language} />;
    },
};

function CodeBlock({ code, language, className }: { code: string; language?: string; className?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch (error) {
            console.error("Failed to copy code", error);
        }
    };

    return (
        <div className={cn("relative my-3 overflow-hidden rounded-xl border border-gray-200 bg-[#0f0f0f]", className)}>
            <pre className="overflow-x-auto px-4 py-3 text-sm leading-relaxed text-white">
                <code className={language ? `language-${language}` : undefined}>{code}</code>
            </pre>
            <button
                type="button"
                onClick={handleCopy}
                className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 transition hover:bg-white/20"
            >
                {copied ? "Copied" : "Copy"}
            </button>
        </div>
    );
}

export const Response = memo(
    ({
        className,
        options,
        children,
        allowedImagePrefixes,
        allowedLinkPrefixes,
        defaultOrigin,
        parseIncompleteMarkdown: shouldParseIncompleteMarkdown = true,
        ...props
    }: ResponseProps) => {
        const parsedChildren =
            typeof children === "string" && shouldParseIncompleteMarkdown
                ? parseIncompleteMarkdown(children)
                : children;

        return (
            <div
                className={cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}
                {...props}
            >
                <HardenedMarkdown
                    allowedImagePrefixes={allowedImagePrefixes ?? ["*"]}
                    allowedLinkPrefixes={allowedLinkPrefixes ?? ["*"]}
                    defaultOrigin={defaultOrigin}
                    components={components}
                    rehypePlugins={[rehypeKatex]}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    {...options}
                >
                    {parsedChildren}
                </HardenedMarkdown>
            </div>
        );
    },
    (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.className === nextProps.className,
);

Response.displayName = "Response";
