import { GlobeAltIcon, PhotoIcon } from "@heroicons/react/24/outline"
import { Link, useLocation, useNavigate } from "@remix-run/react"
import clsx from "clsx"

const tabs = [
    { name: "All Websites", route: "/", icon: GlobeAltIcon },
    { name: "Images", route: "/images", icon: PhotoIcon },
]

export function SearchTabs() {
    let location = useLocation()
    let navigate = useNavigate()

    return (
        <>
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
                                aria-current={tab.route === location.pathname ? "page" : undefined}
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
                                            ? "text-blue-600 dark:text-blue-500"
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
        </>
    )
}
