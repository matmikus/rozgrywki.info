<template>
    <logo :style="{ fill: 'navy' }"></logo>
</template>

<script lang="ts">
    import logo from '@/components/Logo.vue';

    export default {
        components: { logo },
        mounted () {
            console.log(this.$t('greeting'))
        }
    };
</script>
