<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-center">
            <v-data-table
                :headers="headers"
                :items="competitions"
                :items-per-page="10"
                :mobile-breakpoint="0"
                class="text-left"
                @click:row="handleClick"
                id="competitions-list-data-table">
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
    } from '../client/competitionDataParseHelpers';

    export default {
        apollo: {
            competitions: {
                prefetch: true,
                query: competitions
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
                    { text: 'Data', value: 'dateRange', align: 'center' },
                    { text: 'Aktualizacja', value: 'updatedAt', align: 'center' }
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
            handleClick (item: { routeName: string }) {
                this.$router.push({
                    path: item.routeName
                });
            }
        },
        mounted () {
            this.loaded = false;
        }
    };
</script>

<style>
    #competitions-list-data-table {
        white-space: nowrap;
    }

    #competitions-list-data-table .v-data-table__wrapper {
        cursor: pointer !important;
    }
</style>
