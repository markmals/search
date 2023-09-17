import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Outlet, useLoaderData, useNavigate, useRouteError } from "@remix-run/react"
import clsx from "clsx"
import { useMemo } from "react"
import { Button } from "~/components/Button"
import { SearchBar } from "~/routes/_search/SearchBar"

export async function loader({ request }: LoaderFunctionArgs) {
    let url = new URL(request.url)
    let query = url.searchParams.get("q")
    return json({ query })
}

export default function SearchLayout() {
    let { query } = useLoaderData<typeof loader>()
    let isSearching = useMemo(() => !!query?.length, [query])

    return (
        <div className={clsx("flex flex-col justify-center", isSearching ? "h-full" : "h-screen")}>
            <SearchBar />
            {/* TODO: Animate these children using Framer Motion */}
            {/* Can't use autoAnimate because it adds `position: relative` which messes up the search bar z-index */}
            <section aria-labelledby="search-results">
                <Outlet />
            </section>
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
