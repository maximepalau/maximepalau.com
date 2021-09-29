import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

/**
 * 1. Initates the server.
 * 2. Attributes the routes and render the matching component.
 */
app.prepare().then(() => {
    /* [1] */
    createServer((req, res) => {
        const parsedUrl = parse(req.url!, true)
        // const { pathname, query } = parsedUrl

        /* [2] */
        // if (pathname === '/episodes') {
        //     app.render(req, res, '/episodes', query)
        // } else if (pathname === '/locations') {
        //     app.render(req, res, '/locations', query)
        // } else {
            handle(req, res, parsedUrl)
        // }
    }).listen(port)

    // tslint:disable-next-line:no-console
    console.log(
        `> Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
        }`
    )
})