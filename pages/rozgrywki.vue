<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-center">
            <v-data-table
                :headers="headers"
                :items="competitions"
                :items-per-page="5"
                class="text-left"
                @click:row="handleClick"
            >
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import UniversalLoader from '../components/UniversalLoader.vue';
    import competitions from '../api/graphql-queries/fetchCompetitions.graphql';
    // @ts-ignore
    import { parseCompetitionURL, parseCompetitionDateRange, parseCompetitionUpdatedDatetime } from '../client/competitionDataParseHelpers.ts';

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
                    { text: 'Data', value: 'dateRange' },
                    { text: 'Aktualizacja', value: 'updatedAt' }
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
                    el.updatedAt = parseCompetitionUpdatedDatetime(el.updatedAt);
                });
            },
            handleClick (item: { routeName: string }) {
                this.$router.push({
                    path: item.routeName
                });
            }
        }
    };
</script>

<style>
    tbody tr {
        cursor: pointer
    }
</style>
