<template>
    <div class="layout-container">
        <app-header></app-header>
        <nuxt/>
    </div>
</template>

<script lang="ts">
    import appHeader from '@/components/DefaultHeader.vue';

    export default {
        components: { appHeader }
    };
</script>
