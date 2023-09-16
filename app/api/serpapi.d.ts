export interface SearchResponse {
    search_metadata: {
        id: string
    }

    search_information: {
        organic_results_state: string
        total_results: number
        // menu_items: any[]

        query_displayed?: string
        spelling_fix?: string
        showing_results_for?: string
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
    // local_results: { places: any[] }
    knowledge_graph: {}
    // inline_images: any[]
    // related_questions: any[]
    organic_results: OrganicResult[]
}

export interface OrganicResult {
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

export interface RecipeResult {
    title: string
    link: string
    source: string
    rating: number
    reviews: number
    total_time: string
    ingredients: any[]
    thumbnail: string
}

export interface ImageResult {
    position: number
    thumbnail: string
    related_content_id: string
    serpapi_related_content_link: string
    source: string
    title: string
    link: string
    original: string
    original_width: number
    original_height: number
    is_product: boolean
}

export type SearchResponseWithImages = SearchResponse & { images_results: ImageResult[] }
