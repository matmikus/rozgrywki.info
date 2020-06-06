<template>
    <div id="competition-container">
        <div id="info-content"
             v-waypoint="{ active: true, callback: onActive, options: waypointOptions }"><h3>
            INFO</h3>
            Competition lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum. Competition lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div id="games-content"
             v-waypoint="{ active: true, callback: onActive, options: waypointOptions }"><h3>
            MECZE</h3>Competition lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Competition lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div id="cup-content"
             v-waypoint="{ active: true, callback: onActive, options: waypointOptions }"><h3>
            DRABINKA</h3>Competition lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Competition lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        layout: 'competition',
        data () {
            return {
                waypointOptions: {
                    threshold: 0.5
                }
            }
        },
        methods: {
            onActive (event: { el: { id: string }, going: any, direction: any }) {
                if (event.direction !== undefined && event.going === this.$waypointMap.GOING_IN) {
                    const data: { [key: string]: { top: string, left: string } } = {
                        'info-content': { top: '0', left: '0' },
                        'games-content': { top: '72px', left: '33%' },
                        'cup-content': { top: '144px', left: '67%' }
                    };

                    this.$store.commit('moveBar', data[event.el.id]);
                }
            }
        }
    }
</script>

<style lang="scss">
    #competition-container {
        min-height: 100%;
        padding-top: 56px;
        padding-bottom: 48px;
        box-sizing: border-box;

        @media (orientation: landscape) {
            padding-bottom: unset;
            padding-left: 80px;
        }

        div {
            padding: 16px;
        }
    }

    .dark-mode {
        #competition-container {
            color: $text-color-dark;
            background-color: $background-color-dark;
        }
    }

    .light-mode {
        #competition-container {
            color: $text-color-light;
            background-color: $background-color-light;
        }
    }
</style>
