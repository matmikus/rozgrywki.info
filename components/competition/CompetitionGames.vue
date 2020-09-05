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
                            <td class="game-number">#{{ game.number }}</td>
                            <td class="game-competitors">{{ `${getCompetitorName(game.aCompetitor)} - ${getCompetitorName(game.bCompetitor)}` }}</td>
                            <td>
                                <div class="game-result" v-if="game.aResult != null && game.bResult != null">
                                    {{ `${game.aResult}:${game.bResult}` }}
                                </div>
                            </td>
                            <td>
                                <div class="game-date" v-if="game.date">{{ game.date }}</div>
                            </td>
                            <td>
                                <div class="game-details" v-if="game.aResult != null && game.bResult != null && game.details">
                                    {{ `${game.aResult}:${game.bResult}` }}
                                    {{ game.details ? ` (${game.details})` : '' }}
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
        props: ['mode'],
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
    };
</script>

<style lang="scss">
    #competition-games-container {
        display: inline-block;
        overflow-x: hidden;

        .container-name {
            padding-bottom: 8px;
            padding-left: 4px;
            font-weight: 500;
            height: 24px;
            line-height: 19px;
            color: var(--content1-color);
            text-transform: uppercase;
        }

        .container-name-text {
            position: absolute;
            display: flex;
            align-items: center;
        }

        .container:not(:last-child), .stage:not(:last-child) {
            margin-bottom: 32px;
        }

        .data-table {
            border-collapse: separate;
            background-color: var(--bg1-color);
            border-radius: $data-row-border-radius;
        }

        .data-row {
            white-space: nowrap;
        }

        .data-row:not(:last-child) > td {
            border-bottom: 1px solid var(--content-divider-color);
        }

        .game-number {
            padding: 16px 18px;
            font-weight: 500;
            line-height: 19px;
            color: var(--content4-color);
        }

        .game-competitors {
            padding: 16px 18px;
            line-height: 19px;
            color: var(--content1-color);
        }

        .game-result {
            padding: 16px 18px;
            font-weight: 500;
            font-size: 125%;
            line-height: 23px;
            color: var(--content2-color);
        }

        .game-date {
            padding: 16px 18px;
            line-height: 19px;
            color: var(--content1-color);
        }

        .game-details {
            padding: 16px 18px;
            line-height: 19px;
            color: var(--content1-color);
        }

        @media (max-width: 1000px) {
            max-width: calc(100vw - 95px);

            .container {
                overflow-x: auto;
                padding: 0 16px;
            }
        }

        @media not all and (orientation: landscape) {
            max-width: calc(100vw - 16px);
        }

        @media (max-width: 700px) {
            max-width: 100vw;
        }
    }
</style>
