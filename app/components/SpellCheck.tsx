import { InformationCircleIcon } from "@heroicons/react/20/solid"
import { Link } from "@remix-run/react"
import { useMemo } from "react"
import type { SearchResponse } from "~/api/serpapi"

export namespace SpellCheck {
    export interface Props {
        info: Partial<SearchResponse["search_information"]>
    }
}

export function SpellCheck({ info }: SpellCheck.Props) {
    let searchVerbatim = useMemo(() => {
        if (info.query_displayed) {
            return new URLSearchParams({
                q: info.query_displayed,
                v: "true",
            }).toString()
        }

        return null
    }, [info.query_displayed])

    let searchCorrected = useMemo(() => {
        if (info.spelling_fix) {
            return new URLSearchParams({
                q: info.spelling_fix,
            }).toString()
        }

        return null
    }, [info.spelling_fix])

    const orig = info.query_displayed?.split(" ")
    const fixed = info.spelling_fix?.split(" ")
    const incorrectWords = fixed?.filter(fix => !orig?.includes(fix))
    const correctWords = orig?.filter(fix => !fixed?.includes(fix))

    if (!searchVerbatim || !searchCorrected) {
        return null
    }

    return (
        <div className="pb-6">
            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
                <div className="flex">
                    <div className="shrink-0">
                        <InformationCircleIcon
                            aria-hidden="true"
                            className="h-5 w-5 text-blue-400"
                        />
                    </div>
                    <div className="ml-3 flex-1 sm:flex sm:justify-between">
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                            Showing results for{" "}
                            <Link to={{ search: searchCorrected }}>
                                &quot;
                                <span className="hover:underline">
                                    {fixed?.map((word, idx, arr) => {
                                        const space = !(idx === arr.length - 1)
                                        if (incorrectWords?.includes(word)) {
                                            return (
                                                <span className="font-bold" key={word}>
                                                    {word}
                                                    {space ? " " : ""}
                                                </span>
                                            )
                                        }

                                        return (
                                            <span key={word}>
                                                {word}
                                                {space ? " " : ""}
                                            </span>
                                        )
                                    })}
                                </span>
                                &quot;
                            </Link>
                        </p>
                        <p className="mt-3 text-sm sm:ml-6 sm:mt-0">
                            <Link
                                className="whitespace-nowrap text-blue-700 hover:text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-500"
                                to={{ search: searchVerbatim }}
                            >
                                Search for &quot;
                                {orig?.map((word, idx, arr) => {
                                    const space = !(idx === arr.length - 1)
                                    if (correctWords?.includes(word)) {
                                        return (
                                            <span className="font-bold" key={word}>
                                                {word}
                                                {space ? " " : ""}
                                            </span>
                                        )
                                    }

                                    return (
                                        <span key={word}>
                                            {word}
                                            {space ? " " : ""}
                                        </span>
                                    )
                                })}
                                &quot; instead
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
