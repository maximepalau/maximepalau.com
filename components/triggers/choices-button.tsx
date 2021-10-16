import React, { ElementType, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { checkExternalLink } from '@/helpers/location'

import PlusIcon from '@/components/icons/plus-icon'
import MinusIcon from '@/components/icons/minus-icon'

import styles from './styles/choices-button.module.scss'
import { useKeyboard } from '@/hooks/events'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

interface Props<C extends ElementType> {
    as?: C
    variant?: 'default' | 'arrow'
    choices?: {
        label: string
        callback: () => void
    }[]
    isReverted: boolean
}

type ChoicesButtonProps<C extends ElementType> = Props<C> & Omit<ComponentPropsWithoutRef<C>, keyof Props<C>>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

/**
 * 1. Generates default attributes based on the button type and link location.
 */
const ChoicesButton = <C extends ElementType = 'button'> ({
    as,
    variant = 'default',
    className = 'button button--outline',
    choices,
    id,
    isReverted = false,
    ...remainingProps
}: ChoicesButtonProps<C>) => {
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
            !remainingProps.href && console.warn('Missing href attribute on <ChoicesButton> component.')
        }
    }

    const [ isOpen, setIsOpen ] = useState(false)
    const toggleRef = useRef<HTMLButtonElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    useKeyboard({
        'Escape': () => isOpen && toggleRef.current?.focus({ preventScroll: true })
    })

    return (
        <div className={`${styles.container}`}>
            <Component
                className={`${styles.button} type-style-6 ${className}`}
                id={id}
                {...defaultAttributes}
                {...remainingProps} />
            {choices && choices?.length > 0 && (
                <>
                    <div className={`${styles.toggleWrapper}`}>
                        <button
                            aria-label={isOpen ? 'Collapse options' : 'Expand options'}
                            aria-pressed={isOpen ? 'true' : 'false'}
                            className={`${styles.toggle} ${isOpen ? styles.toggleDisabled : ''} show-focus`}
                            onClick={() => listRef.current?.focus({ preventScroll: true })}
                            ref={toggleRef}
                            tabIndex={-1}
                            type='button'>
                            {isOpen ? (
                                <MinusIcon />
                            ) : (
                                <PlusIcon />
                            )}
                        </button>
                    </div>
                    <ul
                        className={`${styles.list} list-reset show-focus ${isReverted ? 'inverted-text-color inverted-background-color' : 'default-text-color default-background-color'}`}
                        onFocusCapture={() => setIsOpen(true)}
                        onBlurCapture={() => setIsOpen(false)}
                        ref={listRef}
                        tabIndex={-1}>
                        {choices.map(({ label, callback }, idx) => (
                            <li
                                className={`${styles.listItem}`}
                                key={`${id || ''}-choices-button-${idx}`}>
                                <button
                                    className={`${styles.listButton} type-style-6`}
                                    onClick={callback}
                                    type='button'>
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

/* ========================================================================= */
/* Typing and export(s) */
/* ========================================================================= */

export default ChoicesButton
