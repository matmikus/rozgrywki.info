require('dotenv').config();
const colors = require('vuetify/es5/util/colors').default;

module.exports = {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/apollo'
    ],
    axios: {
        retry: { retries: 3 }
    },
    auth: {
        redirect: {
            login: '/',
            logout: '/',
            callback: '/zaloguj'
        },
        strategies: {
            local: false,
            auth0: {
                domain: process.env.AUTH0_DOMAIN,
                client_id: process.env.AUTH0_CLIENT_ID,
                audience: process.env.AUTH0_AUDIANCE
            }
        }
    },
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: process.env.GRAPHQL_ENDPOINT,
                httpLinkOptions: {
                    credentials: 'same-origin'
                },
                tokenName: 'authToken'
            }
        },
        authenticationType: ''
    },
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
            config.node = {
                fs: 'empty'
            }
        }
    },
    env: {
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    },
    serverMiddleware: [
        'redirect-ssl',
        { path: '/api', handler: '~/api/public.js' },
        { path: '/protected-api', handler: '~/api/protected.js' }
    ],
    router: {
        middleware: 'authorizationGraphQL'
    }
};
