import type { Config } from "tailwindcss"
import forms from "@tailwindcss/forms"

export default {
    content: ["./app/**/*.tsx"],
    theme: {},
    plugins: [forms()],
    darkMode: "media",
} satisfies Config
