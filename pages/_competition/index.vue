<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-left">
            <h2 class="competition-header">{{ competition.name }}</h2>
            <v-simple-table>
                <tbody>
                <tr>
                    <td>Link</td>
                    <td class="link-container">
                        {{ competition.link }}
                        <span>
                            <v-btn small color="#464646" class="copyButton" @click="copyLink">
                                <v-icon small>mdi-content-copy</v-icon>
                                <span class="copyButtonText">skopiuj</span>
                            </v-btn>
                            <v-btn disabled small color="#464646" class="shareButton">
                                <v-icon small>mdi-share-variant</v-icon>
                                <span class="copyButtonText">udostępnij</span>
                            </v-btn>
                        </span>
                    </td>
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
                :sort-by="gamesSort"
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
    import { hasResults, getResultObject } from '../../client/graphqlHelpers';
    import {
        parseCompetitionURL,
        parseCompetitionUpdatedDatetime,
        getCompetitionTypeNameFromType,
        getCompetitorsCountFromCompetitionData,
        getGamesFromCompetitionData
    } from '../../client/competitionDataParseHelpers';

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
                        path: '/404'
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
                ],
                gamesSort: ['number']
            };
        },
        components: {
            UniversalLoader
        },
        mounted () {
            this.loaded = false;
        },
        methods: {
            copyLink () {
                const el = document.createElement('textarea');
                el.value = this.competition.link;
                document.body.appendChild(el);
                el.select();
                el.setSelectionRange(0, 99999);// For mobile devices
                document.execCommand('copy');
                document.body.removeChild(el);
            }
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

    .copyButton {
        margin-left: 16px;
        color: #A7A7A7;
    }

    .shareButton {
        margin-left: 8px;
        color: #A7A7A7;
    }

    .copyButtonText {
        margin-left: 8px;
    }

    td.link-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
