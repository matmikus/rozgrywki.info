<template>
    <div class="layout-container">
        <app-header></app-header>
        <nuxt/>
        <actionDialog></actionDialog>
        <snackbar></snackbar>
    </div>
</template>

<script lang="ts">
    import appHeader from '@/components/header/DefaultHeader.vue';
    import actionDialog from '@/components/ActionDialog.vue';
    import snackbar from '@/components/Snackbar.vue';

    export default {
        components: { appHeader, actionDialog, snackbar },
        middleware: 'cookieInfo',
        mounted () {
            document.title = 'rozgrywki.info';
        }
    };
</script>
