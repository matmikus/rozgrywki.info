<template>
    <div id="edit-group-container">
        <div class="inline-container">
            <div class="data-row">
                <div class="data-row__label">
                    Remis
                </div>
                <div class="data-row__value">
                    <edit-input-check id="remis"
                                      label="Możliwy"
                                      v-on:value-changed="onDrawEnabledChanged"
                                      :default-value="isDrawEnabled"></edit-input-check>
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Punkty za wygraną
                </div>
                <div class="data-row__value">
                    <edit-input-text :type="'number'"
                                     v-on:value-changed="onWinnerPointsChanged"
                                     :default-value="winnerPoints"
                                     :info="'Zakres 0-100'"
                                     :min="0"
                                     :max="100"
                                     :validation-func="pointsValidatorFunc"></edit-input-text>
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Punkty za przegraną
                </div>
                <div class="data-row__value">
                    <edit-input-text :type="'number'"
                                     v-on:value-changed="onLoserPointsChanged"
                                     :default-value="loserPoints"
                                     :info="'Zakres 0-100'"
                                     :min="0"
                                     :max="100"
                                     :validation-func="pointsValidatorFunc"></edit-input-text>
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Punkty za wygraną z różnicą 1
                </div>
                <div class="data-row__value">
                    <edit-input-text :type="'number'"
                                     v-on:value-changed="onOnePointWinnerPointsChanged"
                                     :default-value="onePointWinnerPoints"
                                     :info="'Zakres 0-100'"
                                     :min="0"
                                     :max="100"
                                     :validation-func="pointsValidatorFunc"></edit-input-text>
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Punkty za przegraną z różnicą 1
                </div>
                <div class="data-row__value">
                    <edit-input-text :type="'number'"
                                     v-on:value-changed="onOnePointLoserPointsChanged"
                                     :default-value="onePointLoserPoints"
                                     :info="'Zakres 0-100'"
                                     :min="0"
                                     :max="100"
                                     :validation-func="pointsValidatorFunc"></edit-input-text>
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Punkty za remis
                </div>
                <div class="data-row__value">
                    <edit-input-text :type="'number'"
                                     v-on:value-changed="onDrawPointsChanged"
                                     :default-value="drawPoints"
                                     :info="'Zakres 0-100'"
                                     :min="0"
                                     :max="100"
                                     :disabled="!isDrawEnabled"
                                     :validation-func="pointsValidatorFunc"></edit-input-text>
                </div>
            </div>
        </div>
        <div class="data-row">
            <div class="data-row__label">
                Kolejność elementów decydujących o miejscu (przeciągnij i upuść)
            </div>
            <div class="data-row__value">
                <div class="draggable-container">
                    <draggable v-model="orderArray"
                               v-on:change="onOrderChanged"
                               group="people"
                               @start="drag=true"
                               @end="drag=false">
                        <div class="draggable-item"
                             v-for="element in orderArray"
                             :key="element.property">
                            <span>{{orderArray.indexOf(element) + 1}}. {{element.name}}</span>
                            <span>
                                <move-icon class="item-icon"></move-icon>
                            </span>
                        </div>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import draggable from 'vuedraggable';
    import MoveIcon from '@/assets/icons/move.svg';
    import editInputText from '@/components/competition/EditInputText.vue';
    import editInputCheck from '@/components/competition/EditInputCheck.vue';
    import {
        pointsValidator
    } from '@/scripts/competitionFormValidator';

    export default {
        components: {
            draggable, MoveIcon, editInputText, editInputCheck
        },
        data () {
            return {
                orderArray: [],
                pointsValidatorFunc: pointsValidator
            };
        },
        computed: {
            isDrawEnabled () {
                return this.$store.state.competition.stages[0].containers[0].isDrawEnabled;
            },
            winnerPoints () {
                return this.$store.state.competition.stages[0].containers[0].winnerPoints;
            },
            loserPoints () {
                return this.$store.state.competition.stages[0].containers[0].loserPoints;
            },
            drawPoints () {
                return this.$store.state.competition.stages[0].containers[0].drawPoints;
            },
            onePointWinnerPoints () {
                return this.$store.state.competition.stages[0].containers[0].onePointWinnerPoints;
            },
            onePointLoserPoints () {
                return this.$store.state.competition.stages[0].containers[0].onePointLoserPoints;
            }
        },
        methods: {
            onDrawEnabledChanged (value: boolean) {
                this.$store.dispatch('setCompetitionDrawEnabled', value);
            },
            onWinnerPointsChanged (value: number) {
                this.$store.dispatch('setCompetitionWinnerPoints', value);
            },
            onLoserPointsChanged (value: number) {
                this.$store.dispatch('setCompetitionLoserPoints', value);
            },
            onDrawPointsChanged (value: number) {
                this.$store.dispatch('setCompetitionDrawPoints', value);
            },
            onOnePointWinnerPointsChanged (value: number) {
                this.$store.dispatch('setCompetitionOnePointWinnerPoints', value);
            },
            onOnePointLoserPointsChanged (value: number) {
                this.$store.dispatch('setCompetitionOnePointLoserPoints', value);
            },
            onOrderChanged () {
                this.$store.dispatch('setCompetitionRankOrder', this.orderArray);
            }
        },
        mounted () {
            const {
                rankPointsOrder,
                rankGamesRatioOrder,
                rankResultsRatioOrder,
                rankGamesAmountOrder,
                rankDirectGameOrder
            } = this.$store.state.competition.stages[0].containers[0];

            const order = new Array(5);
            order[rankPointsOrder - 1] = {
                property: 'rankPointsOrder',
                name: 'Liczba punktów'
            };
            order[rankGamesRatioOrder - 1] = {
                property: 'rankGamesRatioOrder',
                name: 'Stosunek meczy wygranych do przegranych'
            };
            order[rankResultsRatioOrder - 1] = {
                property: 'rankResultsRatioOrder',
                name: 'Stosunek wyników'
            };
            order[rankGamesAmountOrder - 1] = {
                property: 'rankGamesAmountOrder',
                name: 'Liczba rozegranych meczy'
            };
            order[rankDirectGameOrder - 1] = {
                property: 'rankDirectGameOrder',
                name: 'Bezpośredni mecz'
            };

            this.orderArray = order;
        }
    };
</script>
<style lang="scss">
    #edit-group-container {
        .data-row {
            background-color: var(--bg1-color);
            padding: 0;
            flex: 1;
            margin: 2px;
            border-radius: $data-row-border-radius;
        }

        .data-row__label {
            opacity: 0.5;
            font-size: 80%;
        }

        .inline-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 0 1px;
            margin-top: -1px;
            margin-bottom: -1px !important;
        }

        .draggable-container {
            display: flex;
            margin-bottom: 4px;
        }

        .draggable-item {
            width: auto;
            cursor: move;
            background-color: var(--bg2-color);
            margin: 2px 0;
            padding: 4px 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .draggable-item > span {
            display: flex;
            align-items: center;
        }

        .item-icon {
            margin: 4px 0 4px 12px;
            fill: var(--content1-color);
            width: 18px;
            height: 18px;
        }

        .sortable-ghost {
            color: var(--main-color);
        }
    }
</style>
