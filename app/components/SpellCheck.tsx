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
                            <Link
                                className="font-bold hover:underline"
                                to={{ search: searchCorrected }}
                            >
                                {info.spelling_fix}
                            </Link>
                        </p>
                        <p className="mt-3 text-sm sm:ml-6 sm:mt-0">
                            <Link
                                className="whitespace-nowrap text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                to={{ search: searchVerbatim }}
                            >
                                Search for <span className="font-bold">{info.query_displayed}</span>{" "}
                                instead
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
