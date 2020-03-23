<template>
    <v-layout>
        <v-flex class="text-center">
            Trwa wylogowanie...
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        mounted () {
            this.$auth.logout();
            // obejście buga który loguje ostatniego użytkownika z automatu przy natępnej próbie
            // https://github.com/nuxt-community/auth-module/issues/375
            const fakeButton = document.createElement('a');
            fakeButton.href = `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000`;
            fakeButton.click();
        }
    }
</script>