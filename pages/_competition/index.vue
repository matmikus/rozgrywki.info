<template>
    <competition :route-name-param-name="'competition'" :mode="'view'"></competition>
</template>

<script lang="ts">
    import Competition from '@/components/competition/Competition.vue';

    export default {
        middleware: 'resetCompetition',
        layout: 'competition',
        components: { Competition }
    };
</script>
