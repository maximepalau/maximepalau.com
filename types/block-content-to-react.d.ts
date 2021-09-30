import BlockContent from './block-content'

declare module '@sanity/block-content-to-react' {
    import * as React from 'react'

    export const BlockContentProps = BlockContent

    /** React component for transforming Sanity block content to React components */
    export default function BlockContent(props: BlockContentProps): JSX.Element
}