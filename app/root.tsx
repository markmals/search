import { json } from "@remix-run/node"
import type { LoaderArgs, LinksFunction, V2_MetaFunction } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import styles from "./styles/index.css"

export function loader({ request }: LoaderArgs) {
    let url = new URL(request.url)
    let query = url.searchParams.get("q")

    return json({ query })
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
    { title: data?.query ? `${data.query} - Search` : "Search" },
    // { property: "og:title", content: "Recommendations" },
    // { property: "og:type", content: "website" },
    // { property: "og:image", content: "/social-media-dark.png" },
    // { property: "og:description", content: description },
    // data ? { property: "og:url", content: data!.url } : {},
]

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    { rel: "icon", type: "image/svg+xml", href: "favicon.svg" },
]

export default function App() {
    return (
        <html className="bg-white dark:bg-zinc-900" lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width,initial-scale=1" name="viewport" />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
