<template>
    <v-layout>
        <v-flex class="text-center">
            <universal-loader />
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import UniversalLoader from '../components/UniversalLoader.vue';

    export default {
        components: {
            UniversalLoader
        }
    };
</script>
