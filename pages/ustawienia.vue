<template>
    <v-layout>
        <universal-loader v-if="!loaded" />
        <v-flex v-if="loaded" class="text-center">
            witaj na swoim profilu {{ name }}, masz id {{ id }}
        </v-flex>
    </v-layout>
</template>

<script>
    import helpers from '../client/helpers';
    import UniversalLoader from '../components/UniversalLoader';
    import userSettings from '../api/graphql-queries/fetchUserSettings.gql';

    export default {
        middleware: ['auth'],
        data () {
            return {
                loaded: false,
                id: '',
                name: ''
            }
        },
        mounted () {
            this.id = helpers.getIdFromAuth0UserSub(this.$auth.user.sub);
            this.name = this.$auth.user ? this.$auth.user.name : '';
            this.loaded = true;
        },
        components: {
            UniversalLoader
        },
        apollo: {
            settings: {
                prefetch: true,
                query: userSettings
            }
        },
        watch: {
            userSettings: function () {
                if (this.userSettings !== undefined) {
                    console.log(this.userSettings)
                }
            }
        }
    }
</script>