<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-center">
            <v-data-table
                :headers="headers"
                :items="competitions"
                :items-per-page="5"
                class="text-left"
                id="competitions-list-data-table"
            >
                <template v-slot:item="row">
                    <tr>
                        <td>{{row.item.name}}</td>
                        <td>{{row.item.link}}</td>
                        <td>{{row.item.dateRange}}</td>
                        <td>{{row.item.updatedAt}}</td>
                        <td class="buttons-container">
                            <v-btn small
                                   color="#464646"
                                   @click="onPreviewClick(row.item)">
                                podgląd
                            </v-btn>
                            <v-btn small
                                   color="#464646"
                                   @click="onEditClick(row.item)">
                                edycja
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import UniversalLoader from '../components/UniversalLoader.vue';
    import competitions from '../api/graphql-queries/fetchCompetitions.graphql';
    import {
        parseCompetitionURL,
        parseCompetitionDateRange,
        parseCompetitionUpdatedDate,
        getCompetitionLastUpdateFromCompetitionData
        // @ts-ignore
    } from '../client/competitionDataParseHelpers.ts';

    export default {
        apollo: {
            competitions: {
                prefetch: true,
                query: competitions,
                variables () {
                    return {
                        userId: this.$auth.user.sub
                    };
                }
            }
        },
        watch: {
            competitions () {
                if (this.competitions !== undefined) {
                    this.parseCompetitionsData(this.competitions);
                    this.loaded = true;
                }
            }
        },
        data () {
            return {
                loaded: false,
                headers: [
                    { text: 'Nazwa rozgrywek', value: 'name' },
                    { text: 'Link', value: 'link' },
                    { text: 'Data', value: 'dateRange' },
                    { text: 'Aktualizacja', value: 'updatedAt' },
                    { text: '', value: '' }
                ]
            };
        },
        components: {
            UniversalLoader
        },
        methods: {
            parseCompetitionsData (competitionsArr: any[]) {
                competitionsArr.forEach((el: any) => {
                    el.link = parseCompetitionURL(el.routeName);
                    el.dateRange = parseCompetitionDateRange(el.start, el.end);
                    el.updatedAt = parseCompetitionUpdatedDate(getCompetitionLastUpdateFromCompetitionData(el));
                });
            },
            onPreviewClick (item: any) {
                this.$router.push({
                    path: item.routeName
                });
            },
            onEditClick (item: any) {
                this.$router.push({
                    path: `edycja/${item.routeName}`
                });
            }
        },
        mounted () {
            this.loaded = false;
        }
    };
</script>

<style scoped>
    td.buttons-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    td.buttons-container > * {
        margin-left: 8px;
    }
</style>
