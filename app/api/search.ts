import { getJson } from "serpapi"
import type { SearchResponse } from "./serpapi"

export type SearchOptions = GoogleSearchOptions | YouTubeSearchOptions

export interface GoogleSearchOptions {
    source:
        | "google"
        | "google_maps"
        | "google_images"
        | "google_autocomplete"
        | "google_reverse_image"
    q: string
    num?: number
    start?: number
}

export interface EbaySearchOptions {}
export interface YelpSearchOptions {}
export interface WalmartSearchOptions {}
export interface HomeDepotSearchOptions {}

export interface YouTubeSearchOptions {
    source: "youtube"
    search_query: string
}

export async function search({ source, ...options }: SearchOptions) {
    return (await getJson(source, {
        ...options,
        // hard-code the locale to US
        gl: "us",
        api_key: process.env.API_KEY!,
    })) as SearchResponse
}
