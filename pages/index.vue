<template>
    <div>
        index
        <h1>Color mode: {{ $colorMode.value }}</h1>
    </div>
</template>

<script lang="ts">
    export default {
        mounted () {
            console.log(this.$t('greeting'))
        }
    };
</script>
