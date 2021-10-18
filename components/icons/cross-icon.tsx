import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type CrossIconProps = {
    color?: string
    width?: number
    height?: number
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const CrossIcon: FunctionComponent<CrossIconProps> = ({
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
            <g
                stroke={color}
                strokeWidth={1}
                fill='none'
                fillRule='evenodd'
                strokeLinecap='square'>
                <path d='M2.114 1.614l17.772 17.772M2.114 19.386L19.886 1.614' />
            </g>
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default CrossIcon