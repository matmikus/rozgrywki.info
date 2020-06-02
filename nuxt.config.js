require('dotenv')
.config({ path: '.env' });

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
        'vue-social-sharing/nuxt',
        'nuxt-svg-loader',
        [
            'nuxt-i18n',
            {
                strategy: 'no_prefix',
                locales: [
                    {
                        code: 'pl',
                        file: 'pl.js'
                    },
                    {
                        code: 'en',
                        file: 'en.js'
                    }
                ],
                langDir: 'lang/'
            }
        ]
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
            families: ['Syncopate:400,700', 'Roboto Condensed:300,400', 'Roboto Mono', 'Roboto:300,400,500,700'],
            urls: [
                'https://fonts.googleapis.com/css?family=Syncopate:400,700&display=swap',
                'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400&display=swap',
                'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap',
                'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
            ]
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
