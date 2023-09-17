import { useEffect, useState } from "react"

export function useMatchMedia(query: string): boolean {
    let [matches, setMatches] = useState(false)

    useEffect(() => {
        let matchMedia = window.matchMedia(query)

        function change(event: MediaQueryListEvent) {
            setMatches(event.matches)
        }

        matchMedia.addEventListener("change", change)
        return () => matchMedia.removeEventListener("change", change)
    })

    return matches
}
