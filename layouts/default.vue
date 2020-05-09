<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer
            v-model="rightDrawer"
            :right="right"
            temporary
            fixed
        >
            <v-list>
                <v-list-item
                    v-if="!$auth.loggedIn"
                    @click="$auth.login()"
                >
                    <v-list-item-action>
                        <v-icon>{{ 'mdi-account' }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logowanie</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-if="!$auth.loggedIn"
                    @click="$auth.login()"
                >
                    <v-list-item-action>
                        <v-icon>{{ 'mdi-account-plus' }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Nowe konto</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-if="$auth.loggedIn"
                    to="/moje"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ 'mdi-view-list' }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Moje rozgrywki</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-if="$auth.loggedIn"
                    to="/obserwowane"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ 'mdi-star' }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Obserwowane</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-if="$auth.loggedIn"
                    to="/ustawienia"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ 'mdi-account-cog' }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Ustawienia</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-if="$auth.loggedIn"
                    to="/wyloguj"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ 'mdi-exit-run' }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Wyloguj</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            :clipped-left="clipped"
            fixed
            app
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title v-text="title"/>
            <v-spacer/>
            <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-footer
            :fixed="fixed"
            app
        >
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        data () {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                items: [
                    {
                        icon: 'mdi-apps',
                        title: 'Pulpit',
                        to: '/'
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: 'Rozgrywki',
                        to: '/rozgrywki'
                    },
                    {
                        icon: 'mdi-text-subject',
                        title: 'Aktualności',
                        to: '/aktualnosci'
                    },
                    {
                        icon: 'mdi-help',
                        title: 'Pomoc',
                        to: '/pomoc'
                    },
                    {
                        icon: 'mdi-email',
                        title: 'Kontakt',
                        to: '/kontakt'
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'rozgrywki🏐info'
            };
        }
    };
</script>

<style>
    html {
        overflow: auto;
    }
</style>
