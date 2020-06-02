<template>
    <div>
        <competition-header></competition-header>
        <nuxt/>
    </div>
</template>

<script lang="ts">
    import appHeader from '@/components/DefaultHeader.vue';
    import competitionHeader from '@/components/CompetitionHeader.vue';

    export default {
        components: { appHeader, competitionHeader }
    };
</script>
