export function getQuery(request: Request) {
    let url = new URL(request.url)
    return { q: url.searchParams.get("q"), v: Boolean(url.searchParams.get("v")) }
}
