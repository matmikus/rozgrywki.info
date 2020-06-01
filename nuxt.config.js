require('dotenv').config({ path: '.env' });

module.exports = {
    mode: 'universal',
    head: {
        titleTemplate: `%s - ${process.env.npm_package_name}`,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },
    loading: { color: '#fff' },
    css: [],
    plugins: [],
    buildModules: [
        '@nuxt/typescript-build'
    ],
    modules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/auth',
        '@nuxtjs/apollo',
        'nuxt-webfontloader',
        '@nuxtjs/dayjs',
        'nuxt-helmet',
        'vue-social-sharing/nuxt'
    ],
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: process.env.GRAPHQL_ENDPOINT,
                httpLinkOptions: {
                    credentials: 'same-origin'
                },
                tokenName: 'authToken',
                defaultOptions: {
                    $query: {
                        fetchPolicy: 'network-only'
                    }
                }
            }
        },
        authenticationType: ''
    },
    webfontloader: {
        google: {
            families: ['Roboto:300,400,600&display=swap']
        }
    },
    dayjs: {
        locales: ['en', 'pl'],
        defaultLocale: 'pl'
    },
    helmet: {
        /*
        dnsPrefetchControl: true,
        expectCt: true,
        featurePolicy: true,
        frameguard: true,
        hidePoweredBy: true,
        hsts: true,
        ieNoOpen: true,
        noCache: true,
        noSniff: true,
        permittedCrossDomainPolicies: true,
        referrerPolicy: true,
        xssFilter: true,
        */
    },
    build: {
        extend (config) {
            config.node = {
                fs: 'empty'
            };
        },
        watch: ['nuxt.config.js']
    },
    env: {
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
    }
};
