import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { Form, useLoaderData, useLocation } from "@remix-run/react"
import { useMemo, useRef } from "react"
import type { loader } from "~/routes/_search._index/route"
import { Button } from "../../components/Button"
import { SearchTabs } from "./SearchTabs"

export function SearchBar() {
    let { query } = useLoaderData<typeof loader>()
    let isSearching = useMemo(() => !!query?.length, [query])
    let inputRef = useRef<HTMLInputElement>(null)
    let location = useLocation()

    return (
        <div className="px-4 sm:px-28 md:px-40 lg:px-60">
            {!isSearching && (
                <h3 className="w-full text-center text-3xl font-bold dark:text-zinc-200">Search</h3>
            )}

            <div className="sticky top-0 flex flex-col items-center gap-2 bg-white py-6 dark:bg-zinc-900">
                <Form
                    action={location.pathname}
                    className="flex w-full flex-row gap-2"
                    onSubmit={() => inputRef.current?.blur()}
                    role="search"
                >
                    <div className="relative w-full rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon
                                aria-hidden="true"
                                className="h-5 w-5 text-zinc-400"
                            />
                        </div>
                        <input
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-zinc-900 ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus-visible:outline-none dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
                            defaultValue={query ?? undefined}
                            id="q"
                            name="q"
                            placeholder="Search the web"
                            ref={inputRef}
                            type="text"
                        />
                    </div>
                    <Button type="submit">Search</Button>
                </Form>

                <SearchTabs />
            </div>
        </div>
    )
}
