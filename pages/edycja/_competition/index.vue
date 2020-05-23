<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-center">
            <v-form v-if="saveSuccess === null" ref="form">
                <h3 class="form-header" v-if="competitionRoute">Edycja rozgrywek</h3>
                <h3 class="form-header" v-else>Nowe rozgrywki</h3>
                <v-simple-table class="competition-form">
                    <tbody>
                    <tr>
                        <td valign="top">
                            <v-text-field label="Nazwa"
                                          v-model="competition.name"
                                          :rules="[competitionNameValidator]"
                                          color="white"></v-text-field>
                            <v-text-field label="Ścieżka do strony rozgrywek"
                                          v-model="competition.routeName"
                                          :rules="[competitionRouteNameValidator]"
                                          prefix="www.rozgrywki.info/"
                                          color="white"></v-text-field>
                        </td>
                        <td>
                            <v-textarea label="Opis"
                                        v-model="competition.description"
                                        :rules="[competitionDescriptionValidator]"
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
                                :rules="[notNullValidator]"
                                v-bind:disabled="disabled"
                            ></v-select>
                        </td>
                        <td>
                            <v-select
                                :items="competitorsCountItems"
                                label="Ilość zespołów"
                                v-model="competitionSize"
                                color="white"
                                :rules="[notNullValidator]"
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
                                    v-model="gameDrawEnabled"
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
                                    :rules="[notNullValidator]"
                                    color="white"
                                ></v-select>
                                <v-select
                                    :items="gamePointsItems"
                                    label="Punkty za przegraną"
                                    v-model="gameLoserPoints"
                                    :rules="[notNullValidator]"
                                    color="white"
                                ></v-select>
                            </td>
                            <td valign="top">
                                <v-select
                                    :disabled="!gameDrawEnabled"
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
                                              :rules="[competitorNameValidator]"
                                              v-bind:disabled="disabled"
                                              color="white"></v-text-field>
                            </td>
                        </tr>
                        </tbody>
                    </v-simple-table>
                    <h3 class="form-header">Podgląd rozgrywek</h3>
                    <v-data-table v-if="gamesPreview.length > 0"
                                  :headers="previewHeaders"
                                  :items="games ? games : gamesPreview"
                    >
                        <template v-slot:item="row">
                            <tr>
                                <td>{{row.item.number}}</td>
                                <td>{{row.item.aCompetitor.name}}</td>
                                <td>{{row.item.bCompetitor.name}}</td>
                                <td></td>
                                <td style="display: flex; align-items: center; justify-content: center; padding-bottom: 12px">
                                    <VueCtkDateTimePicker v-model="row.item.date"
                                                          style="width: 90px"
                                                          v-if="row.item.aCompetitor.name !== '-' && row.item.bCompetitor.name !== '-'"
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
                                                          :id="`VueCtkDateTimePicker-game-${row.item.number}`"
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
                <div class="form-save">
                    <div v-if="hasValidationErrors" class="error--text">Formularz zawiera błędy.
                        Popraw je i ponów próbę zapisu.
                    </div>
                    <v-btn class="form-save-button" @click="onSaveClicked">
                        <v-icon left>mdi-content-save</v-icon>
                        zapisz rozgrywki
                    </v-btn>
                </div>
            </v-form>
            <div v-else-if="saveSuccess" class="save-result-message">
                <div>Gratulacje! Pomyślnie zapisano rozgrywki. Ich adres to:</div>
                <h2>
                    <nuxt-link :to="`/${competition.routeName}`">{{
                        `www.rozgrywki.info/${competition.routeName}` }}
                    </nuxt-link>
                </h2>
            </div>
            <div v-else class="save-result-message">
                <div>Wystąpił błąd podczas zapisywania rozgrywek. Spróbuj jeszcze raz.</div>
                <v-btn @click="onBackToFormClicked">
                    <v-icon left>mdi-arrow-left</v-icon>
                    powrót do formularza
                </v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script lang="ts" scoped>
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import UniversalLoader from '../../../components/UniversalLoader.vue';
    import fetchCompetition from '../../../api/graphql-queries/fetchCompetition.graphql';
    import updateCompetition from '../../../api/graphql-queries/updateCompetition.graphql';
    import createCompetitors from '../../../api/graphql-queries/createCompetitors.graphql';
    import createCompetition from '../../../api/graphql-queries/createCompetition.graphql';
    import createCup from '../../../api/graphql-queries/createCup.graphql';
    import createGroup from '../../../api/graphql-queries/createGroup.graphql';
    import createGames from '../../../api/graphql-queries/createGames.graphql';
    import { hasResults, getResultObject } from '../../../client/graphqlHelpers';
    import {
        getGamesFromCompetitionData,
        getCompetitionTypeNameFromType,
        getCompetitorsFromGames
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
                existingCompetition: false,
                disabled: false,
                loaded: this.$route.params.competition === undefined,
                hasValidationErrors: false,
                saveSuccess: null,
                competitionRoute: this.$route.params.competition,
                competition: {
                    name: '',
                    description: '',
                    routeName: '',
                    start: null,
                    end: null
                },
                games: null,
                competitionType: null,
                competitionSize: null,
                competitionTypeFormItems: [{
                    value: 'group',
                    label: 'każdy z każdym'
                }, { value: 'cup', label: 'pucharowe' }],
                competitorsCountItems: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                gamePointsItems: [0, 1, 2, 3],
                competitionIsDoubleGame: false,
                gameDrawEnabled: false,
                gameWinnerPoints: null,
                gameLoserPoints: null,
                gameDrawPoints: null,
                competitors: [],
                previewHeaders: [{
                    text: 'Mecz',
                    value: 'number'
                }, {
                    text: 'Zespół',
                    value: 'aCompetitor.name'
                }, {
                    text: 'Zespół',
                    value: 'bCompetitor.name'
                }, {
                    text: 'Wynik',
                    value: null
                }, {
                    text: 'Data',
                    value: 'date'
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
                    this.existingCompetition = true;
                    this.competition = getResultObject(this.fetchedCompetition);
                    this.games = getGamesFromCompetitionData(this.competition);
                    this.disabled = this.games.length > 0;
                    this.competitionType = this.competition.type;
                    this.competitionSize = this.competition[this.competition.type] ? this.competition[this.competition.type].size : null;
                    if (this.competition.group !== null) {
                        this.competitionIsDoubleGame = this.competition.group.isDouble;
                        this.gameDrawEnabled = this.competition.group.isDrawEnabled;
                        this.gameWinnerPoints = this.competition.group.winnerPoints;
                        this.gameLoserPoints = this.competition.group.loserPoints;
                        this.gameDrawPoints = this.competition.group.drawPoints;
                    } else if (this.competition.cup !== null) {
                        this.competitionIsDoubleGame = this.competition.cup.isDoubleGame;
                    }

                    this.competitors = getCompetitorsFromGames(this.games);

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
            gamesPreview () {
                return this.groupGamesPreview.length > 0 ? this.groupGamesPreview : this.cupGamesPreview;
            },
            cupHtmlVisualization () {
                if (this.competitionType !== 'cup') {
                    return '';
                }

                const games = this.games ? this.games : this.cupGamesPreview;

                return createHtmlCupVisualization(games, this.competitionIsDoubleGame);
            }
        },
        methods: {
            competitionNameValidator (value: string) {
                return value.length > 3 && value.length < 63 || 'Nazwa musi zawierać od 4 do 32 znaków';
            },
            competitionRouteNameValidator (value: string) {
                return /^[0-9a-z-]+$/i.test(value) && value.length > 3 && value.length < 33 || 'Ścieżka może się składać tylko z liter, cyfr i myślnika, od 4 do 32 znaków';
            },
            competitionDescriptionValidator (value: string) {
                return value.length < 1025 || 'Opis jest za długi';
            },
            competitorNameValidator (value: string) {
                return this.competitors.filter((el: { name: string }) => el.name === value).length === 1 && value.length > 2 && value.length < 33 || 'Nazwa musi zawierać od 3 do 32 znaków i nie może się powtarzać';
            },
            notNullValidator (value: string) {
                return value !== null;
            },
            async onSaveClicked () {
                this.hasValidationErrors = false;

                if (this.validateForm()) {
                    this.loaded = false;
                    this.saveSuccess = await this.saveCompetition();
                    this.loaded = true;
                } else {
                    this.hasValidationErrors = true;
                }
            },
            validateForm () {
                return this.$refs.form.validate();
            },
            saveCompetition () {
                return this.existingCompetition ? this.updateExistingCompetitionRequest() : this.createNewCompetitionRequest();
            },
            onBackToFormClicked () {
                this.saveSuccess = null;
            },
            async updateExistingCompetitionRequest () {
                return await this.$apollo.mutate({
                    mutation: updateCompetition,
                    variables: {
                        id: this.competition.id,
                        name: this.competition.name,
                        start: this.competition.start,
                        end: this.competition.end,
                        description: this.competition.description,
                        routeName: this.competition.routeName,
                        winnerPoints: this.gameWinnerPoints,
                        loserPoints: this.gameLoserPoints,
                        drawPoints: this.gameDrawPoints,
                        isDrawEnabled: this.gameDrawEnabled
                    }
                });
            },
            async createNewCompetitionRequest () {
                let competitorsWithIds: { name: string, id: number }[];
                let competitionId: number;

                return await this.$apollo.mutate({
                    mutation: createCompetitors,
                    variables: {
                        competitors: this.competitors
                    }
                }).then((createCompetitorsRes: any) => {
                    competitorsWithIds = createCompetitorsRes.data.insert_competitors.returning;

                    return this.$apollo.mutate({
                        mutation: createCompetition,
                        variables: {
                            name: this.competition.name,
                            start: this.competition.start,
                            end: this.competition.end,
                            description: this.competition.description,
                            routeName: this.competition.routeName,
                            type: this.competitionType,
                            userId: this.$auth.user.sub
                        }
                    }).then((createCompetitionRes: any) => {
                        competitionId = createCompetitionRes.data.insert_competitions.returning[0].id;

                        return this.$apollo.mutate({
                            mutation: createGames,
                            variables: {
                                games: this.gamesPreview.map((game: { number: number, date: string, aCompetitor: { name: string }, bCompetitor: { name: string } }) => {
                                    const aCompetitor = game.aCompetitor.name === '-' ? 0 : competitorsWithIds.find((competitor) => competitor.name === game.aCompetitor.name);
                                    const bCompetitor = game.aCompetitor.name === '-' ? 0 : competitorsWithIds.find((competitor) => competitor.name === game.bCompetitor.name);

                                    return {
                                        competition: competitionId,
                                        number: game.number,
                                        aCompetitorId: aCompetitor ? aCompetitor.id : null,
                                        bCompetitorId: bCompetitor ? bCompetitor.id : null,
                                        date: game.date
                                    };
                                })
                            }
                        }).then(() => {
                            if (this.competitionType === 'group') {
                                return this.$apollo.mutate({
                                    mutation: createGroup,
                                    variables: {
                                        competitionId: competitionId,
                                        isDouble: this.competitionIsDoubleGame,
                                        size: this.competitionSize,
                                        winnerPoints: this.gameWinnerPoints,
                                        loserPoints: this.gameLoserPoints,
                                        drawPoints: this.gameDrawPoints,
                                        isDrawEnabled: this.gameDrawEnabled
                                    }
                                }).catch(() => {
                                    throw new Error();
                                });
                            }

                            if (this.competitionType === 'cup') {
                                return this.$apollo.mutate({
                                    mutation: createCup,
                                    variables: {
                                        competitionId: competitionId,
                                        isDoubleGame: this.competitionIsDoubleGame,
                                        size: this.competitionSize
                                    }
                                }).catch(() => {
                                    throw new Error();
                                });
                            }

                            throw new Error();
                        });
                    }).catch(() => {
                        throw new Error();
                    });
                }).catch(() => false);
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

    .form-save {
        margin: 24px;
    }

    .form-save-button {
        margin: 8px;
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

    .save-result-message {
        margin: 16px;
    }

    .save-result-message > *:not(:first-child) {
        margin-top: 24px;
    }
</style>
