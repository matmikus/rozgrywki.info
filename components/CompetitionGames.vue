<template>
    <div id="competition-games-container">
        <div v-for="stage in competition.stages" class="stage">
            <div v-for="container in stage.containers" class="container">
                <div>{{ container.name }}</div>
                <div v-for="game in container.games" class="game">
                    {{ game.number }}: {{ getCompetitorName(game.aCompetitor) }} vs {{ getCompetitorName(game.bCompetitor) }} {{ game.aResult && game.bResult ? `${game.aResult}:${game.bResult}` : '' }}
                </div>
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
        },
        methods: {
            getCompetitorName (competitorObj: { name: String } | null) {
                return (competitorObj && competitorObj.name) || '?';
            }
        }
    }
</script>

<style lang="scss">
    #competition-games-container {
        .container:not(:last-child), .stage:not(:last-child) {
            margin-bottom: 12px;
        }
    }
</style>
