const express = require('express')
const sslRedirect = require('heroku-ssl-redirect');
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)
    
    const { host, port } = nuxt.options.server
    
    await nuxt.ready()
    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }
    
    // Force change req to https
    app.use(sslRedirect());
    // Give nuxt middleware to express
    app.use(nuxt.render)
    
    // Listen the server
    const PORT = process.env.PORT || port || 3000;
    app.listen(PORT, host)
    consola.ready({
        message: `Server listening on http://${host}:${PORT}`,
        badge: true
    })
}

start()
