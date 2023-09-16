import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import type { LoaderArgs } from "@remix-run/node"
import { defer } from "@remix-run/node"
import { useLoaderData, useNavigate, useRouteError } from "@remix-run/react"
import clsx from "clsx"
import { Suspense, useMemo } from "react"
import { fetchFavicons } from "~/api/favicons"
import { search } from "~/api/search"
import type { OrganicResult, SearchResponse } from "~/api/serpapi"
import { Button } from "~/components/Button"
import { SearchBar } from "~/components/SearchBar"
import { SearchResults } from "~/components/SearchResults"
import { Spinner } from "~/components/Spinner"

export async function loader({ request }: LoaderArgs) {
    let url = new URL(request.url)
    let query = url.searchParams.get("q")

    let organicResults = Promise.resolve<OrganicResult[]>([])
    let info = Promise.resolve<Partial<SearchResponse["search_information"]>>({})

    if (query?.length) {
        let results = search({
            source: "google",
            q: query,
            num: 40,
        }).then(fetchFavicons)

        organicResults = results.then(res => res.organic_results)
        info = results.then(res => res.search_information)
    }

    return defer({ results: organicResults, info, query })
}

export default function Index() {
    let { query } = useLoaderData<typeof loader>()
    let isSearching = useMemo(() => !!query?.length, [query])

    return (
        <div
            className={clsx(
                "flex flex-col justify-center px-4 pb-6 sm:px-28 sm:pb-8 md:px-40 lg:px-60",
                isSearching ? "h-full" : "h-screen",
            )}
        >
            <SearchBar />

            <Suspense fallback={<Spinner />}>
                <SearchResults />
            </Suspense>
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
