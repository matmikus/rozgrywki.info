<template>
    <div id="login-container">
        <div>logowanie</div>
    </div>
</template>

<script lang="ts">
    export default {
        layout: 'simple',
        mounted () {
            this.$auth.loginWith('google');
        }
    };
</script>

<style lang="scss">
    #login-container {
        padding-top: 56px;
    }
</style>
