import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ArrowTopIconProps = {
    color?: string
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ArrowTopIcon: FunctionComponent<ArrowTopIconProps> = ({
    color = 'currentColor',
    width = 14,
    height = 13,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            width={width}
            height={height}
            className={`icon ${className}`}
            viewBox='0 0 14 13'
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <path
                d='M7 13V1M1 7l6-6 6 6'
                stroke={color}
                fill='none'
                fillRule='evenodd' />
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ArrowTopIcon