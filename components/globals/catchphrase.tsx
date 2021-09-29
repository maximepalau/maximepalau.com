import React, { FunctionComponent } from 'react'

import {
    Catchphrase as CatchphraseType,
} from '@/types/cms'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type CatchphraseProps = CatchphraseType & {}

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const Catchphrase: FunctionComponent<CatchphraseProps> = ({ sentence, author, sourceUrl }) => {

    const content = (
        <figure>
            <blockquote cite={sourceUrl}>
                {sentence}
            </blockquote>
            <figcaption>
                {author}
            </figcaption>
        </figure>
    );

    if (!sourceUrl) {
        return content;
    }

    return (
        <a href={sourceUrl}>
            {content}
        </a>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default Catchphrase