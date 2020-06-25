<template>
    <div id="competition-summary-container">summary</div>
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
    #competition-summary-container {

    }
</style>
