require('dotenv').config({path: '.env'});

module.exports = {
    mode: 'universal',
    head: {
        titleTemplate: 'rozgrywki.info',
        title: '',
        meta: [
            {charset: 'utf-8'},
            {
                name: 'google-signin-client_id',
                content: '535901238693-6eeqd7altqjvlstdokcu4dcv7h902mgb.apps.googleusercontent.com'
            },
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
    loading: {color: '#fff'},
    styleResources: {
        scss: [
            '@/assets/scss/variables.scss',
            '@/assets/scss/global.scss'
        ]
    },
    plugins: [{
        src: '~/plugins/v-tooltip.ts',
        ssr: false
    }],
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/color-mode',
        '@nuxtjs/style-resources'
    ],
    modules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/apollo',
        '@nuxtjs/dayjs',
        'nuxt-webfontloader',
        'nuxt-helmet',
        'vue-social-sharing/nuxt',
        'nuxt-svg-loader',
        'nuxt-clipboard2',
        'cookie-universal-nuxt',
        ['vue-scrollto/nuxt', {
            duration: 500,
            offset: -56
        }],
        [
            'nuxt-i18n',
            {
                strategy: 'no_prefix',
                locales: [
                    {
                        code: 'pl',
                        file: 'pl.js'
                    }
                    // {
                    //     code: 'en',
                    //     file: 'en.js'
                    // }
                ],
                langDir: 'lang/',
                lazy: true
            }
        ]
    ],
    apollo: {
        clientConfigs: {
            default: '~/plugins/apollo-client.js'
        },
        defaultOptions: {
            $query: {
                fetchPolicy: 'no-cache'
            }
        },
        authenticationType: ''
    },
    webfontloader: {
        google: {
            families: ['Roboto Condensed:300,400', 'Roboto Mono', 'Roboto:300,400,500,700', 'Gudea'],
            urls: [
                'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400&display=swap',
                'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap',
                'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
                'https://fonts.googleapis.com/css?family=Gudea&display=swap'
            ]
        }
    },
    colorMode: {
        preference: 'dark',
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        cookie: {
            key: 'nuxt-color-mode'
        }
    },
    dayjs: {
        locales: ['en', 'pl'],
        defaultLocale: 'pl'
    },
    auth: {
        strategies: {
            google: {
                client_id: '535901238693-6eeqd7altqjvlstdokcu4dcv7h902mgb.apps.googleusercontent.com'
            },
            facebook: {
                client_id: '219047915934268',
                userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=name,picture{url},email',
                scope: ['public_profile', 'email']
            }
        },
        redirect: {
            login: '/login',
            logout: '/logout',
            callback: '/login',
            home: '/moje'
        }
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
