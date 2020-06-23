<template>
    <div id="error-container">
        <div>Wystąpił błąd :(</div>
    </div>
</template>

<script lang="ts">
    export default {
        layout: 'simple'
    };
</script>

<style lang="scss">
    #error-container {
        min-height: 100%;
        padding-top: 56px;
        box-sizing: border-box;
        color: var(--content-txt-color);
        background-color: var(--content-bg-color);

        div {
            margin: 32px;
            text-align: center;
        }
    }
</style>
