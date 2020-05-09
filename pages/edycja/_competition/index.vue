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
                        <v-text-field label="Ścieżka"
                                      v-model="competition.routeName"
                                      color="white"></v-text-field>
                    </td>
                    <td>
                        <v-textarea label="Opis"
                                    v-model="competition.description"
                                    color="white"></v-textarea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <v-text-field label="Dzień rozpoczęcia"
                                      v-model="competition.start"
                                      color="white"></v-text-field>
                    </td>
                    <td>
                        <v-text-field label="Dzień zakończenia"
                                      v-model="competition.end"
                                      color="white"></v-text-field>
                    </td>
                </tr>
                <tr>
                    <td>
                        <v-select
                            :items="competitionTypeFormItems"
                            label="Typ rozgrywek"
                            v-model="competition.type"
                            item-value='value'
                            item-text='label'
                            color="white"
                        ></v-select>
                    </td>
                    <td>
                        <v-select
                            :items="competitorsCountItems"
                            label="Ilość zespołów"
                            v-model="competition.size"
                            item-value='value'
                            item-text='label'
                            color="white"
                        ></v-select>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
            <v-btn class="form-save-button">zapisz</v-btn>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import UniversalLoader from '../../../components/UniversalLoader.vue';
    import fetchCompetition from '../../../api/graphql-queries/fetchCompetition.graphql';
    import { hasResults, getResultObject } from '../../../client/graphqlHelpers.ts';
    import { getGamesFromCompetitionData } from '../../../client/competitionDataParseHelpers.ts';

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
                loaded: this.$route.params.competition === undefined,
                competitionRoute: this.$route.params.competition,
                competition: {
                    name: '',
                    description: '',
                    routeName: '',
                    start: '',
                    end: '',
                    type: null,
                    size: null
                },
                competitionTypeFormItems: [{
                    value: 'group',
                    label: 'każdy z każdym'
                }, { value: 'cup', label: 'pucharowe' }],
                competitorsCountItems: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            };
        },
        components: {
            UniversalLoader
        },
        watch: {
            fetchedCompetition () {
                if (hasResults((this.fetchedCompetition))) {
                    this.competition = getResultObject(this.fetchedCompetition);
                    this.games = getGamesFromCompetitionData(this.competition);
                    this.competition.size = this.competition[this.competition.type].size;

                    this.loaded = true;
                } else if (this.competitionRoute) {
                    this.$router.push({
                        path: '/404'
                    });
                } else {
                    this.loaded = true;
                }
            }
        },
        mounted () {
            this.loaded = false;
        }
    };
</script>

<style>
    .form-header {
        margin: 8px 8px 16px 8px;
        text-align: center;
    }

    .competition-form td {
        padding-top: 8px;
    }

    .form-save-button {
        margin: 16px;
    }
</style>
