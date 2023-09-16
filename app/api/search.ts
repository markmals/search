import { getJson } from "serpapi"
import type { SearchResponse, SearchResponseWithImages } from "./serpapi"

export type SearchOptions = GoogleSearchOptions | GoogleImageSearchOptions | YouTubeSearchOptions

export interface BaseGoogleSearchOptions {
    q: string
    num?: number
    start?: number
}

export interface GoogleSearchOptions extends BaseGoogleSearchOptions {
    source: "google"
}

export interface GoogleImageSearchOptions extends BaseGoogleSearchOptions {
    source: "google_images"
}

export interface EbaySearchOptions {}
export interface YelpSearchOptions {}
export interface WalmartSearchOptions {}
export interface HomeDepotSearchOptions {}

export interface YouTubeSearchOptions {
    source: "youtube"
    search_query: string
}

export function search(options: GoogleSearchOptions): Promise<SearchResponse>
export function search(options: GoogleImageSearchOptions): Promise<SearchResponseWithImages>
export async function search({ source, ...options }: SearchOptions): Promise<any> {
    return await getJson(source, {
        ...options,
        // hard-code the locale to US
        gl: "us",
        api_key: process.env.API_KEY!,
    })
}
