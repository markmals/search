import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData, useNavigation } from "@remix-run/react"
import clsx from "clsx"
import { useMemo } from "react"
import { getJson } from "serpapi"
import { SearchBar } from "~/components/SearchBar"
import { OrganicSearchResult } from "~/components/SearchResult"
import { Spinner } from "~/components/Spinner"
import type { OrganicResult, SerpResponse } from "~/types/serpapi"

export async function loader({ request }: LoaderArgs) {
    let url = new URL(request.url)
    let query = url.searchParams.get("q")

    let results: OrganicResult[] = []

    if (query?.length) {
        let { organic_results } = (await getJson("google", {
            q: query,
            api_key: process.env.API_KEY!,
            num: 40,
        })) as SerpResponse
        results = organic_results
    }

    return json({ results, query })
}

export default function Index() {
    let { results } = useLoaderData<typeof loader>()
    let navigation = useNavigation()
    let isLoading = useMemo(() => navigation.state === "loading", [navigation])

    return (
        <>
            <div
                className={clsx(
                    "flex flex-col justify-center gap-8 px-4 py-6 sm:px-64 sm:py-8",
                    results.length ? "h-full" : "h-screen",
                )}
            >
                {!results.length && (
                    <h3 className="w-full text-center text-3xl font-bold dark:text-gray-200">
                        Search
                    </h3>
                )}
                <SearchBar />
                {isLoading ? (
                    <Spinner />
                ) : (
                    results.map(result => <OrganicSearchResult key={result.link} data={result} />)
                )}
            </div>
        </>
    )
}
