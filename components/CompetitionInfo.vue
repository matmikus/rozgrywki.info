<template>
    <div id="competition-info-container">info</div>
</template>

<script lang="ts">
    export default {
        computed: {
            competition () {
                return this.$store.state.competition;
            }
        }
    }
</script>

<style lang="scss">
    #competition-info-container {

    }
</style>
