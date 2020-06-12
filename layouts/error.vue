<template>
    <div class="layout-container">
        <app-header></app-header>
        <div id="error-container">Błąd!!!!!!</div>
    </div>
</template>

<script lang="ts">
    import appHeader from '@/components/DefaultHeader.vue';

    export default {
        components: { appHeader }
    };
</script>

<style lang="scss">
    #error-container {
        min-height: 100%;
        padding-top: 56px;
        box-sizing: border-box;
        color: var(--content-txt-color);
        background-color: var(--content-bg-color);

        p {
            padding: 16px;
        }
    }
</style>
