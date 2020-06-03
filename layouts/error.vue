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

        p {
            padding: 16px;
        }
    }

    .dark-mode {
        #error-container {
            color: $text-color-dark;
            background-color: $background-color-dark;
        }
    }

    .light-mode {
        #error-container {
            color: $text-color-light;
            background-color: $background-color-light;
        }
    }
</style>
