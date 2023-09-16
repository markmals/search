import { MagnifyingGlassIcon, PhotoIcon } from "@heroicons/react/20/solid"
import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { Form, Link, useLoaderData, useLocation, useNavigate } from "@remix-run/react"
import clsx from "clsx"
import { useMemo, useRef } from "react"
import type { loader } from "~/routes/_search._index/route"
import { Button } from "../../components/Button"

const tabs = [
    { name: "All Websites", route: "/", icon: GlobeAltIcon },
    { name: "Images", route: "/images", icon: PhotoIcon },
]

export function SearchBar() {
    let { query } = useLoaderData<typeof loader>()
    let isSearching = useMemo(() => !!query?.length, [query])
    let inputRef = useRef<HTMLInputElement>(null)
    let location = useLocation()
    let navigate = useNavigate()

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

                <div className="w-full sm:hidden">
                    <label className="sr-only" htmlFor="tabs">
                        Select a tab
                    </label>
                    <select
                        className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        id="tabs"
                        name="tabs"
                        onChange={event => {
                            navigate({
                                pathname: event.target.value,
                                search: location.search,
                            })
                        }}
                        value={tabs.find(tab => tab.route === location.pathname)!.route}
                    >
                        {tabs.map(tab => (
                            <option key={tab.name} value={tab.route}>
                                {tab.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden w-full sm:block">
                    <div className="border-b border-gray-200 dark:border-gray-600">
                        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                            {tabs.map(tab => (
                                <Link
                                    aria-current={
                                        tab.route === location.pathname ? "page" : undefined
                                    }
                                    aria-disabled={tab.route === location.pathname}
                                    className={clsx(
                                        tab.route === location.pathname
                                            ? "border-blue-500 text-blue-600 dark:text-blue-500"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-100 dark:hover:text-gray-200",
                                        "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium",
                                    )}
                                    key={tab.name}
                                    onClick={event => {
                                        if (tab.route === location.pathname) {
                                            event.preventDefault()
                                        }
                                    }}
                                    to={{ pathname: tab.route, search: location.search }}
                                >
                                    <tab.icon
                                        aria-hidden="true"
                                        className={clsx(
                                            tab.route === location.pathname
                                                ? "text-blue-500 dark:text-blue-600"
                                                : "text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-200",
                                            "-ml-0.5 mr-2 h-5 w-5",
                                        )}
                                    />
                                    <span>{tab.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
