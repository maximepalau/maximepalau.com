import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ArrowDownIconProps = {
    color?: string
    width?: number
    height?: number
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ArrowDownIcon: FunctionComponent<ArrowDownIconProps> = ({
    color = 'currentColor',
    width = 14,
    height = 13,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            className={`icon ${className}`}
            style={{ width: `${width / 10}rem`, height: `${height / 10}rem` }}
            viewBox='0 0 14 13'
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <path
                d='M7 0v12m6-6l-6 6-6-6'
                stroke={color}
                fill='none'
                fillRule='evenodd' />
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ArrowDownIcon