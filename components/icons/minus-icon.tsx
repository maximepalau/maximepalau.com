import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type MinusIconProps = {
    color?: string
    width?: number
    height?: number
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const MinusIcon: FunctionComponent<MinusIconProps> = ({
    color = 'currentColor',
    width = 12,
    height = 2,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            className={`icon ${className}`}
            style={{ width: `${width / 10}rem`, height: `${height / 10}rem` }}
            viewBox='0 0 12 2'
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <path
                d='M1 1h10'
                stroke={color}
                fill='none'
                fillRule='evenodd'
                strokeLinecap='square'
            />
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default MinusIcon