<template>
    <v-layout>
        <universal-loader v-if="!loaded"/>
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

    export default {
        watch: {
            competitions: function () {
                if (this.competitions !== undefined) {
                    this.loaded = true;
                }
            }
        },
        data () {
            return {
                loaded: false,
                headers: [
                    { text: 'ID', value: 'id' },
                    { text: 'Nazwa rozgrywek', value: 'name' }
                ],
                competitions: []
            }
        },
        components: {
            UniversalLoader
        },
        mounted () {
            this.$axios
                .$get('/api/competitions')
                .then(response => (this.competitions = response.competitions));
        }
    }
</script>