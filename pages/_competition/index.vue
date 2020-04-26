<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
        <v-flex v-if="loaded" class="text-center">
            nazwa: {{ competition.name }}
        </v-flex>
    </v-layout>
</template>

<script>
    import UniversalLoader from '../../components/UniversalLoader';
    import fetchCompetition from '../../api/graphql-queries/fetchCompetition.gql';
    import { hasResults, getResultObject } from '../../client/graphqlHelpers';

    export default {
        apollo: {
            fetchedCompetition: {
                prefetch: true,
                query: fetchCompetition,
                variables () {
                    return {
                        route: this.$route.params.competition
                    }
                }
            }
        },
        watch: {
            fetchedCompetition: function () {
                if (hasResults((this.fetchedCompetition))) {
                    this.competition = getResultObject(this.fetchedCompetition);

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
                competition: {}
            }
        },
        components: {
            UniversalLoader
        }
    }
</script>