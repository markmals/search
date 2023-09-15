import type { OrganicResult } from "~/api/serpapi"

export function OrganicSearchResult({ data: result }: { data: OrganicResult }) {
    return (
        <li className="flex flex-col font-sans">
            <div className="mb-2 flex flex-row items-center gap-1">
                {/* TODO: Placeholder favicon */}
                <img
                    alt={result.favicon ? `Favicon for ${result.source}` : "Missing result favicon"}
                    className="h-4 w-4"
                    src={result.favicon ?? "/favicon.svg"}
                />
                <span className="text-sm text-emerald-900 dark:text-emerald-600">
                    {result.displayed_link}
                </span>
            </div>

            <a
                className="mb-1 text-blue-700 visited:text-purple-800 hover:underline dark:text-blue-500 dark:visited:text-purple-600"
                href={result.link}
            >
                {result.title}
            </a>

            <div className="text-zinc-700 dark:text-zinc-300/80">{result.snippet}</div>
        </li>
    )
}
