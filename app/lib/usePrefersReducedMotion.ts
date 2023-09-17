import { useMatchMedia } from "./useMatchMedia"

export function usePrefersReducedMotion() {
    return useMatchMedia(`(prefers-reduced-motion: reduce)`)
}
