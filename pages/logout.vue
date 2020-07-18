<template>
    <index-component></index-component>
</template>

<script lang="ts">
    import indexComponent from '@/pages/index.vue';

    export default {
        layout: 'simple',
        components: { indexComponent },
        mounted () {
            const loginGreetings = this.$cookies.get('nuxt-login-greetings');

            if (loginGreetings) {
                this.$store.dispatch('showSnackbar', { message: 'Wylogowano pomyślnie. Do zobaczenia!' });
                this.$cookies.remove('nuxt-login-greetings');
            }
        }
    };
</script>
