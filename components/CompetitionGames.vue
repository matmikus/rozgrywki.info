<template>
    <div id="competition-games-container">
        <div v-for="stage in competition.stages" :key="stage.id" class="stage">
            <div v-for="container in stage.containers" :key="container.id" class="container">
                <div class="container-name" v-show="container.name">
                    <span>{{ container.name }}</span>
                </div>
                <div class="container-games">
                    <table class="data-table" cellspacing="0">
                        <tr v-for="game in container.games" :key="game.id" class="data-row">
                            <td class="game-number-cell">
                                <div class="game-number">
                                    #{{ game.number }}
                                </div>
                            </td>
                            <td>
                                <div class="game-competitors">
                                    <div class="">{{ getCompetitorName(game.aCompetitor) }}</div>
                                    <div class="">{{ getCompetitorName(game.bCompetitor) }}</div>
                                </div>
                            </td>
                            <td>
                                <div class="game-score">{{ game.aResult != null && game.bResult != null ? `${game.aResult}:${game.bResult}` : '' }}
                                </div>
                            </td>
                            <td>
                                <div class="game-details">
                                    <div class="score-details">
                                        {{ game.aResult != null && game.bResult != null && game.details ?
                                        `${game.aResult}:${game.bResult}` : '' }}
                                        {{ game.details ? ` (${game.details})` : '' }}
                                    </div>
                                    <div class="game-date">
                                        {{ game.date || '' }}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
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
                return (competitorObj && competitorObj.name) || '';
            }
        }
    };
</script>

<style lang="scss">
    #competition-games-container {
        display: inline-block;
        max-width: calc(100vw - 82px);
        overflow-x: hidden;

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

        .game-number-cell {
            vertical-align: top;
        }

        .game-number {
            opacity: 0.5;
            padding: 2px 12px 4px 4px;
        }

        .game-score {
            padding: 0 16px;
            font-weight: bold;
            font-size: 110%;
        }

        .data-table {
            border-collapse: separate;
            border-spacing: 0 2px;
        }

        .data-row {
            padding: 4px 8px;
            white-space: nowrap;
            background-color: var(--content-row-bg-color);
        }

        .game-date {
            opacity: 0.5;
            font-size: 90%;
            line-height: 1.3;
            text-align: right;
            padding-right: 8px;
            padding-bottom: 2px;
        }

        .score-details {
            padding-left: 24px;
            opacity: 0.5;
            text-align: right;
            padding-right: 8px;
        }

        .game-details {
            height: 50px;
            padding-top: 2px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .game-competitors {
            padding-top: 2px;
        }

        @media (max-width: 1000px) {
            .container {
                overflow-x: auto;
                padding: 0 16px;
            }
        }

        @media (max-width: 700px) {
            max-width: 100vw;
        }
    }
</style>
