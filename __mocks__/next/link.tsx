import { ReactElement } from 'react'

interface LinkProps {
    children: ReactElement
}

const Link = (props: LinkProps) => <div>{props.children}</div>

export default Link