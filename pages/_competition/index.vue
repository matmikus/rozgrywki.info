<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-center">
            nazwa: {{ competitions[0].name }}
        </v-flex>
    </v-layout>
</template>

<script>
    import UniversalLoader from '../../components/UniversalLoader';
    import competition from '../../api/graphql-queries/fetchCompetition.gql';

    export default {
        apollo: {
            competitions: {
                prefetch: true,
                query: competition,
                variables () {
                    return {
                        route: this.$route.params.competition
                    }
                }
            }
        },
        watch: {
            competitions: function () {
                if (this.competitions !== undefined) {
                    if (this.competitions.length === 0) {
                        this.$router.push({
                            path: '404'
                        });
                    } else {
                        this.loaded = true;
                    }
                }
            }
        },
        data () {
            return {
                loaded: false
            }
        },
        components: {
            UniversalLoader
        },
        mounted () {
            console.log(this.$route.params.competition)
        }
    }
</script>