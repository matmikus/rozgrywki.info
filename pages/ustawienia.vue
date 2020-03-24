<template>
    <v-layout>
        <v-flex class="text-center">
            witaj na swoim profilu {{ $auth.user ? $auth.user.name : '' }}
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        middleware: ['auth']
    }
</script>