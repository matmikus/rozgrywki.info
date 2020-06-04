<template>
    <div class="layout-container">
        <transition name="component-fade" mode="out-in">
            <competition-header v-show="competitionHeader"
                                style="z-index: 101"
                                :competition-name="'Puchar Burmistrza Pcimia Górnego 2021'"></competition-header>
        </transition>
        <app-header style="z-index: 100"
                    :competition-name="'Puchar Burmistrza Pcimia Górnego 2021'"></app-header>
        <nuxt/>
        <competition-nav></competition-nav>
    </div>
</template>

<script lang="ts">
    import appHeader from '@/components/DefaultHeader.vue';
    import competitionHeader from '@/components/CompetitionHeader.vue';
    import competitionNav from '@/components/CompetitionNav.vue';

    export default {
        components: { appHeader, competitionHeader, competitionNav },
        data () {
            return {
                competitionHeader: false,
                scrollPosition: null
            }
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll (e: any): void {
                e.stopPropagation();
                this.scrollPosition = window.scrollY;
            }
        },
        watch: {
            scrollPosition (newPosition: number, prevPosition: number): void {
                if (window.innerWidth > 600) {
                    this.competitionHeader = false;
                } else {
                    this.competitionHeader = newPosition > prevPosition;
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
