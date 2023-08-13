import { Form, useLoaderData } from "@remix-run/react"
import { useRef } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import type { loader } from "~/routes/_index"

export function SearchBar() {
    let { query } = useLoaderData<typeof loader>()
    let inputRef = useRef<HTMLInputElement>(null)

    // TODO: Make this sticky on mobile
    return (
        <Form
            className="flex flex-row items-center gap-2"
            role="search"
            onSubmit={() => inputRef.current?.blur()}
        >
            <div className="relative w-full rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    defaultValue={query ?? undefined}
                    type="text"
                    name="q"
                    id="email"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus-visible:outline-none dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="Search the web"
                    ref={inputRef}
                />
            </div>
            <button
                type="submit"
                className="inline-flex w-auto items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                Search
            </button>
        </Form>
    )
}
