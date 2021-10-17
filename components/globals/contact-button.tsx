import React, { FunctionComponent, useState, useEffect } from 'react'

import ChoicesButton from '@/components/triggers/choices-button'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type ContactButtonProps = {
    email: string
    linkedinUrl?: string | null
    id?: string
}

/* ========================================================================= */
/* Hook(s) */
/* ========================================================================= */

/**
 * Provides an interface to manage the user’s clipboards.
 */
const useClipboard = () => {
    const [ isClipboardSupported, setIsClipboardSupported ] = useState(false)

    useEffect(() => {
        navigator?.permissions
            ?.query({ name: 'clipboard-write' })
            ?.then(result => {
                if (result.state === 'granted' || result.state === 'prompt') {
                    setIsClipboardSupported(true)
                }
            })
    }, [])

    const write = (value: string, onSuccess?: () => void, onFailure?: () => void) => {
        if (!isClipboardSupported) {
            onFailure?.()
        }

        navigator.clipboard.writeText(value).then(onSuccess, onFailure)
    }

    return { write, isSupported: isClipboardSupported }
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

/**
 * 1. Adds the copy email option if supported.
 * 2. Adds the LinkedIn link if provided.
 */
const ContactButton: FunctionComponent<ContactButtonProps> = ({ email, linkedinUrl, id }) => {
    const { write: writeOnClipboard, isSupported: isClipboardSupported } = useClipboard()
    const [ isCopied, setIsCopied ] = useState(false)
    const choices = []

    /* [1] */
    if (isClipboardSupported) {
        choices.push({ label:
            isCopied ? 'Copied!' : 'Copy email address',
            callback: () => (writeOnClipboard(email || ''), setIsCopied(true)),
        })
    }

    /* [2] */
    if (linkedinUrl) {
        choices.push({ label:
            'Contact me on LinkedIn',
            callback: () => open(linkedinUrl, '_blank')?.focus()
        })
    }

    useEffect(() => {
        isCopied && setTimeout(() => setIsCopied(false), 1500)
    }, [ isCopied ])

    return (
        <address>
            <ChoicesButton
                as='a'
                href={`mailto:${email}`}
                choices={choices}
                id={id}>
                Send me an email
            </ChoicesButton>
        </address>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default ContactButton