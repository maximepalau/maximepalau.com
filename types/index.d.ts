import 'react'

// declare module 'react' {
//     interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//         inert?: string
//     }
// }

declare module 'react' {
    export interface HTMLAttributes<T> {
        inert?: string
    }
}