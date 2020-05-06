<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-center">
            witaj na swoim profilu {{ name }}, masz id {{ id }}
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import UniversalLoader from '../components/UniversalLoader.vue';
    import fetchUserSettings from '../api/graphql-queries/fetchUserSettings.graphql';
    // @ts-ignore
    import { getResultObject } from '../client/graphqlHelpers.ts';

    export default {
        middleware: ['auth'],
        data () {
            return {
                loaded: false,
                id: '',
                name: '',
                userSettings: {}
            };
        },
        mounted () {
            this.id = this.$auth.user.sub;
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
            fetchedUserSettings () {
                this.userSettings = getResultObject(this.fetchedUserSettings, 'settings');

                this.loaded = true;
            }
        }
    };
</script>
