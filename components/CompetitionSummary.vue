<template>
    <div id="competition-summary-container">
        <div v-for="stage in competition.stages" class="stage">
            <div v-for="container in stage.containers" class="container">
                tutaj będzie {{ container.type === 'cup' ? 'drabinka' : 'tabela' }} {{
                container.name }}
            </div>
        </div>
    </div>
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
        @media (max-width: 1000px) {
            .container {
                padding: 0 16px;

            }
        }
    }
</style>
