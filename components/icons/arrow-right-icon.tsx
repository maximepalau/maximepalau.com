import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ArrowRightIconProps = {
    color?: string
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ArrowRightIcon: FunctionComponent<ArrowRightIconProps> = ({
    color = 'currentColor',
    width = 13,
    height = 14,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            width={width}
            height={height}
            className={`icon ${className}`}
            viewBox='0 0 13 14'
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <path
                d='M0 7h12M6 1l6 6-6 6'
                stroke={color}
                fill='none'
                fillRule='evenodd' />
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ArrowRightIcon