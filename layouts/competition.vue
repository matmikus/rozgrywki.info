<template>
    <div class="layout-container">
        <transition name="component-fade" mode="out-in">
            <mobile-competition-scroll-header v-show="competitionScrollingDown"
                                style="z-index: 101"></mobile-competition-scroll-header>
        </transition>
        <app-header is-competition="true" style="z-index: 100"></app-header>
        <nuxt/>
        <competition-nav :small="competitionScrollingDown"></competition-nav>
        <actionDialog></actionDialog>
        <snackbar></snackbar>
    </div>
</template>

<script lang="ts">
    import appHeader from '@/components/DefaultHeader.vue';
    import mobileCompetitionScrollHeader from '@/components/MobileCompetitionScrollHeader.vue';
    import competitionNav from '@/components/CompetitionNav.vue';
    import actionDialog from '@/components/ActionDialog.vue';
    import snackbar from '@/components/Snackbar.vue';

    export default {
        components: {
            appHeader, mobileCompetitionScrollHeader, competitionNav, actionDialog, snackbar
        },
        data () {
            return {
                scrollPosition: null,
                navElementsRange: [],
                navActiveEl: 1
            };
        },
        computed: {
            competitionScrollingDown () {
                return this.$store.state.competitionScrollingDown;
            }
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('resize', this.handleScroll);
        },
        methods: {
            handleScroll (e: any): void {
                e.stopPropagation();
                this.scrollPosition = window.scrollY;
            },
            handleResize () {
                const infoContentEl = document.getElementById('info-section');
                const gamesContentEl = document.getElementById('games-section');

                if (!infoContentEl || !gamesContentEl) {
                    return;
                }

                this.navElementsRange = [];
                this.navElementsRange.push({
                    top: infoContentEl.offsetTop,
                    bottom: infoContentEl.offsetTop + infoContentEl.offsetHeight
                });
                this.navElementsRange.push({
                    top: gamesContentEl.offsetTop,
                    bottom: gamesContentEl.offsetTop + gamesContentEl.offsetHeight
                });
            }
        },
        watch: {
            scrollPosition (newPosition: number, prevPosition: number): void {
                if (window.innerWidth > 600 || newPosition < 4) {
                    this.$store.dispatch('setCompetitionScrollingDown', false);
                } else if (newPosition + this.$el.offsetHeight >= this.$el.scrollHeight) {
                    this.$store.dispatch('setCompetitionScrollingDown', true);
                } else {
                    this.$store.dispatch('setCompetitionScrollingDown', newPosition > prevPosition);
                }

                if (newPosition < this.navElementsRange[0].bottom - (window.innerHeight - 56) / 2 || newPosition < this.navElementsRange[0].top) {
                    this.$store.dispatch('moveBar', 1);
                } else if (newPosition < this.navElementsRange[1].bottom - (window.innerHeight - 56) / 2 || newPosition < this.navElementsRange[1].top) {
                    this.$store.dispatch('moveBar', 2);
                } else {
                    this.$store.dispatch('moveBar', 3);
                }
                console.log(this.navElementsRange)
                console.log(newPosition)
            }
        }
    };
</script>

<style lang="scss">
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity 500ms ease-in-out;
    }

    .component-fade-enter, .component-fade-leave-to {
        opacity: 0;
    }
</style>
