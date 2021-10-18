/**
 * Checks whether the provided URL is an external link.
 */
export const checkExternalLink = (url: string | undefined) => !url?.includes(process.env.domain ?? '')