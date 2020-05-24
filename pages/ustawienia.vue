<template>
    <v-layout>
        <v-flex>
            <v-simple-table>
                <tbody>
                    <tr>
                        <td>Login</td>
                        <td>{{ login }}</td>
                    </tr>
                    <tr>
                        <td>Nazwa użytkownika</td>
                        <td>{{ name }}</td>
                    </tr>
                    <tr>
                        <td>E-mail</td>
                        <td>{{ mail }}</td>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td>{{ id }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    export default {
        middleware: ['auth'],
        data () {
            return {
                login: this.$auth.user.nickname,
                name: this.$auth.user.name,
                mail: this.$auth.user.email,
                id: this.$auth.user.sub
            };
        }
    };
</script>
