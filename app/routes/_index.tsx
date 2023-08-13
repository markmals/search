import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form, useLoaderData, useNavigation } from "@remix-run/react"
import clsx from "clsx"
import { useMemo, useRef } from "react"
import { getJson } from "serpapi"

interface SerpResponse {
    search_metadata: {
        id: string
    }

    search_information: {
        organic_results_state: string
        query_displayed: string
        total_results: number
        menu_items: any[]
    }

    recipes_results: RecipeResult[]
    local_map: {
        link: string
        image: string
        gps_coordinates: {
            latitude: number
            longitude: number
            altitude: number
        }
    }
    local_results: { places: any[] }
    knowledge_graph: {}
    inline_images: any[]
    related_questions: any[]
    organic_results: OrganicResult[]
}

interface OrganicResult {
    position: number
    title: string
    link: string
    displayed_link: string
    thumbnail: string
    favicon?: string
    snippet: string
    snippet_highlighted_words: string[]
    // sitelinks: { inline: any[] }
    // rich_snippet: { bottom: any }
    about_this_result: { keywords: string[]; languages: string[]; regions: string[] }
    cached_page_link: string
    // related_pages_link: string
    source: string
}

interface RecipeResult {
    title: string
    link: string
    source: string
    rating: number
    reviews: number
    total_time: string
    ingredients: any[]
    thumbnail: string
}

export async function loader({ request }: LoaderArgs) {
    let url = new URL(request.url)
    let query = url.searchParams.get("q")

    if (query?.length) {
        let { organic_results: results } = (await getJson("google", {
            q: query,
            api_key: process.env.API_KEY!,
            num: 40,
        })) as SerpResponse
        return json({ results, query })
    }
    
    
    return json({results: [], query})
}

export default function Index() {
    let { results, query } = useLoaderData<typeof loader>()

    const navigation = useNavigation()
    const isLoading = useMemo(() => navigation.state === "loading", [navigation])

    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <div
                className={clsx(
                    "flex flex-col justify-center gap-8 px-4 py-6 sm:px-64 sm:py-8",
                    results.length ? "h-full" : "h-screen",
                )}
            >
                    {!results.length && <h3 className="text-3xl text-center w-full dark:text-gray-200">Search</h3>}
                <Form className="flex flex-row items-center gap-2" role="search" onSubmit={() => inputRef.current?.blur()}>
                    <div className="relative w-full rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
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
                {isLoading ? (
                    <Spinner />
                ) : (
                    results.map(result => (<Result key={result.link} data={result} />))
                )}
            </div>
        </>
    )
}

function Result({data: result}: {data: OrganicResult}) {
    return (
        <div className="flex flex-col font-sans">
        <div className="mb-2 flex flex-row items-center gap-1">
            {/* TODO: Placeholder favicon */}
            <img
                className="h-4 w-4"
                src={result.favicon}
                alt={`Favicon for ${result.source}`}
            />
            <span className="text-sm text-emerald-900 dark:text-emerald-600">
                {result.displayed_link}
            </span>
        </div>

        <a
            className="mb-1 text-blue-700 visited:text-blue-800 hover:underline dark:text-blue-500 dark:visited:text-blue-600"
            href={result.link}
        >
            {result.title}
        </a>

        <div className="text-gray-700 dark:text-gray-300/80">
            {result.snippet}
        </div>
    </div>

    )
}

function Spinner() {
    return (
        <span className="flex w-full items-center justify-center text-sm font-medium" role="status">
            <svg
                className="mr-2 h-7 w-7 animate-spin fill-blue-600 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 100 101"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </span>
    )
}
