<template>
    <div id="competition-summary-container">
        <div v-for="stage in competition.stages" :key="stage.id" class="stage">
            <div v-for="container in stage.containers" :key="container.id" class="container">
                <div class="container-name" v-show="container.name">
                    <span class="container-name-text">{{ container.name }}</span>
                </div>
                <div v-if="isEmpty">Podgląd wygeneruje się po wybraniu parametrów.</div>
                <template v-if="container.type === 'cup'">
                    <div v-html="getCupHtmlVisualization(container)">
                    </div>
                </template>
                <template v-if="container.type === 'group'">
                    <table class="data-table" cellspacing="0">
                        <tr>
                            <th class="rank-th rank-number-th"><span>Miejsce</span></th>
                            <th class="rank-th rank-competitor-th"><span>Drużyna</span></th>
                            <th class="rank-th"><span>Mecze</span></th>
                            <th class="rank-th"><span>Punkty</span></th>
                            <th class="rank-th"><span>Bilans meczy</span></th>
                            <th class="rank-th"><span>Bilans wyników</span></th>
                        </tr>
                        <tr v-for="competitor in container.ranking"
                            :key="competitor.id"
                            class="data-row">
                            <td>
                                {{ competitor.rank }}.
                            </td>
                            <td class="rank-competitor">
                                {{ competitor.name }}
                            </td>
                            <td>
                                {{ competitor.games }}
                            </td>
                            <td>
                                {{ competitor.points }}
                            </td>
                            <td>
                                {{ competitor.wins + '-' + (container.isDrawEnabled ?
                                competitor.draws + '-' : '') + competitor.losts }}
                            </td>
                            <td>
                                {{ competitor.results.wins }}:{{ competitor.results.losts }}
                            </td>
                        </tr>
                    </table>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import cupIcon from '@/assets/icons/graph.svg';
    import rankingIcon from '@/assets/icons/format_list_numbered.svg';
    import { getCupHtmlVisualization } from '@/scripts/getCupHtmlVisualization';

    export default {
        components: { cupIcon, rankingIcon },
        computed: {
            competition () {
                return this.$store.state.competition;
            },
            isEmpty () {
                return this.$store.state.competition.stages[0].containers[0].games.length === 0;
            }
        },
        data () {
            return {
                getCupHtmlVisualization: getCupHtmlVisualization
            }
        },
        watch: {
            competition: {
                deep: true,
                handler () {
                    this.$forceUpdate();
                }
            }
        }
    };
</script>

<style lang="scss">
    #competition-summary-container {
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
            border-radius: $data-row-border-radius;
        }

        .data-row {
            white-space: nowrap;
        }

        .data-row > td {
            background-color: var(--bg1-color);
        }

        .data-row:not(:last-child) > td {
            border-bottom: 1px solid var(--content-divider-color);
        }

        .data-row:nth-child(2) > td:first-child {
            border-top-left-radius: $data-row-border-radius;
        }

        .data-row:nth-child(2) > td:last-child {
            border-top-right-radius: $data-row-border-radius;
        }

        .data-row:last-child > td:first-child {
            border-bottom-left-radius: $data-row-border-radius;
        }

        .data-row:last-child > td:last-child {
            border-bottom-right-radius: $data-row-border-radius;
        }

        .rank-th {
            text-align: center;
            font-size: 88%;
            line-height: 16px;
            font-weight: 200;
            padding: 8px 18px;
            color: var(--content5-color);
        }

        .rank-number-th {
            text-align: left;
            padding-left: 2px;
            padding-right: 2px;
        }

        .rank-competitor-th {
            text-align: left;
        }

        .data-row > td {
            text-align: center;
            padding: 16px 18px;
        }

        .data-row > td:first-child {
            font-weight: 600;
            padding-left: 2px;
            padding-right: 2px;
        }

        .data-row > td.rank-competitor {
            text-align: left;
        }

        .cup-container {
            display: inline-flex;
            background-color: var(--bg1-color);
            white-space: nowrap;
            border-radius: $data-row-border-radius;
            padding: 16px;
        }

        .cup-round {
            display: flex;
            flex-direction: column;
        }

        .cup-game {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

        .cup-game-container {
            display: flex;
            flex: 1;
            position: relative;
        }

        .cup-game-connector-container {
            display: flex;
            align-items: center;
            width: 5px;
            direction: rtl;
        }

        .cup-game-connector {
            display: flex;
            background-color: var(--cup-line-color);
            width: 5px;
            height: 50%;
        }

        .cup-competitor {
            min-height: 50px;
            display: flex;
            align-items: center;
            padding-left: 16px;
        }

        .cup-competitor-line-container {
            min-width: 30px;
            flex: 1;
            margin-left: 16px;
            margin-right: -5px;
        }

        .cup-competitor-line {
            background-color: var(--cup-line-color);
            height: 5px;
            width: 100%;
        }

        .cup-winner {
            display: flex;
            align-items: center;
            padding: 16px;
        }

        .cup-result {
            padding-right: 12px;
            direction: ltr;
            font-family: 'Gudea';
        }

        .cup-game-number {
            font-weight: 500;
            font-family: 'Roboto';
            opacity: 0.4;
            position: absolute;
            left: 16px;
            padding-top: 1px;
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
