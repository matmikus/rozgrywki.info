<template>
    <v-layout>
        <v-flex class="text-center">
            <universal-loader />
        </v-flex>
    </v-layout>
</template>

<script>
    import UniversalLoader from '../components/UniversalLoader';

    export default {
        components: {
            UniversalLoader
        }
    }
</script>