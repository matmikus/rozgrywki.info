<template>
    <v-layout>
        <universal-loader v-if="!loaded" />
        <v-flex v-if="loaded" class="text-center">
            <v-data-table
                :headers="headers"
                :items="competitions"
                :items-per-page="5"
                class="text-left"
            ></v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
    import UniversalLoader from '../components/UniversalLoader';
    import { gql } from "apollo-boost";

    export default {
        watch: {
            competitions: function () {
                if (this.competitions !== undefined) {
                    this.loaded = true;
                }
            }
        },
        data: function () {
            return {
                loaded: false,
                headers: [
                    { text: 'ID', value: 'id' },
                    { text: 'Nazwa rozgrywek', value: 'name' }
                ]
            }
        },
        apollo: {
            competitions: gql`query { competitions { name, id } }`,
        },
        components: {
            UniversalLoader
        }
    }
</script>