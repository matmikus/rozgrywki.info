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
                    this.makeCompetitionsURLs(this.competitions);
                    this.loaded = true;
                }
            }
        },
        data () {
            return {
                loaded: false,
                headers: [
                    { text: 'Nazwa rozgrywek', value: 'name' },
                    { text: 'Link', value: 'link' }
                ]
            };
        },
        components: {
            UniversalLoader
        },
        methods: {
            makeCompetitionsURLs (competitionsArr: { link: string, routeName: string }[]) {
                competitionsArr.forEach((el: { link: string, routeName: string }) => {
                    el.link = `www.rozgrywki.info/${el.routeName}`;
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
