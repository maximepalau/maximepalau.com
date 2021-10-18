import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type GithubIconProps = {
    color?: string
    width?: number
    height?: number
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const GithubIcon: FunctionComponent<GithubIconProps> = ({
    color = 'currentColor',
    width = 22,
    height = 21,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            className={`icon ${className}`}
            style={{ width: `${width / 10}rem`, height: `${height / 10}rem` }}
            viewBox='0 0 22 21'
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <path
                d='M.25 10.766c0 4.756 3.08 8.792 7.352 10.215.537.1.734-.233.734-.517 0-.257-.01-1.105-.015-2.005-2.99.651-3.621-1.27-3.621-1.27-.49-1.244-1.194-1.575-1.194-1.575-.975-.668.074-.655.074-.655 1.08.076 1.648 1.11 1.648 1.11.958 1.646 2.514 1.17 3.128.895.096-.696.375-1.171.682-1.44-2.387-.272-4.897-1.195-4.897-5.32 0-1.176.42-2.136 1.107-2.89-.111-.271-.48-1.366.104-2.85 0 0 .903-.289 2.957 1.104A10.29 10.29 0 0111 5.206c.914.004 1.834.124 2.693.362 2.052-1.393 2.953-1.103 2.953-1.103.586 1.483.217 2.578.106 2.849.69.754 1.106 1.714 1.106 2.89 0 4.135-2.515 5.045-4.908 5.312.385.334.729.989.729 1.993 0 1.44-.013 2.6-.013 2.955 0 .286.194.622.739.516a10.766 10.766 0 007.345-10.214C21.75 4.82 16.937 0 11 0 5.064 0 .25 4.82.25 10.766z'
                fill={color}
                fillRule='evenodd' />
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default GithubIcon