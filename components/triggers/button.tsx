import React, { ElementType, ComponentPropsWithoutRef } from 'react'

import { checkExternalLink } from '@/helpers/location'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

interface Props<C extends ElementType> {
    as?: C
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
    className = 'button button--outline button--in-flow button-reset',
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

    return (
        <Component
            className={`type-style-6 ${className}`}
            {...defaultAttributes}
            {...remainingProps} />
    )
}

/* ========================================================================= */
/* Typing and export(s) */
/* ========================================================================= */

export default Button
