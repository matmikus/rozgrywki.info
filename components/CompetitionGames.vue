<template>
    <div id="competition-games-container">games</div>
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
    #competition-games-container {

    }
</style>
