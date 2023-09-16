import type { ImageResult } from "~/api/serpapi"

export namespace ImageSearchResult {
    export interface Props {
        data: ImageResult
    }
}

export function ImageSearchResult({ data: image }: ImageSearchResult.Props) {
    return (
        <li className="flex flex-col gap-1">
            <a className="focus:outline-none" href={image.original}>
                <img
                    alt={image.title}
                    className="h-40 w-full rounded-lg object-cover"
                    src={image.thumbnail}
                />
                <span className="sr-only">View details for {image.title}</span>
            </a>
            <div className="flex flex-row items-center gap-1">
                {/* <img
                        alt={
                            result.favicon
                                ? `Favicon for ${result.source}`
                                : "Missing result favicon"
                        }
                        className="h-4 w-4"
                        src={result.favicon ?? "/favicon.svg"}
                    /> */}
                <p className="line-clamp-1 text-sm text-emerald-900 dark:text-emerald-600">
                    {image.source}
                </p>
            </div>

            <a
                className="line-clamp-2 text-sm text-gray-900 visited:text-purple-900 hover:underline dark:text-gray-100 dark:visited:text-purple-300"
                href={image.link}
            >
                {image.title}
            </a>
        </li>
    )
}
