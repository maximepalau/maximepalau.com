import React, { ElementType, ComponentPropsWithoutRef } from 'react'
import { useRouter } from 'next/router'

import { checkExternalLink } from '@/helpers/location'
import ArrowRightIcon from '@/components/icons/arrow-right-icon'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

interface Props<C extends ElementType> {
    as?: C
}

type ArrowLinkProps<C extends ElementType> = Props<C> & Omit<ComponentPropsWithoutRef<C>, keyof Props<C>>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const ArrowLink = <C extends ElementType = 'a'> ({
    as,
    className = '',
    children,
    ...remainingProps
}: ArrowLinkProps<C>) => {
    const router = useRouter()
    const defaultAttributes = {} as ComponentPropsWithoutRef<C>
    const Component = as || 'a'

    /* [1] */
    if (Component === 'button') {
        defaultAttributes.type = 'button'
    } else if (Component === 'a') {
        const isExternalLink = checkExternalLink(remainingProps.href)
        console.log({ isExternalLink, router });
        

        if (remainingProps.href && isExternalLink) {
            defaultAttributes.target = '_blank'
            defaultAttributes.rel = 'noopener noreferrer'
        } else {
            !remainingProps.href && console.warn('Missing href attribute on <ArrowLink> component.')
        }
    }

    return (
        <Component
            className={`arrow-link type-style-7 ${className}`}
            {...defaultAttributes}
            {...remainingProps}>
            {children}
            <ArrowRightIcon className='arrow-link__icon' />
        </Component>
    )
}

/* ========================================================================= */
/* Typing and export(s) */
/* ========================================================================= */

export default ArrowLink
