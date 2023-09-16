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
    let search = useMemo(
        () =>
            info.showing_results_for
                ? new URLSearchParams({
                      q: info.showing_results_for,
                  }).toString()
                : null,

        [info.showing_results_for],
    )

    if (!search) {
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
                            <Link className="font-bold hover:underline" to={{ search }}>
                                {info.showing_results_for}
                            </Link>{" "}
                            {info.query_displayed && (
                                <>
                                    instead of{" "}
                                    <span className="font-bold">{info.query_displayed}</span>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
