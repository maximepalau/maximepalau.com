import React, { ElementType, ComponentPropsWithoutRef } from 'react'
import { useRouter } from 'next/router'

import { checkExternalLink } from '@/helpers/location'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

interface Props<C extends ElementType> {
    as?: C
    variant?: 'default' | 'arrow'
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
    variant = 'default',
    className = '',
    ...remainingProps
}: ButtonProps<C>) => {
    const router = useRouter()
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
            className={`type-style-7 ${className}`}
            {...defaultAttributes}
            {...remainingProps} />
    )
}

/* ========================================================================= */
/* Typing and export(s) */
/* ========================================================================= */

export default Button
