import { InformationCircleIcon } from "@heroicons/react/20/solid"
import { Await, Link, useLoaderData, useNavigation } from "@remix-run/react"
import { useMemo } from "react"
import type { SearchResponse } from "~/api/serpapi"
import type { loader } from "~/routes/_index"
import { OrganicSearchResult } from "./SearchResult"
import { Spinner } from "./Spinner"

namespace SpellCheck {
    export interface Props {
        info: SearchResponse["search_information"]
    }
}

function SpellCheck({ info }: SpellCheck.Props) {
    let search = useMemo(() => {
        if (info.showing_results_for) {
            return new URLSearchParams({
                q: info.showing_results_for,
            }).toString()
        }

        return null
    }, [info.showing_results_for])

    if (!search) {
        return null
    }

    // return (
    //     <div className="flex flex-col gap-1 pb-6 text-sm">
    //         <span>
    //             Showing results for <span>{info.showing_results_for}</span>
    //         </span>
    //         <span>
    //             Search instead for{" "}
    //             <Link
    //                 className="text-blue-700 visited:text-purple-800 hover:underline dark:text-blue-500 dark:visited:text-purple-600"
    //                 to={{ search }}
    //             >
    //                 {info.spelling_fix}
    //             </Link>
    //         </span>
    //     </div>
    // )

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
                            instead of <span className="font-bold">{info.query_displayed}</span>
                        </p>
                        {/* <p className="mt-3 text-sm sm:ml-6 sm:mt-0">
                            <Link
                                className="whitespace-nowrap text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                to={{ search }}
                            >
                                Search for <span className="font-bold">{info.query_displayed}</span>{" "}
                                instead
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function SearchResults() {
    let { results, info } = useLoaderData<typeof loader>()
    let navigation = useNavigation()
    let isLoading = useMemo(() => navigation.state === "loading", [navigation])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <Await resolve={info}>{info => <SpellCheck info={info} />}</Await>

            <ul className="flex flex-col gap-8">
                {/* Duplicating this fallback element sucks, but it's intended behavior in Remix 😒 */}
                {/* See: https://remix.run/docs/en/1.19.3/guides/streaming#when-does-the-fallback-render */}
                <Await resolve={results}>
                    {results =>
                        results.map(result => (
                            <OrganicSearchResult data={result} key={result.link} />
                        ))
                    }
                </Await>
            </ul>
        </>
    )
}
