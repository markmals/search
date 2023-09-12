import type { LoaderArgs } from "@remix-run/node"
import { defer } from "@remix-run/node"
import { Await, useLoaderData, useNavigate, useNavigation, useRouteError } from "@remix-run/react"
import clsx from "clsx"
import { Suspense, useMemo } from "react"
import { SearchBar } from "~/components/SearchBar"
import { OrganicSearchResult } from "~/components/SearchResult"
import { Spinner } from "~/components/Spinner"
import type { OrganicResult } from "~/api/serpapi"
import { search } from "~/api/search"
import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { Button } from "~/components/Button"

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

    // throw new Error("Server timeout.")
    return defer({ results, query })
}

export default function Index() {
    let { results, query } = useLoaderData<typeof loader>()
    let navigation = useNavigation()
    let isLoading = useMemo(() => navigation.state === "loading", [navigation])
    let isSearching = useMemo(() => !!query?.length, [query])

    return (
        <div
            className={clsx(
                "flex flex-col justify-center px-4 pb-6 sm:px-64 sm:pb-8",
                isSearching ? "h-full" : "h-screen",
            )}
        >
            <SearchBar />

            <ul className="flex flex-col gap-8">
                {/* Duplicating this fallback element sucks, but it's intended behavior in Remix 😒 */}
                {/* See: https://remix.run/docs/en/1.19.3/guides/streaming#when-does-the-fallback-render */}
                <Suspense fallback={<Spinner />}>
                    <Await resolve={results}>
                        {results =>
                            isLoading ? (
                                <Spinner />
                            ) : (
                                results.map(result => (
                                    <OrganicSearchResult data={result} key={result.link} />
                                ))
                            )
                        }
                    </Await>
                </Suspense>
            </ul>
        </div>
    )
}

export function ErrorBoundary() {
    let navigate = useNavigate()

    let error = useRouteError() as any
    let message = error.statusText || error.message
    console.error(error)

    return (
        <div className="flex h-screen flex-col justify-center px-4 py-6 text-center dark:text-zinc-200 sm:px-64 sm:py-8">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 opacity-40" />
            <h3 className="mt-2 text-sm font-semibold">Error!</h3>
            {/* <p className="mt-1 text-sm opacity-50">Sorry, an unexpected error has occurred.</p> */}
            <p className="mt-1 text-sm opacity-50">
                <i>{message.replace("Error: ", "")}</i>
            </p>
            <div className="mt-6">
                <Button onClick={() => navigate(0)} type="button">
                    <ArrowPathIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
                    Refresh
                </Button>
            </div>
        </div>
    )
}
