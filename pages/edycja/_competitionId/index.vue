<template>
    <v-layout>
        <v-flex class="text-center">
            <span v-if="this.$route.params.competition">formularz edycji rozgrywek o id {{ this.$route.params.competition }}</span>
            <span v-else>formularz dodania nowych rozgrywek</span>
        </v-flex>
    </v-layout>
</template>
