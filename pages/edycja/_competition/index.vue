<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-center">
            <h3 class="form-header" v-if="competitionRoute">Edycja rozgrywek</h3>
            <h3 class="form-header" v-else>Nowe rozgrywki</h3>
            <v-simple-table class="competition-form">
                <tbody>
                <tr>
                    <td valign="top">
                        <v-text-field label="Nazwa"
                                      v-model="competition.name"
                                      color="white"></v-text-field>
                        <v-text-field label="Ścieżka do strony rozgrywek"
                                      v-model="competition.routeName"
                                      :rules="[routeNameValidator]"
                                      prefix="www.rozgrywki.info/"
                                      color="white"></v-text-field>
                    </td>
                    <td>
                        <v-textarea label="Opis"
                                    v-model="competition.description"
                                    rows="4"
                                    color="white"></v-textarea>
                    </td>
                </tr>
                <tr>
                    <td class="date-form">
                        <VueCtkDateTimePicker v-model="competition.start"
                                              :dark="true"
                                              :only-date="true"
                                              :formatted="'YYYY-MM-DD'"
                                              :label="'Dzień rozpoczęcia'"
                                              :no-header="true"
                                              :auto-close="true"
                                              :no-button="true"
                                              :first-day-of-week="1"
                                              :noClearButton="true"
                                              :locale="'pl'"
                                              :no-shortcuts="true"
                                              :id="'VueCtkDateTimePicker-competition-start'"
                        />
                    </td>
                    <td class="date-form">
                        <VueCtkDateTimePicker v-model="competition.end"
                                              :dark="true"
                                              :only-date="true"
                                              :formatted="'YYYY-MM-DD'"
                                              :label="'Dzień zakończenia'"
                                              :no-header="true"
                                              :auto-close="true"
                                              :no-button="true"
                                              :first-day-of-week="1"
                                              :noClearButton="true"
                                              :locale="'pl'"
                                              :no-shortcuts="true"
                                              :id="'VueCtkDateTimePicker-competition-end'"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <v-select
                            :items="competitionTypeFormItems"
                            label="Typ rozgrywek"
                            v-model="competitionType"
                            item-value='value'
                            item-text='label'
                            color="white"
                            v-bind:disabled="disabled"
                        ></v-select>
                    </td>
                    <td>
                        <v-select
                            :items="competitorsCountItems"
                            label="Ilość zespołów"
                            v-model="competitionSize"
                            color="white"
                            v-bind:disabled="disabled"
                        ></v-select>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
            <template v-if="competitionType != null">
                <h3 class="form-header">{{ competitionTypeName }}</h3>
                <v-simple-table class="competition-form" v-if="competitionType === 'group'">
                    <tbody>
                    <tr>
                        <td>
                            <v-checkbox
                                v-model="competitionIsDoubleGame"
                                label="Runda rewanżowa"
                                color="white"
                                v-bind:disabled="disabled"
                            ></v-checkbox>
                        </td>
                        <td>
                            <v-checkbox
                                v-model="gameDrawEnable"
                                label="Możliwy remis"
                                color="white"
                            ></v-checkbox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <v-select
                                :items="gamePointsItems"
                                label="Punkty za wygraną"
                                v-model="gameWinnerPoints"
                                color="white"
                            ></v-select>
                            <v-select
                                :items="gamePointsItems"
                                label="Punkty za przegraną"
                                v-model="gameLoserPoints"
                                color="white"
                            ></v-select>
                        </td>
                        <td valign="top">
                            <v-select
                                :disabled="!gameDrawEnable"
                                :items="gamePointsItems"
                                label="Punkty za remis"
                                v-model="gameDrawPoints"
                                color="white"
                            ></v-select>
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>
                <v-simple-table class="competition-form" v-else-if="competitionType === 'cup'">
                    <tbody>
                    <tr>
                        <td>
                            <v-checkbox
                                v-model="competitionIsDoubleGame"
                                label="Dwumecz"
                                color="white"
                                v-bind:disabled="disabled"
                            ></v-checkbox>
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </template>
            <template v-if="competitionSize != null">
                <h3 class="form-header">Zespoły</h3>
                <v-simple-table class="competition-form">
                    <tbody>
                    <tr v-for="(competitor, index) in competitors" v-bind:key="index">
                        <td valign="top">
                            <v-text-field v-bind:label="`Zespół ${index + 1}`"
                                          v-model="competitor.name"
                                          color="white"
                                          v-bind:disabled="disabled"></v-text-field>
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>
                <h3 class="form-header">Podgląd rozgrywek</h3>
                <v-data-table v-if="groupGamesPreview.length > 0 || cupGamesPreview.length > 0"
                              :headers="previewHeaders"
                              :items="groupGamesPreview.length > 0 ? groupGamesPreview : cupGamesPreview"
                >
                    <template v-slot:item="row">
                        <tr>
                            <td>{{row.item.gameNumber}}</td>
                            <td>{{row.item.teamA.name}}</td>
                            <td>{{row.item.teamB.name}}</td>
                            <td></td>
                            <td style="display: flex; align-items: center; justify-content: center; padding-bottom: 12px">
                                <VueCtkDateTimePicker v-model="row.item.date" style="width: 90px"
                                                      v-if="row.item.teamA.name !== '-' && row.item.teamB.name !== '-'"
                                                      :dark="true"
                                                      :only-date="true"
                                                      :formatted="'YYYY-MM-DD'"
                                                      :no-header="true"
                                                      :no-label="true"
                                                      :label="'Wybierz'"
                                                      :auto-close="true"
                                                      :no-button="true"
                                                      :first-day-of-week="1"
                                                      :noClearButton="true"
                                                      :locale="'pl'"
                                                      :no-shortcuts="true"
                                                      :id="`VueCtkDateTimePicker-game-${row.item.gameNumber}`"
                                />
                            </td>
                        </tr>
                    </template>
                </v-data-table>
                <template v-if="cupGamesPreview.length > 0">
                    <h3 class="form-header">Podgląd drabinki</h3>
                    <v-card class="cup-visualization-preview">
                        <div v-html="cupHtmlVisualization"></div>
                    </v-card>
                </template>
            </template>
            <v-btn class="form-save-button" @click="onSaveClicked">
                <v-icon left>mdi-content-save</v-icon>
                zapisz rozgrywki
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script lang="ts" scoped>
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';

    import UniversalLoader from '../../../components/UniversalLoader.vue';
    import fetchCompetition from '../../../api/graphql-queries/fetchCompetition.graphql';
    import { hasResults, getResultObject } from '../../../client/graphqlHelpers';
    import {
        getGamesFromCompetitionData,
        getCompetitionTypeNameFromType
    } from '../../../client/competitionDataParseHelpers';
    import {
        createRoundRobinPairsForTeams,
        createCupPairsForTeams,
        createHtmlCupVisualization
    } from '../../../client/competitionCreationHelpers';

    export default {
        apollo: {
            fetchedCompetition: {
                prefetch: true,
                query: fetchCompetition,
                variables () {
                    return {
                        route: this.competitionRoute ? this.competitionRoute : ''
                    };
                }
            }
        },
        data () {
            return {
                disabled: true,
                loaded: this.$route.params.competition === undefined,
                competitionRoute: this.$route.params.competition,
                competition: {
                    name: '',
                    description: '',
                    routeName: '',
                    start: '',
                    end: ''
                },
                competitionType: null,
                competitionSize: null,
                competitionTypeFormItems: [{
                    value: 'group',
                    label: 'każdy z każdym'
                }, { value: 'cup', label: 'pucharowe' }],
                competitorsCountItems: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                gamePointsItems: [0, 1, 2, 3],
                competitionIsDoubleGame: false,
                gameDrawEnable: false,
                gameWinnerPoints: null,
                gameLoserPoints: null,
                gameDrawPoints: null,
                competitors: [],
                previewHeaders: [{
                    text: 'Mecz',
                    value: 'gameNumber'
                }, {
                    text: 'Zespół',
                    value: 'teamA.name'
                }, {
                    text: 'Zespół',
                    value: 'teamB.name'
                }, {
                    text: 'Wynik',
                    value: null
                }, {
                    text: 'Data',
                    value: null
                }]
            };
        },
        components: {
            UniversalLoader,
            VueCtkDateTimePicker
        },
        watch: {
            fetchedCompetition () {
                if (hasResults((this.fetchedCompetition))) {
                    this.competition = getResultObject(this.fetchedCompetition);
                    this.games = getGamesFromCompetitionData(this.competition);
                    this.disabled = this.games.length > 0;
                    this.competitionType = this.competition.type;
                    this.competitionSize = this.competition[this.competition.type] ? this.competition[this.competition.type].size : null;
                    if (this.competition.group !== null) {
                        this.competitionIsDoubleGame = this.competition.group.isDouble;
                        this.gameDrawEnable = this.competition.group.isDrawEnable;
                        this.gameWinnerPoints = this.competition.group.winnerPoints;
                        this.gameLoserPoints = this.competition.group.loserPoints;
                        this.gameDrawPoints = this.competition.group.drawPoints;
                    } else if (this.competition.cup !== null) {
                        this.competitionIsDoubleGame = this.competition.cup.isDoubleGame;
                    }

                    this.competitors = this.games
                        .reduce((competitors: { id: string, name: string }[], game: { aCompetitor: { id: string, name: string }, bCompetitor: { id: string, name: string } }) => {
                            if (game.aCompetitor !== null && competitors.find((el: { id: string, name: string }) => el.id === game.aCompetitor.id) === undefined) {
                                competitors.push(game.aCompetitor);
                            }

                            if (game.bCompetitor !== null && competitors.find((el: { id: string, name: string }) => el.id === game.bCompetitor.id) === undefined) {
                                competitors.push(game.bCompetitor);
                            }

                            return competitors;
                        }, [])
                        .sort((a: { id: any, name: string }, b: { id: any, name: string }) => a.id - b.id);

                    this.loaded = true;
                } else if (this.competitionRoute) {
                    this.$router.push({
                        path: '/404'
                    });
                } else {
                    this.loaded = true;
                }
            },
            competitionSize () {
                if (this.disabled) {
                    return;
                }

                const competitorsArr = [];

                for (let i = 0; i < this.competitionSize; ++i) {
                    competitorsArr.push({ name: '' });
                }

                this.competitors = competitorsArr;
            }
        },
        mounted () {
            this.loaded = false;
        },
        computed: {
            competitionTypeName () {
                return getCompetitionTypeNameFromType(this.competitionType);
            },
            groupGamesPreview () {
                if (this.competitionType !== 'group') {
                    return [];
                }

                return createRoundRobinPairsForTeams(this.competitors, this.competitionIsDoubleGame);
            },
            cupGamesPreview () {
                if (this.competitionType !== 'cup') {
                    return [];
                }

                return createCupPairsForTeams(this.competitors, this.competitionIsDoubleGame);
            },
            cupHtmlVisualization () {
                if (this.competitionType !== 'cup') {
                    return '';
                }

                return createHtmlCupVisualization(this.cupGamesPreview, this.competitionIsDoubleGame);
            }
        },
        methods: {
            routeNameValidator (value: any) {
                return /^[0-9a-z-]+$/i.test(value);
            },
            onSaveClicked () {
                this.loaded = false;

                if (this.validateForm) {
                    this.saveCompetition();
                } else {
                    // TODO show errors
                }
            },
            validateForm () {
                // TODO validate

                return false;
            },
            saveCompetition () {
                // TODO grapqhl query
            }
        }
    };
</script>

<style lang="scss">
    @import "~/node_modules/vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

    .form-header {
        margin: 24px 8px 16px 8px;
        text-align: center;
        text-transform: capitalize;
    }

    .competition-form td {
        padding-top: 8px;
    }

    .form-save-button {
        margin: 32px;
    }

    .v-application--is-ltr .v-data-table th {
        text-align: center !important;
    }

    .v-date-picker-table--date td {
        padding: unset !important;
    }

    .v-data-table__wrapper {
        overflow: visible;
    }

    .cup-visualization-preview {
        padding: 16px 0;
    }

    .field-input {
        border: solid hsla(0, 0%, 100%, .7) !important;
        border-width: 0 0 1px 0 !important;
        background: none !important;
        border-radius: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        height: unset !important;
        padding-top: 20px !important;
        padding-bottom: 4px !important;
        color: #fff !important;
        font-size: 16px !important;
    }

    .field-label {
        left: 0 !important;
        color: hsla(0, 0%, 100%, .7) !important;
    }

    .date-form {
        text-align: left;
        color: rgba(255, 255, 255, 0.7);
        padding-bottom: 20px !important;
    }
</style>
