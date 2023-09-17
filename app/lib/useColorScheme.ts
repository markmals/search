import { useMemo } from "react"
import { useMatchMedia } from "./useMatchMedia"

export function useColorScheme(): "dark" | "light" {
    let matches = useMatchMedia(`(prefers-color-scheme: dark)`)
    return useMemo(() => (matches ? "dark" : "light"), [matches])
}
