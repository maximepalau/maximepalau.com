import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type LinkedinIconProps = {
    color?: string
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const LinkedinIcon: FunctionComponent<LinkedinIconProps> = ({
    color = 'currentColor',
    width = 20,
    height = 21,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 20 21'
            className={`icon ${className}`}
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <g fill='none' fillRule='evenodd'>
                <path
                    d='M18.057 0c.748 0 1.366.586 1.436 1.334l.006.142v17.521c0 .768-.573 1.4-1.304 1.471l-.138.007H1.438c-.747 0-1.362-.587-1.431-1.335L0 18.997V1.477C0 .708.571.077 1.3.006L1.438 0h16.619zm-4.52 8c-1.326 0-2.24.722-2.661 1.448l-.07.128h-.04V8.242H8V18h2.883v-4.826c0-1.273.23-2.507 1.731-2.507 1.426 0 1.496 1.35 1.5 2.46V18H17v-5.352C17 10.02 16.46 8 13.537 8zm-7.742-.02h-2.59V18h2.59V7.98zM4.5 3C3.67 3 3 3.809 3 4.806s.67 1.806 1.5 1.806c.828 0 1.5-.81 1.5-1.806C6 3.809 5.328 3 4.5 3z'
                    fill={color}
                />
            </g>
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default LinkedinIcon