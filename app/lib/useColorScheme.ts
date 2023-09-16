import { useMemo } from "react"

export function useColorScheme(): "dark" | "light" {
    return useMemo(() => {
        if (globalThis.document) {
            return window.matchMedia(`(prefers-color-scheme: dark)`).matches ? "dark" : "light"
        }

        return "light"
    }, [])
}
