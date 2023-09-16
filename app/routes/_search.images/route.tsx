import type { LoaderArgs } from "@remix-run/node"
import { defer } from "@remix-run/node"
import { Await, useLoaderData, useNavigation } from "@remix-run/react"
import { Suspense, useMemo } from "react"
import { getQuery } from "~/api/query"
import { search } from "~/api/search"
import type { ImageResult, SearchResponse } from "~/api/serpapi"
import { SpellCheck } from "~/components/SpellCheck"
import { Spinner } from "~/components/Spinner"
import { ImageSearchResult } from "./ImageSearchResult"

export async function loader({ request }: LoaderArgs) {
    let query = getQuery(request)
    let imageResults = Promise.resolve<ImageResult[]>([])
    let info = Promise.resolve<Partial<SearchResponse["search_information"]>>({})

    if (query?.length) {
        let results = search({
            source: "google_images",
            q: query,
            num: 40,
        })

        imageResults = results.then(res => res.images_results)
        info = results.then(res => res.search_information)
    }

    return defer({ results: imageResults, info })
}

export default function ImageResults() {
    let { results, info } = useLoaderData<typeof loader>()
    let navigation = useNavigation()
    let isLoading = useMemo(() => navigation.state === "loading", [navigation])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Suspense fallback={<Spinner />}>
            <div className="px-4 pb-6 sm:px-20 sm:pb-8">
                <h2 className="sr-only" id="results-heading">
                    Image Search Results
                </h2>
                <Await resolve={info}>{info => <SpellCheck info={info} />}</Await>
                <ul className="grid grid-cols-3 gap-x-4 gap-y-6 lg:grid-cols-4 xl:grid-cols-6">
                    <Await resolve={results}>
                        {results =>
                            results.map(result => (
                                <ImageSearchResult data={result} key={result.original} />
                            ))
                        }
                    </Await>
                </ul>
            </div>
        </Suspense>
    )
}
