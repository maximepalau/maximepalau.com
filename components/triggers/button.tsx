import React, { ElementType, ComponentPropsWithoutRef } from 'react'

import { checkExternalLink } from '@/helpers/location'
import ArrowRightIcon from '../icons/arrow-right-icon'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

interface Props<C extends ElementType> {
    as?: C
    variant?: 'outline' | 'outline-arrow'
}

type ButtonProps<C extends ElementType> = Props<C> & Omit<ComponentPropsWithoutRef<C>, keyof Props<C>>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

/**
 * 1. Generates default attributes based on the button type and link location.
 */
const Button = <C extends ElementType = 'button'> ({
    as,
    className = 'button--in-flow',
    children,
    variant = 'outline',
    ...remainingProps
}: ButtonProps<C>) => {
    const defaultAttributes = {} as ComponentPropsWithoutRef<C>
    const Component = as || 'button'

    /* [1] */
    if (Component === 'button') {
        defaultAttributes.type = 'button'
    } else if (Component === 'a') {
        const isExternalLink = checkExternalLink(remainingProps.href)

        if (remainingProps.href && isExternalLink) {
            defaultAttributes.target = '_blank'
            defaultAttributes.rel = 'noopener noreferrer'
        } else {
            !remainingProps.href && console.warn('Missing href attribute on <Button> component.')
        }
    }

    const buttonClassName = 'button-reset button button--outline'

    return (
        <Component
            className={`type-style-6 ${buttonClassName} ${className}`}
            {...defaultAttributes}
            {...remainingProps}>
            {children}
            {variant === 'outline-arrow' && (
                <span className='button__arrow-icon'>
                    <ArrowRightIcon />
                </span>
            )}
        </Component>
    )
}

/* ========================================================================= */
/* Typing and export(s) */
/* ========================================================================= */

export default Button
