<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-left">
            <h2 class="competition-header">
                {{ competition.name }}
                <v-btn small color="#464646" class="favouriteButton shareButton" disabled>
                    <v-icon small>mdi-bell</v-icon>
                    <span class="copyButtonText">powiadomienia</span>
                </v-btn>
            </h2>
            <v-simple-table>
                <tbody>
                <tr>
                    <td>Link</td>
                    <td class="link-container">
                        <span>{{ competition.link }}</span>
                        <div>
                            <v-btn small color="#464646" class="copyButton" @click="copyLink">
                                <v-icon small>mdi-content-copy</v-icon>
                                <span class="copyButtonText">skopiuj</span>
                            </v-btn>
                            <ShareNetwork network="facebook"
                                          v-bind:url="competition.link"
                                          v-bind:title="competition.name"
                                          v-bind:description="competition.description"
                                          hashtags="rozgrywki.info">
                                <v-btn small color="#464646" class="shareButton">
                                    <v-icon>mdi-facebook</v-icon>
                                </v-btn>
                            </ShareNetwork>
                            <ShareNetwork network="email"
                                          v-bind:url="competition.link"
                                          v-bind:title="competition.name"
                                          v-bind:description="competition.description">
                                <v-btn small color="#464646" class="shareButton">
                                    <v-icon>mdi-at</v-icon>
                                </v-btn>
                            </ShareNetwork>
                            <ShareNetwork network="whatsapp"
                                          v-bind:url="competition.link"
                                          v-bind:title="competition.name"
                                          v-bind:description="competition.description">
                                <v-btn small color="#464646" class="shareButton">
                                    <v-icon>mdi-whatsapp</v-icon>
                                </v-btn>
                            </ShareNetwork>
                            <ShareNetwork network="twitter"
                                          v-bind:url="competition.link"
                                          v-bind:title="competition.name">
                                <v-btn small color="#464646" class="shareButton">
                                    <v-icon>mdi-twitter</v-icon>
                                </v-btn>
                            </ShareNetwork>
                        </div>
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
            <h3 class="form-header">Mecze</h3>
            <v-data-table
                :headers="gamesHeaders"
                :items="games"
                :sort-by="gamesSort"
                :mobile-breakpoint="0"
                class="text-left"
            >
            </v-data-table>
            <template v-if="competition.type === 'cup'">
                <h3 class="form-header">Drabinka Pucharowa
                    <v-icon class="mobile-and-vertical-only">mdi-phone-rotate-landscape</v-icon>
                </h3>
                <v-card class="cup-visualization-preview">
                    <div v-html="cupHtmlVisualization" id="cup-visualization-table"></div>
                </v-card>
            </template>
            <template v-if="competition.type === 'group'">
                <h3 class="form-header">Tabela</h3>
                <v-data-table
                    :headers="standingsHeaders"
                    :items="groupStandings"
                    :sort-by="standingsSort"
                    :hide-default-footer="true"
                    :mobile-breakpoint="0"
                    class="text-left"
                >
                </v-data-table>
            </template>
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
        getGamesFromCompetitionData,
        getGroupStandings
    } from '../../client/competitionDataParseHelpers';
    import { createHtmlCupVisualization } from '../../client/competitionCreationHelpers';

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

                    if (this.competition.group !== null) {
                        this.competition.typeName += this.competition.group.isDouble ? ' (z rundą rewanżową)' : ' (bez rundy rewanżowej)';

                        this.groupStandings = getGroupStandings(this.competition);
                    } else if (this.competition.cup !== null) {
                        this.competition.typeName += this.competition.cup.isDouble ? ' (mecz i rewanż)' : ' (jeden mecz)';

                        this.cupHtmlVisualization = createHtmlCupVisualization(this.games, this.competition.cup.isDouble);
                    }

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
                    {
                        text: 'Mecz nr',
                        value: 'number',
                        align: 'center'
                    },
                    {
                        text: 'Zespół',
                        value: 'aCompetitor.name',
                        align: 'center',
                        sortable: false
                    },
                    {
                        text: 'Zespół',
                        value: 'bCompetitor.name',
                        align: 'center',
                        sortable: false
                    },
                    {
                        text: 'Wynik',
                        value: 'resultText',
                        align: 'center',
                        sortable: false
                    },
                    {
                        text: 'Data',
                        value: 'date',
                        align: 'center',
                        sortable: false
                    }
                ],
                gamesSort: ['number'],
                cupHtmlVisualization: '',
                standingsHeaders: [
                    {
                        text: 'Pozycja',
                        value: 'rank',
                        align: 'center'
                    },
                    {
                        text: 'Zespół',
                        value: 'name'
                    },
                    {
                        text: 'Mecze',
                        value: 'games',
                        align: 'center'
                    },
                    {
                        text: 'Punkty',
                        value: 'points',
                        align: 'center'
                    }
                ],
                standingsSort: ['rank'],
                groupStandings: []
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
        position: relative;
        padding: 0 56px;
    }

    .v-data-table {
        margin: 22px 0;
        white-space: nowrap;
    }

    .copyButton {
        margin-left: 16px;
        color: #A7A7A7;
    }

    .shareButton {
        margin-left: 8px;
        color: #A7A7A7;
    }

    .copyButton:hover, .shareButton:hover {
        color: #fff;
    }

    .copyButtonText {
        margin-left: 8px;
    }

    td.link-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .form-header {
        margin: 24px 8px 16px 8px;
        text-align: center;
        text-transform: capitalize;
    }

    .cup-visualization-preview {
        padding: 16px 0;
        text-align: center;
        margin: 22px 0;
    }

    .favouriteButton {
        position: absolute;
        right: 0;
        top: calc(50% - 14px);
    }

    @media (max-width: 1000px) {
        .favouriteButton {
            top: 0;
        }

        .favouriteButton span {
            display: none;
        }

        .competition-header {
            font-size: 20px;
        }

        td.link-container {
            flex-direction: column;
            align-items: flex-start;
            height: unset;
            padding: 12px 16px;
        }

        .copyButton {
            margin-left: 0;
        }

        .link-container > span {
            margin: 4px 0 12px 0;
        }

        .cup-visualization-preview {
            overflow: auto;
        }
    }

    .mobile-and-vertical-only {
        display: none;
    }

    @media screen and (orientation: portrait) {
        .mobile-and-vertical-only {
            display: unset;
        }
    }
</style>
