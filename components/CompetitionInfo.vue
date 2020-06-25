<template>
    <div id="competition-info-container">
        <div>nazwa: {{ competition.name }}</div>
        <div>link: {{ competition.fullRoute }}</div>
        <div>opis: {{ competition.description }}</div>
        <div>początek: {{ competition.start }}</div>
        <div>koniec: {{ competition.end }}</div>
        <div>ostatnia aktualizacja: {{ getFormattedDatetime(competition.updatedAt) }}</div>
    </div>
</template>

<script lang="ts">
    export default {
        computed: {
            competition () {
                return this.$store.state.competition;
            }
        },
        methods: {
            getFormattedDatetime (data: any) {
                return this.$dayjs(data).format('YYYY-MM-DD HH:mm');
            }
        }
    }
</script>

<style lang="scss">
    #competition-info-container {

    }
</style>
