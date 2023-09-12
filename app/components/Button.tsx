import type { MouseEventHandler, PropsWithChildren } from "react"

export namespace Button {
    export interface Props extends PropsWithChildren {
        type?: "button" | "submit" | "reset"
        onClick?: MouseEventHandler<HTMLButtonElement>
    }
}

export function Button({ type, children, onClick }: Button.Props) {
    return (
        <button
            className="inline-flex w-auto items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    )
}
