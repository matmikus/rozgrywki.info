<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-center">
            witaj na swoim profilu {{ name }}, masz id {{ id }}
        </v-flex>
    </v-layout>
</template>

<script>
    import helpers from '../client/helpers';
    import UniversalLoader from '../components/UniversalLoader';
    import fetchUserSettings from '../api/graphql-queries/fetchUserSettings.gql';

    export default {
        middleware: ['auth'],
        data () {
            return {
                loaded: false,
                id: '',
                name: '',
                userSettings: {}
            }
        },
        mounted () {
            this.id = helpers.getIdFromAuth0UserSub(this.$auth.user.sub);
            this.name = this.$auth.user ? this.$auth.user.name : '';
        },
        components: {
            UniversalLoader
        },
        apollo: {
            fetchedUserSettings: {
                prefetch: true,
                query: fetchUserSettings
            }
        },
        watch: {
            fetchedUserSettings: function () {
                if (this.fetchedUserSettings !== undefined) {
                    if (this.fetchedUserSettings.length === 1) {
                        for (let setting in this.fetchedUserSettings[0].settings) {
                            this.userSettings[setting] = this.fetchedUserSettings[0].settings[setting];
                        }
                    }

                    this.loaded = true;
                }
            }
        }
    }
</script>