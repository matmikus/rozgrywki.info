<template>
    <div>
        <logo :style="{ fill: 'navy' }"></logo>
        default header
    </div>
</template>

<script lang="ts">
    import logo from '@/components/Logo.vue';

    export default {
        components: { logo },
    };
</script>
