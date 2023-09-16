import { JSDOM as DOMParser } from "jsdom"
import type { SearchResponse } from "./serpapi"

export async function fetchFavicons(response: SearchResponse) {
    let needFavicons = response.organic_results.some(result => !result.favicon)
    if (!needFavicons) return response

    return {
        ...response,
        organic_results: await Promise.all(
            response.organic_results.map(async result => {
                if (result.favicon) return result
                let favicon = await fetchFavicon(result)
                return { ...result, favicon }
            }),
        ),
    }
}

async function fetchFavicon(result: { link: string }) {
    let favicon
    try {
        let faviconResponse = await fetch(result.link, {
            headers: { "User-Agent": "facebookexternalhit/1.1" },
        }).then(resp => resp.text())

        let dom = new DOMParser(faviconResponse)
        let icons = Array(...dom.window.document.head.children).filter(
            tag => tag.tagName === "LINK" && tag.getAttribute("rel")?.includes("icon"),
        )
        favicon = icons[0]?.getAttribute("href") ?? undefined
    } catch {}
    return favicon
}
