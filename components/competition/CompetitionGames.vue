<template>
    <div id="competition-games-container">
        <div v-for="stage in competition.stages" :key="stage.id" class="stage">
            <div v-for="container in stage.containers" :key="container.id" class="container">
                <div class="container-name" v-show="container.name">
                    <span>
                        <component :is="container.type === 'cup' ? 'cupIcon' : 'rankingIcon'"
                                   class="container-icon"></component>
                        <span class="container-name-text">{{ container.name }}</span>
                    </span>
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
                                    <div v-html="getCompetitorName(game.aCompetitor)"></div>
                                    <div v-html="getCompetitorName(game.bCompetitor)"></div>
                                </div>
                            </td>
                            <td>
                                <div class="game-score"
                                     v-if="game.aResult != null && game.bResult != null">{{
                                    `${game.aResult}:${game.bResult}` }}
                                </div>
                            </td>
                            <td>
                                <div class="game-details"
                                     v-if="game.date || (game.aResult != null && game.bResult != null && game.details)">
                                    <div class="score-details" :style="{ height: game.aResult != null && game.bResult != null && game.details ? '100%' : '0' }">
                                        {{ game.aResult != null && game.bResult != null &&
                                        game.details ?
                                        `${game.aResult}:${game.bResult}` : '' }}
                                        {{ game.details ? ` (${game.details})` : '' }}
                                    </div>
                                    <div class="game-date" :style="{ height: game.date ? '100%' : '0' }">
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
    import cupIcon from '@/assets/icons/graph.svg';
    import rankingIcon from '@/assets/icons/format_list_numbered.svg';

    export default {
        components: { cupIcon, rankingIcon },
        computed: {
            competition () {
                return this.$store.state.competition;
            }
        },
        methods: {
            getCompetitorName (competitorObj: { name: String } | null) {
                return (competitorObj && competitorObj.name) || '&nbsp;';
            }
        }
    };
</script>

<style lang="scss">
    #competition-games-container {
        display: inline-block;
        overflow-x: hidden;

        .container-name {
            opacity: 0.5;
            padding-left: 8px;
            padding-bottom: 4px;
            font-weight: bolder;
            height: 24px;
        }

        .container-icon {
            opacity: 0.6;
            fill: var(--content-txt-color);
            width: 18px;
            height: 18px;
        }

        .container-name > span {
            position: absolute;
            display: flex;
            align-items: center;
        }

        .container-name-text {
            padding-left: 8px;
            padding-top: 2px;
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
            font-family: 'Gudea';
        }

        .game-score {
            padding: 0 16px;
            font-family: 'Gudea';
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

        .data-row td {
            background-color: var(--content-row-bg-color);
        }

        .data-row td:first-child {
            border-top-left-radius: $data-row-border-radius;
            border-bottom-left-radius: $data-row-border-radius;
        }

        .data-row td:last-child {
            border-top-right-radius: $data-row-border-radius;
            border-bottom-right-radius: $data-row-border-radius;
        }

        .game-date {
            opacity: 0.5;
            font-size: 90%;
            line-height: 1.3;
            text-align: left;
            padding-right: 8px;
            display: flex;
            align-items: center;
        }

        .score-details {
            opacity: 0.5;
            text-align: left;
            padding-right: 8px;
            display: flex;
            align-items: center;
            font-family: 'Gudea';
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
