import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type PlusIconProps = {
    color?: string
    width?: number
    height?: number
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const PlusIcon: FunctionComponent<PlusIconProps> = ({
    color = 'currentColor',
    width = 12,
    height = 12,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            className={`icon ${className}`}
            style={{ width: `${width / 10}rem`, height: `${height / 10}rem` }}
            viewBox='0 0 12 12'
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <g
                stroke={color}
                fill='none'
                fillRule='evenodd'
                strokeLinecap='square'>
                <path d='M1 6h10M6 1v10' />
            </g>
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default PlusIcon