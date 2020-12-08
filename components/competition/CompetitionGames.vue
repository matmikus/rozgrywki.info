<template>
    <div id="competition-games-container">
        <div v-for="stage in competition.stages" :key="stage.id" class="stage">
            <div v-for="container in stage.containers" :key="container.id" class="container">
                <div class="container-name" v-show="container.name">
                    <span class="container-name-text">{{ container.name }}</span>
                </div>
                <div class="container-games">
                    <div v-if="isEmpty">Mecze wygenerują się po wybraniu parametrów.</div>
                    <table class="data-table" cellspacing="0">
                        <tr v-for="game in container.games" :key="game.id" class="data-row">
                            <td class="game-number">#{{ game.number }}</td>
                            <td class="game-competitors">
                                {{ `${getCompetitorName(game.aCompetitor)} -
                                ${getCompetitorName(game.bCompetitor)}` }}
                            </td>
                            <td>
                                <template v-if="mode === 'edit'">
                                    <div class="game-result-edit">
                                        <edit-input-text :validation-func="gameResultValidatorFunc"
                                                         :info="'Zakres 0-1000'"
                                                         :type="'number'"
                                                         :min="0"
                                                         :max="1000"
                                                         :placeholder="'Wynik'"
                                                         :default-value="game.aResult"
                                                         v-on:value-changed="onAResultChanged($event, game.id)"
                                                         :disabled="game.aCompetitor === null || game.bCompetitor === null"
                                                         class="game-result-edit-left"></edit-input-text>
                                        <div class="game-result-divider">:</div>
                                        <edit-input-text :validation-func="gameResultValidatorFunc"
                                                         :info="'Zakres 0-1000'"
                                                         :type="'number'"
                                                         :min="0"
                                                         :placeholder="'Wynik'"
                                                         :default-value="game.bResult"
                                                         v-on:value-changed="onBResultChanged($event, game.id)"
                                                         :disabled="game.aCompetitor === null || game.bCompetitor === null"
                                                         :max="1000"></edit-input-text>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="game-result"
                                         v-if="game.aResult != null && game.bResult != null && game.aCompetitor != null && game.bCompetitor != null">
                                        {{ `${game.aResult}:${game.bResult}` }}
                                    </div>
                                </template>
                            </td>
                            <td>
                                <template v-if="mode === 'edit'">
                                    <div class="game-date-edit">
                                        <edit-date-picker :info="'dd/mm/rrrr'"
                                                          v-on:value-changed="onDateChanged($event, game.id)"
                                                          :default-value="game.date"></edit-date-picker>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="game-date" v-if="game.date">{{ game.date }}</div>
                                </template>
                            </td>
                            <td>
                                <template v-if="mode === 'edit'">
                                    <div class="game-details-edit">
                                        <edit-input-text :validation-func="gameResultDetailsValidatorFunc"
                                                         :info="'0-40 znaków'"
                                                         :default-value="game.details"
                                                         v-on:value-changed="onDetailsChanged($event, game.id)"
                                                         :placeholder="'Szczegółowy wynik'"></edit-input-text>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="game-details"
                                         v-if="game.aResult != null && game.bResult != null && game.details && game.aCompetitor != null && game.bCompetitor != null">
                                        {{ `${game.aResult}:${game.bResult}` }}
                                        {{ game.details ? ` (${game.details})` : '' }}
                                    </div>
                                </template>
                            </td>
                            <template v-if="mode === 'edit' && isExistingCompetition && game.aResult == null && game.bResult == null">
                                <td>
                                    <div class="game-token-icon" v-if="!game.updateToken">
                                        <connect-icon @click="() => onGenerateTokenClicked(game.id)"
                                                      :game-id="game.id"
                                                      v-tooltip.bottom="{ content: 'Generuj link dodania wyniku', delay: { show: 500, hide: 0, trigger: 'hover' } }"></connect-icon>
                                    </div>
                                    <div class="game-token-input" v-if="game.updateToken">
                                        <edit-input-text :info="'Jednorazowy link dodania wyniku'"
                                                         :default-value="`www.rozgrywki.info/dodaj-wynik/${game.updateToken}`"
                                                         disabled></edit-input-text>
                                    </div>
                                </td>
                            </template>
                            <template v-else>
                                <td></td>
                            </template>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import connectIcon from '@/assets/icons/connect.svg';
    import EditInputText from '@/components/competition/EditInputText.vue';
    import EditDatePicker from '@/components/competition/EditDatePicker.vue';
    import {
        gameResultValidatorFunction,
        gameResultDetailsValidatorFunction
    } from '@/scripts/competitionFormValidator';
    import { uid } from 'rand-token';
    import setGameToken from '@/graphql/setGameToken.graphql';

    export default {
        props: ['mode'],
        components: {
            connectIcon, EditInputText, EditDatePicker
        },
        data () {
            return {
                gameResultValidatorFunc: gameResultValidatorFunction,
                gameResultDetailsValidatorFunc: gameResultDetailsValidatorFunction
            };
        },
        computed: {
            competition () {
                return this.$store.state.competition;
            },
            isEmpty () {
                return this.$store.state.competition.stages[0].containers[0].games.length === 0;
            },
            isExistingCompetition () {
                return this.$store.state.competitionEditLock;
            }
        },
        methods: {
            getCompetitorName (competitorObj: { name: String } | null) {
                return (competitorObj && competitorObj.name) || '?';
            },
            onAResultChanged (value: number, gameId: number) {
                this.$store.dispatch('setCompetitionResultData', {
                    id: gameId,
                    aResult: value
                });
            },
            onBResultChanged (value: number, gameId: number) {
                this.$store.dispatch('setCompetitionResultData', {
                    id: gameId,
                    bResult: value
                });
            },
            onDateChanged (value: number, gameId: number) {
                this.$store.dispatch('setCompetitionResultData', { id: gameId, date: value });
            },
            onDetailsChanged (value: number, gameId: number) {
                this.$store.dispatch('setCompetitionResultData', {
                    id: gameId,
                    details: value
                });
            },
            onGenerateTokenClicked (gameId: number) {
                const token = uid(16);

                this.$apollo.mutate({
                    mutation: setGameToken,
                    variables: {
                        id: gameId,
                        token: token
                    }
                }).then(() => {
                    this.$store.dispatch('updateGameToken', { gameId: gameId, updateToken: token });
                }).catch(() => {
                    this.$store.dispatch('showSnackbar', { message: 'Wystąpił błąd podczas generowania linku.' });
                });
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
            height: 58px;
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

        .game-result-edit {
            display: flex;
            padding: 16px 16px 4px 16px;
        }

        .game-details-edit {
            padding: 16px 16px 4px 16px;
            min-width: 200px;
        }

        .game-result-divider {
            padding: 5px 4px 4px 4px;
        }

        .game-result-edit-left {
            direction: rtl;
        }

        .game-date-edit {
            margin-top: -1px;
            padding: 16px 16px 4px 16px;
        }

        .game-token-icon {
            width: 32px;
            height: 32px;
            margin-right: 16px;
            margin-left: 16px;
        }

        .game-token-icon svg {
            fill: var(--content1-color);
            cursor: pointer;
        }

        .game-token-icon svg:hover {
            fill: var(--content3-color);
        }

        .game-token-input {
            padding: 16px 16px 4px 16px;
            width: 300px;
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
