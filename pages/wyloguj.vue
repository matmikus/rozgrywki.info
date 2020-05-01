<template>
    <v-layout>
        <v-flex class="text-center">
            <universal-loader />
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import UniversalLoader from '../components/UniversalLoader.vue';

    export default {
        mounted () {
            this.$auth.logout();
            // obejście buga który loguje ostatniego użytkownika z automatu przy natępnej próbie
            // https://github.com/nuxt-community/auth-module/issues/375
            const fakeButton = document.createElement('a');
            fakeButton.href = `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${window.location.origin}`;
            fakeButton.click();
        },
        components: {
            UniversalLoader
        }
    }
</script>