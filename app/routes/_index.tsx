import type { LoaderArgs } from "@remix-run/node"
import { defer } from "@remix-run/node"
import { Await, useLoaderData, useNavigation } from "@remix-run/react"
import clsx from "clsx"
import { Suspense, useMemo } from "react"
import { SearchBar } from "~/components/SearchBar"
import { OrganicSearchResult } from "~/components/SearchResult"
import { Spinner } from "~/components/Spinner"
import type { OrganicResult } from "~/api/serpapi"
import { search } from "~/api/search"

export async function loader({ request }: LoaderArgs) {
    let url = new URL(request.url)
    let query = url.searchParams.get("q")

    let results = Promise.resolve<OrganicResult[]>([])

    if (query?.length) {
        results = search({
            source: "google",
            q: query,
            num: 40,
        }).then(res => res.organic_results)
    }

    return defer({ results, query })
}

export default function Index() {
    let { results, query } = useLoaderData<typeof loader>()
    let navigation = useNavigation()
    let isLoading = useMemo(() => navigation.state === "loading", [navigation])
    let isSearching = useMemo(() => !!query?.length, [query])

    return (
        <>
            <div
                className={clsx(
                    "flex flex-col justify-center gap-8 px-4 py-6 sm:px-64 sm:py-8",
                    isSearching ? "h-full" : "h-screen",
                )}
            >
                {!isSearching && (
                    <h3 className="w-full text-center text-3xl font-bold dark:text-gray-200">
                        Search
                    </h3>
                )}
                <SearchBar />
                {/* Duplicating this fallback element sucks, but it's intended behavior in Remix 😒 */}
                {/* See: https://remix.run/docs/en/1.19.3/guides/streaming#when-does-the-fallback-render */}
                <Suspense fallback={<Spinner />}>
                    <Await resolve={results}>
                        {results =>
                            isLoading ? (
                                <Spinner />
                            ) : (
                                results.map(result => (
                                    <OrganicSearchResult key={result.link} data={result} />
                                ))
                            )
                        }
                    </Await>
                </Suspense>
            </div>
        </>
    )
}
