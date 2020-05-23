<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
            <v-card>
                <v-card-title class="headline">
                    To jest prototyp aplikacji!
                </v-card-title>
                <v-card-text>
                    <p>Możliwość dodawania, edytowania i śledzenia nieskomplikowanych rozgrywek
                        sportowych w systemie pucharowym lub każdy z każdym. Wersja graficzna na szybko.
                        <br>Prototyp stworzony do zbadania tematu i wyznaczenia kierunków rozwoju
                        wersji docelowej. Enjoy!</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" nuxt to="/rozgrywki">
                        Rozgrywki
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
