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

<script>
    import UniversalLoader from '../components/UniversalLoader';
    import competitions from '../api/graphql-queries/fetchCompetitions.graphql';

    export default {
        apollo: {
            competitions: {
                prefetch: true,
                query: competitions
            }
        },
        watch: {
            competitions: function () {
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
            }
        },
        components: {
            UniversalLoader
        },
        methods: {
            makeCompetitionsURLs (competitions) {
                competitions.forEach(el => {
                    el.link = `www.rozgrywki.info/${el.routeName}`;
                });
            },
            handleClick (item) {
                this.$router.push({
                    path: item.routeName
                });
            },
        }
    }
</script>