import type { LoaderArgs } from "@remix-run/node"
import { defer } from "@remix-run/node"
import { Await, useLoaderData, useNavigation } from "@remix-run/react"
import { Suspense, useMemo } from "react"
import { fetchFavicons } from "~/api/favicons"
import { getQuery } from "~/api/query"
import { search } from "~/api/search"
import type { OrganicResult, SearchResponse } from "~/api/serpapi"
import { SpellCheck } from "~/components/SpellCheck"
import { Spinner } from "~/components/Spinner"
import { OrganicSearchResult } from "~/routes/_search._index/OrganicSearchResult"

export async function loader({ request }: LoaderArgs) {
    let { q: query, v: verbatim } = getQuery(request)
    let organicResults = Promise.resolve<OrganicResult[]>([])
    let info = Promise.resolve<Partial<SearchResponse["search_information"]>>({})

    if (query?.length) {
        let results = search({
            source: "google",
            q: query,
            nfpr: verbatim ? 1 : 0,
            num: 40,
        }).then(fetchFavicons)

        organicResults = results.then(res => res.organic_results)
        info = results.then(res => res.search_information)
    }

    return defer({ results: organicResults, info, query, verbatim })
}

export default function Index() {
    let { results, info, verbatim } = useLoaderData<typeof loader>()
    let navigation = useNavigation()
    let isLoading = useMemo(() => navigation.state === "loading", [navigation])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Suspense fallback={<Spinner />}>
            <div className="px-4 pb-6 sm:px-28 sm:pb-8 md:px-40 lg:px-60">
                <h2 className="sr-only" id="results-heading">
                    Search Results
                </h2>
                <Await resolve={info}>{info => !verbatim && <SpellCheck info={info} />}</Await>
                <ul className="flex flex-col gap-8">
                    <Await resolve={results}>
                        {results =>
                            results.map(result => (
                                <OrganicSearchResult data={result} key={result.link} />
                            ))
                        }
                    </Await>
                </ul>
            </div>
        </Suspense>
    )
}
