export function getQuery(request: Request) {
    let url = new URL(request.url)
    return url.searchParams.get("q")
}
