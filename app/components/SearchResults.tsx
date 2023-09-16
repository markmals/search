import { Await, useLoaderData, useNavigation } from "@remix-run/react"
import { useMemo } from "react"
import type { loader } from "~/routes/_index"
import { OrganicSearchResult } from "./SearchResult"
import { SpellCheck } from "./SpellCheck"
import { Spinner } from "./Spinner"

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
