import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type TwitterIconProps = {
    color?: string
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const TwitterIcon: FunctionComponent<TwitterIconProps> = ({
    color = 'currentColor',
    width = 22,
    height = 18,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 22 18'
            className={`icon ${className}`}
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <path
                d='M6.919 18C15.22 18 19.76 11.074 19.76 5.068c0-.196 0-.392-.013-.587A9.22 9.22 0 0022 2.128a8.961 8.961 0 01-2.593.715A4.555 4.555 0 0021.392.33a9.007 9.007 0 01-2.866 1.104 4.49 4.49 0 00-5.423-.894A4.537 4.537 0 0011.12 2.67a4.578 4.578 0 00-.286 2.907c-1.795-.09-3.55-.56-5.153-1.378A12.832 12.832 0 011.531.83a4.576 4.576 0 00-.494 3.311 4.549 4.549 0 001.892 2.755A4.456 4.456 0 01.88 6.327v.058c0 1.05.361 2.066 1.021 2.878a4.51 4.51 0 002.6 1.577 4.477 4.477 0 01-2.038.078 4.55 4.55 0 001.606 2.26c.756.565 1.67.879 2.611.897A9.017 9.017 0 010 15.958a12.715 12.715 0 006.919 2.038'
                fill={color}
                fillRule='nonzero'
                />
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default TwitterIcon