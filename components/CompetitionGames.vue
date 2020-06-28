<template>
    <div id="competition-games-container">
        <div v-for="stage in competition.stages" class="stage">
            <div v-for="container in stage.containers" class="container">
                <div class="container-name">
                    <span>{{ container.name }}</span>
                </div>
                <div class="container-games">
                    <div v-for="game in container.games" class="data-row">
                        <div>
                            <div class="game-number">#{{ game.number }}</div>
                        </div>
                        <div class="game-competitors">
                            <div>{{ getCompetitorName(game.aCompetitor) }}</div>
                            <div style="margin-bottom: -2px;">{{ getCompetitorName(game.bCompetitor)
                                }}
                            </div>
                        </div>
                        <div class="game-score">
                            {{ game.aResult && game.bResult ? `${game.aResult}:${game.bResult}` : ''
                            }}
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; align-items: flex-end">
                            <div class="game-details">
                                <span>{{ game.aResult && game.bResult && game.details ? `${game.aResult}:${game.bResult}` : '' }}</span>
                                <span>{{ game.details ? `&nbsp;(${game.details})` : '' }}</span>
                            </div>
                            <div class="game-date">{{ game.date || '' }}</div>
                        </div>
                    </div>
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
        display: inline-block;

        .container-name {
            opacity: 0.5;
            padding-left: 8px;
            font-weight: bolder;
            height: 24px;
        }

        .container-name > span {
            position: absolute;
        }

        .container:not(:last-child), .stage:not(:last-child) {
            margin-bottom: 12px;
        }

        .data-row {
            background-color: var(--content-row-bg-color);
            display: flex;
            padding: 4px 8px;
            flex: 1;
            margin: 2px;
            white-space: nowrap;
        }

        .game-number {
            opacity: 0.5;
            padding-right: 12px;
            min-width: 40px;
        }

        .game-date {
            opacity: 0.5;
            font-size: 90%;
            line-height: 1;
        }

        .game-score {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 8px;
            font-weight: bold;
            font-size: 110%;
            min-width: 100px;
            box-sizing: border-box;
        }

        .game-details {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 24px;
            opacity: 0.5;
        }

        @media (max-width: 1000px) {
            margin: 0 16px;
        }
    }
</style>
