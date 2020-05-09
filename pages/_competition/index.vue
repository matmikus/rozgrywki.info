<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-left">
            <h1 class="competition-header">{{ competition.name }}</h1>
            <v-simple-table>
                <tbody>
                <tr>
                    <td>Link</td>
                    <td>{{ competition.link }}</td>
                </tr>
                <tr>
                    <td>Opis</td>
                    <td>{{ competition.description }}</td>
                </tr>
                <tr>
                    <td>Data rozpoczęcia</td>
                    <td>{{ competition.start }}</td>
                </tr>
                <tr>
                    <td>Data zakończenia</td>
                    <td>{{ competition.end }}</td>
                </tr>
                <tr>
                    <td>Typ rozgrywek</td>
                    <td>{{ competition.typeName }}</td>
                </tr>
                <tr>
                    <td>Liczba uczestników</td>
                    <td>{{ competition.competitorsCount }}</td>
                </tr>
                <tr>
                    <td>Aktualizacja</td>
                    <td>{{ competition.updatedAt }}</td>
                </tr>
                </tbody>
            </v-simple-table>
            <v-data-table
                :headers="gamesHeaders"
                :items="games"
                :items-per-page="100"
                class="text-left"
            >
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
    import UniversalLoader from '../../components/UniversalLoader.vue';
    import fetchCompetition from '../../api/graphql-queries/fetchCompetition.graphql';
    import { hasResults, getResultObject } from '../../client/graphqlHelpers.ts';
    import {
        parseCompetitionURL,
        parseCompetitionUpdatedDatetime,
        getCompetitionTypeNameFromType,
        getCompetitorsCountFromCompetitionData,
        getGamesFromCompetitionData
    } from '../../client/competitionDataParseHelpers.ts';

    export default {
        apollo: {
            fetchedCompetition: {
                prefetch: true,
                query: fetchCompetition,
                variables () {
                    return {
                        route: this.$route.params.competition
                    };
                }
            }
        },
        watch: {
            fetchedCompetition () {
                if (hasResults((this.fetchedCompetition))) {
                    this.competition = getResultObject(this.fetchedCompetition);
                    this.competition.link = parseCompetitionURL(this.competition.routeName);
                    this.competition.typeName = getCompetitionTypeNameFromType(this.competition.type);
                    this.competition.updatedAt = parseCompetitionUpdatedDatetime(this.competition.updatedAt);
                    this.competition.competitorsCount = getCompetitorsCountFromCompetitionData(this.competition);
                    this.games = getGamesFromCompetitionData(this.competition);

                    this.loaded = true;
                } else {
                    this.$router.push({
                        path: '404'
                    });
                }
            }
        },
        data () {
            return {
                loaded: false,
                competition: {},
                games: [],
                gamesHeaders: [
                    { text: 'Mecz nr', value: 'number' },
                    { text: 'Zespół', value: 'aCompetitor.name' },
                    { text: 'Zespół', value: 'bCompetitor.name' },
                    { text: 'Wynik', value: 'resultText' },
                    { text: 'Data', value: 'date' }
                ]
            };
        },
        components: {
            UniversalLoader
        },
        mounted () {
            this.loaded = false;
        }
    };
</script>

<style scoped>
    .competition-header {
        margin-top: 8px;
        text-align: center;
    }

    .v-data-table {
        margin: 22px 0;
    }
</style>
