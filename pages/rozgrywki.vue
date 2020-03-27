<template>
    <v-layout>
        <v-flex class="text-center">
            rozgrywki
        </v-flex>
    </v-layout>
</template>

<script>
    import { ApolloClient, HttpLink, InMemoryCache, gql } from "apollo-boost";

    export default {
        mounted () {
            // GRAPHQL ENDPOINT TEST
            const GET_COMPETITIONS = gql`query { competitions { name, id } }`;

            const httpLink = new HttpLink({
                uri: "https://rozgrywki-graphql-postgres-dev.herokuapp.com/v1/graphql"
            });

            const client = new ApolloClient({
                link: httpLink,
                cache: new InMemoryCache()
            });

            console.time('czas trwania');
            client.query({
                query: GET_COMPETITIONS
            })
            .then(result => {console.log(result); console.timeEnd('czas trwania');;});
        }
    }
</script>