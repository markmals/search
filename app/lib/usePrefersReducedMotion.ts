import { useMemo } from "react"

export function usePrefersReducedMotion() {
    return useMemo(() => {
        if (globalThis.document) {
            return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
        }

        return false
    }, [])
}
