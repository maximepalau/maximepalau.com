import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type BurgerIconProps = {
    color?: string
    width?: number
    height?: number
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const BurgerIcon: FunctionComponent<BurgerIconProps> = ({
    color = 'currentColor',
    width = 28,
    height = 14,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            className={`icon ${className}`}
            style={{ width: `${width / 10}rem`, height: `${height / 10}rem` }}
            viewBox='0 0 28 14'
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <g
                stroke={color}
                strokeWidth={1}
                fill='none'
                fillRule='evenodd'
                strokeLinecap='square'>
                <path d='M1 1.5h26M1 12.5h14' />
            </g>
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default BurgerIcon