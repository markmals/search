import type { OrganicResult } from "~/types/serpapi"

export function OrganicSearchResult({ data: result }: { data: OrganicResult }) {
    return (
        <div className="flex flex-col font-sans">
            <div className="mb-2 flex flex-row items-center gap-1">
                {/* TODO: Placeholder favicon */}
                <img
                    className="h-4 w-4"
                    src={result.favicon}
                    alt={`Favicon for ${result.source}`}
                />
                <span className="text-sm text-emerald-900 dark:text-emerald-600">
                    {result.displayed_link}
                </span>
            </div>

            <a
                className="mb-1 text-blue-700 visited:text-blue-800 hover:underline dark:text-blue-500 dark:visited:text-blue-600"
                href={result.link}
            >
                {result.title}
            </a>

            <div className="text-gray-700 dark:text-gray-300/80">{result.snippet}</div>
        </div>
    )
}
