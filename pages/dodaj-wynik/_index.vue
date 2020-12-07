<template>
    <div id="update-result-container">
        <div class="form-container" v-if="!loading">
            <div v-if="!success">Niepoprawny link</div>
            <div v-else>
                <table class="data-table" cellspacing="0">
                    <tr class="data-row">
                        <td class="game-competitors">
                            {{ `${game.aCompetitor.name} -
                            ${game.bCompetitor.name}` }}
                        </td>
                        <td>
                            <div class="game-result-edit">
                                <edit-input-text :validation-func="gameResultValidatorFunc"
                                                 :info="'Zakres 0-1000'"
                                                 :type="'number'"
                                                 :min="0"
                                                 :max="1000"
                                                 :placeholder="'Wynik'"
                                                 :default-value="game.aResult"
                                                 ref="aResult"
                                                 v-on:value-changed="onGameValueChanged($event, 'aResult')"
                                                 class="game-result-edit-left"></edit-input-text>
                                <div class="game-result-divider">:</div>
                                <edit-input-text :validation-func="gameResultValidatorFunc"
                                                 :info="'Zakres 0-1000'"
                                                 :type="'number'"
                                                 :min="0"
                                                 :placeholder="'Wynik'"
                                                 :default-value="game.bResult"
                                                 ref="bResult"
                                                 v-on:value-changed="onGameValueChanged($event, 'bResult')"
                                                 :max="1000"></edit-input-text>
                            </div>
                        </td>
                        <td>
                            <div class="game-date-edit">
                                <edit-date-picker :info="'dd/mm/rrrr'"
                                                  ref="date"
                                                  v-on:value-changed="onGameValueChanged($event, 'date')"
                                                  :default-value="game.date"></edit-date-picker>
                            </div>
                        </td>
                        <td>
                            <div class="game-details-edit">
                                <edit-input-text :validation-func="gameResultDetailsValidatorFunc"
                                                 :info="'0-40 znaków'"
                                                 :default-value="game.details"
                                                 ref="details"
                                                 v-on:value-changed="onGameValueChanged($event, 'details')"
                                                 :placeholder="'Szczegółowy wynik'"></edit-input-text>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="floating-button"
                     @click="onSaveClick">
                    <save-icon class="floating-button-icon"></save-icon>
                    <div class="floating-button-text">ZAPISZ</div>
                </div>
            </div>
        </div>
        <div class="loader-container" v-else>
            <loader></loader>
        </div>
    </div>
</template>

<script lang="ts">
    import loader from '@/components/Loader.vue';
    import SaveIcon from '@/assets/icons/save.svg';
    import updateGame from '@/graphql/updateGame.graphql';
    import setGameToken from '@/graphql/setGameToken.graphql';
    import getGame from '@/graphql/getGame.graphql';
    import EditInputText from '@/components/competition/EditInputText.vue';
    import EditDatePicker from '@/components/competition/EditDatePicker.vue';
    import {
        gameResultValidatorFunction,
        gameResultDetailsValidatorFunction
    } from '@/scripts/competitionFormValidator';

    export default {
        layout: 'simple',
        components: { SaveIcon, loader, EditInputText, EditDatePicker },
        computed: {},
        data () {
            return {
                loading: true,
                success: null,
                game: {},
                gameResultValidatorFunc: gameResultValidatorFunction,
                gameResultDetailsValidatorFunc: gameResultDetailsValidatorFunction
            }
        },
        methods: {
            onSaveClick () {
                if (!this.game.aResult || !this.game.bResult) {
                    this.$store.dispatch('showSnackbar', { message: 'Nie uzupełniono pól z wynikiem.' });
                } else if (this.$refs.aResult.error || this.$refs.bResult.error || this.$refs.date.error || this.$refs.details.error) {
                    this.$store.dispatch('showSnackbar', { message: 'Formularz zawiera błędy.' });
                } else {
                    this.updateGame();
                }
            },
            onGameValueChanged (value: any, props: string) {
                this.game[props] = value;
            },
            updateGame () {
                this.loading = true;
                const game = this.game;

                this.$apollo.mutate({
                    mutation: updateGame,
                    variables: {
                        id: game.id,
                        aCompetitorId: game.aCompetitor.id,
                        bCompetitorId: game.bCompetitor.id,
                        aResult: game.aResult,
                        bResult: game.bResult,
                        date: game.date,
                        details: game.details
                    }
                }).then(() => this.$apollo.mutate({
                    mutation: setGameToken,
                    variables: {
                        id: game.id,
                        token: null
                    }
                })).then(() => {
                    this.$store.dispatch('showSnackbar', { message: 'Dodano wynik.' });
                    this.$router.push(`/${this.game.container.stage.competition.routeName}`);
                }).catch(() => {
                    this.$store.dispatch('showSnackbar', { message: 'Wystąpił błąd podczas zapisu.', actionText: 'OK' });
                    this.loading = false;
                });
            }
        },
        mounted () {
            this.$auth.updateToken = this.$route.params.index;
        },
        apollo: {
            getGame: {
                prefetch: true,
                query: getGame,
                variables () {
                    return {
                        token: this.$route.params.index
                    };
                }
            }
        },
        watch: {
            getGame (result: any) {
                this.success = result.length === 1
                    && !result[0].aResult
                    && !result[0].bResult
                    && result[0].aCompetitor.name
                    && result[0].bCompetitor.name;
                this.game = result[0];
                this.loading = false;
            }
        }
    };
</script>

<style lang="scss">
    #update-result-container {
        height: 100%;
        padding-top: 56px;
        box-sizing: border-box;

        .form-container {
            position: relative;
            height: 100%;
            box-sizing: border-box;
            padding: 36px;
            color: var(--content1-color);
        }

        .loader-container {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
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

        .floating-button {
            margin: 24px 0;
            height: 48px;
            min-width: 48px;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: var(--main-color);
            cursor: pointer;
            border-radius: 4px;
            padding: 8px;
        }

        .floating-button-text {
            color: #fff;
            padding: 0 12px;
            overflow: hidden;
            transition: width 250ms ease-in-out;
            text-transform: uppercase;
            font-weight: 500;
            font-size: 16px;
            text-align: center;
        }

        .floating-button-icon {
            fill: #fff;
            width: 32px;
            height: 32px;
        }

        @media not all and (orientation: landscape) {
            .data-row > td {
                display: block;
            }
        }
    }
</style>
