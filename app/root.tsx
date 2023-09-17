import type { LinksFunction, LoaderArgs, V2_MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import { useEffect, useState } from "react"
import { useColorScheme } from "./lib/useColorScheme"
import styles from "./styles/index.css"

export function loader({ request }: LoaderArgs) {
    let url = new URL(request.url)
    let query = url.searchParams.get("q")
    return json({ query })
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
    { title: data?.query ? `${data.query} - Search` : "Search" },
    // { property: "og:title", content: "" },
    // { property: "og:type", content: "website" },
    // { property: "og:image", content: "/social-media.png" },
    // { property: "og:description", content: "description" },
    // data ? { property: "og:url", content: data!.url } : {},
]

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    { rel: "icon", type: "image/svg+xml", href: "favicon.svg" },
    { rel: "apple-touch-icon", href: "icon.png" },
    { rel: "manifest", href: "manifest.json" },
]

export default function App() {
    let colorScheme = useColorScheme()
    let [theme, setTheme] = useState("#fff")

    useEffect(() => {
        setTheme(colorScheme === "light" ? "#fff" : "#18181b")
    }, [colorScheme])

    return (
        <html className="bg-white text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300/80" lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width,initial-scale=1" name="viewport" />
                <meta content={theme} name="theme-color" />
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
