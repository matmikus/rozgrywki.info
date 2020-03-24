<template>
    <v-layout
        column
        justify-center
        align-center
    >
        <v-flex
            xs12
            sm8
            md6
        >
            <v-card>
                <v-card-title class="headline">
                    Fajnie, że tu jesteś!
                </v-card-title>
                <v-card-text>
                    <p>rozgrywki.info to całkowicie darmowa aplikacja przeglądarkowa do prowadzenia rozgrywek
                        sportowych i publikowania wyników w najprostszy możliwy sposób. Kibice i sportowcy otrzymują szansę śledzenia na bieżąco wyników i stanu zawodów.</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="primary"
                        nuxt
                        to="/inspire"
                    >
                        Start
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
