import React, { FunctionComponent } from 'react'
import BlockContent from '@sanity/block-content-to-react'

import BlockContentType from '@/types/block-content'

import GithubIcon from '@/components/icons/github-icon'
import LinkedinIcon from '@/components/icons/linkedin-icon'
import TwitterIcon from '@/components/icons/twitter-icon'
import ContactButton from '@/components/globals/contact-button'
import ClosingNote from './closing-note'

import styles from './styles/footer.module.scss'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type FooterProps = {
    heading: string
    text: BlockContentType
    email: string
    globals: {
        githubUrl?: string | null
        linkedinUrl?: string | null
        twitterUrl?: string | null
    }
}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const Footer: FunctionComponent<FooterProps> = ({ heading, text, email, globals }) => {

    return (
        <div className={`dark-mode default-text-color default-background-color`}>
            <div className={`${styles.container}`}>
                <div className={`container`}>
                    {/* Heading */}
                    <h2 className={`${styles.heading} type-style-2`}>
                        {heading}
                    </h2>

                    {/* Text */}
                    {text && (
                        <div className={`${styles.text} type-style-5`}>
                            <BlockContent blocks={text} />
                        </div>
                    )}

                    <div className={`${styles.actions}`}>
                        {/* Contact button */}
                        {email && (
                            <div className={`${styles.action}`}>
                                <ContactButton
                                    email={email}
                                    id='info-contact-contact-button'
                                    linkedinUrl={globals?.linkedinUrl} />
                            </div>
                        )}

                        {/* Social media */}
                        <address
                            aria-label='Social media'
                            className={`${styles.socialMedia}`}>
                            {/* Label */}
                            <p className={`${styles.socialMediaHeading} type-style-7`}>or follow me on:</p>

                            <ul className={`${styles.socialMediaList} list-reset`}>
                                {/* Twitter */}
                                {globals?.twitterUrl && (
                                    <li className={`${styles.socialMediaListItem}`}>
                                        <a
                                            aria-label='Twitter'
                                            className={`${styles.socialMediaListItemLink}`}
                                            href={globals.twitterUrl}>
                                            <TwitterIcon />
                                        </a>
                                    </li>
                                )}

                                {/* LinkedIn */}
                                {globals?.linkedinUrl && (
                                    <li className={`${styles.socialMediaListItem}`}>
                                        <a
                                            aria-label='LinkedIn'
                                            className={`${styles.socialMediaListItemLink}`}
                                            href={globals.linkedinUrl}>
                                            <LinkedinIcon />
                                        </a>
                                    </li>
                                )}

                                {/* Github */}
                                {globals?.githubUrl && (
                                    <li className={`${styles.socialMediaListItem}`}>
                                        <a
                                            aria-label='Github'
                                            className={`${styles.socialMediaListItemLink}`}
                                            href={globals.githubUrl}>
                                            <GithubIcon />
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </address>
                    </div>
                </div>
            </div>

            {/* Marquee */}
            <ClosingNote text='See you soon' />
        </div>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default Footer