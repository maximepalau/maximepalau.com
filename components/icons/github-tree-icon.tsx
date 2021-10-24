import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'

/* ========================================================================= */
/* Type(s) */
/* ========================================================================= */

type GithubTreeIconProps = {
    color?: string
    backgroundColor?: string
    width?: number
    height?: number
} & ComponentPropsWithoutRef<'svg'>

/* ========================================================================= */
/* Component(s) */
/* ========================================================================= */

const GithubTreeIcon: FunctionComponent<GithubTreeIconProps> = ({
    color = 'currentColor',
    backgroundColor = '#1A1A1A',
    width = 184,
    height = 403,
    className = '',
    ...remainingProps
}) => {

    return (
        <svg
            className={`icon ${className}`}
            style={{ width: `${width / 10}rem`, height: `${height / 10}rem` }}
            viewBox='0 0 184 403'
            xmlns='http://www.w3.org/2000/svg'
            {...remainingProps}>
            <g transform='translate(2 .546)' fill='none' fillRule='evenodd'>
                <circle
                    stroke={color}
                    strokeWidth={3}
                    fill={backgroundColor}
                    cx={37}
                    cy={152.454}
                    r={37} />
                <path
                    d='M38.215 190.052v35c0 11.046 8.955 20 20 20h31.267c11.045 0 20 8.955 20 20v137h0M180.482 1.036v39.67c0 11.046-8.955 20-20 20h-31.267c-11.045 0-20 8.955-20 20v150.33h0M109.482 290.248L109.5.954'
                    stroke={color}
                    strokeWidth={3} />
                <circle
                    stroke={color}
                    strokeWidth={2}
                    fill={backgroundColor}
                    cx={109.167}
                    cy={257.454}
                    r={6} />
                <circle
                    stroke={color}
                    strokeWidth={2}
                    fill={backgroundColor}
                    cx={109.167}
                    cy={73.454}
                    r={6} />
                <path
                    d='M6 152.726c0 13.817 8.883 25.539 21.2 29.674 1.55.29 2.118-.679 2.118-1.505 0-.745-.029-3.209-.042-5.822-8.624 1.892-10.444-3.69-10.444-3.69-1.41-3.614-3.442-4.575-3.442-4.575-2.813-1.941.212-1.901.212-1.901 3.113.22 4.752 3.222 4.752 3.222 2.765 4.781 7.252 3.399 9.02 2.6.28-2.021 1.083-3.4 1.97-4.182-6.886-.79-14.125-3.472-14.125-15.455 0-3.414 1.211-6.203 3.194-8.393-.322-.788-1.383-3.969.3-8.276 0 0 2.604-.84 8.528 3.205 2.473-.693 5.125-1.04 7.76-1.052 2.634.012 5.288.36 7.765 1.052 5.917-4.046 8.517-3.205 8.517-3.205 1.687 4.307.626 7.488.304 8.276 1.987 2.19 3.19 4.98 3.19 8.393 0 12.012-7.252 14.656-14.155 15.43 1.112.97 2.103 2.874 2.103 5.792 0 4.184-.036 7.551-.036 8.581 0 .833.558 1.808 2.13 1.5C59.128 178.257 68 166.539 68 152.726c0-17.27-13.88-31.271-31-31.271-17.118 0-31 14-31 31.272z'
                    fill={color} />
            </g>
        </svg>
    )
}

/* ========================================================================= */
/* Export(s) */
/* ========================================================================= */

export default GithubTreeIcon