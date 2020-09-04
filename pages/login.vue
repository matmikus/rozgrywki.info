<template>
    <div id="login-container">
        <loader></loader>
    </div>
</template>

<script lang="ts">
    import loader from '@/components/Loader.vue';

    export default {
        layout: 'simple',
        components: { loader }
    };
</script>

<style lang="scss">
    #login-container {
        min-height: 100%;
        padding-top: 56px;
        box-sizing: border-box;
        background-color: var(--bg2-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
