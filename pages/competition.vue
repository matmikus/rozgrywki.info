<template>
    <div id="competition-container">
        <div id="info-section" class="section-container">
            <div class="section-heading">INFO</div>
            <div class="section-content">Competition lorem ipsum dolor sit amet, consectetur
                adipiscing elit, ing do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum. Competition lorem ipsum dolor sit amet,
                consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in
                culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
        <div id="games-section" class="section-container">
            <div class="section-heading">MECZE</div>
            <div class="section-content">
                Competition lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in
                culpa qui officia deserunt mollit anim id est laborum. Competition lorem ipsum dolor
                sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
        <div id="cup-section" class="section-container">
            <div class="section-heading">DRABINKA</div>
            <div class="section-content">
                Competition lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in
                culpa qui officia deserunt mollit anim id est laborum. Competition lorem ipsum dolor
                sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Competition
                lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in
                culpa qui officia deserunt mollit anim id est laborum. Competition lorem ipsum dolor
                sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        layout: 'competition',
        mounted () {
            this.$store.dispatch('mockCompetitionData');
        }
    };
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

        .section-container {
            padding: 16px;
        }
    }

    .dark-mode {
        #competition-container {
            background-color: $background-color-dark;

            .section-heading, .section-content {
                color: $text-color-dark;
            }
        }
    }

    .light-mode {
        #competition-container {
            background-color: $background-color-light;

            .section-heading, .section-content {
                color: $text-color-light;
            }
        }
    }
</style>
