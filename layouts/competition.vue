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
        <snackbar :with-left-nav="true"></snackbar>
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
            },
            infoContentEl () {
                return this.$store.state.infoContentEl;
            },
            gamesContentEl () {
                return this.$store.state.gamesContentEl;
            }
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('resize', this.handleResize);
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
                if (!this.infoContentEl || !this.gamesContentEl) {
                    return;
                }

                this.navElementsRange = [];
                this.navElementsRange.push({
                    top: this.infoContentEl.offsetTop,
                    bottom: this.infoContentEl.offsetTop + this.infoContentEl.offsetHeight
                });
                this.navElementsRange.push({
                    top: this.gamesContentEl.offsetTop,
                    bottom: this.gamesContentEl.offsetTop + this.gamesContentEl.offsetHeight
                });
            }
        },
        watch: {
            scrollPosition (newPosition: number, prevPosition: number): void {
                if (this.navElementsRange.length === 0) {
                    return;
                }

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
            },
            infoContentEl (value: any) {
                if (value) {
                    this.handleResize();
                }
            },
            gamesContentEl (value: any) {
                if (value) {
                    this.handleResize();
                }
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
