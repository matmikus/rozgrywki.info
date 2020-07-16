<template>
    <div id="competition-container">
        <div v-if="error" class="error">Nie ma takich rozgrywek :(</div>
        <template v-else-if="competition.name">
            <div id="info-section" class="section-container">
                <div class="section-heading">
                    <div class="section-heading-icon">
                        <info-icon></info-icon>
                    </div>
                    INFO
                </div>
                <div class="section-content">
                    <competition-info></competition-info>
                </div>
            </div>
            <div id="games-section" class="section-container">
                <div class="section-heading">
                    <div class="section-heading-icon">
                        <games-icon></games-icon>
                    </div>
                    MECZE
                </div>
                <div class="section-content">
                    <competition-games></competition-games>
                </div>
            </div>
            <div id="cup-section" class="section-container">
                <div class="section-heading">
                    <div class="section-heading-icon">
                        <component :is="competitionSummaryIconName"></component>
                    </div>
                    {{ competitionSummaryName }}
                </div>
                <div class="section-content">
                    <competition-summary></competition-summary>
                </div>
            </div>
        </template>
        <div v-else class="loader">
            <loader></loader>
        </div>
    </div>
</template>

<script lang="ts">
    import loader from '@/components/Loader.vue';
    import cupIcon from '@/assets/icons/graph.svg';
    import rankingIcon from '@/assets/icons/format_list_numbered.svg';
    import infoIcon from '@/assets/icons/info.svg';
    import gamesIcon from '@/assets/icons/reorder.svg';
    import getCompetition from '@/graphql/getCompetition.graphql';
    import competitionInfo from '@/components/competition/CompetitionInfo.vue';
    import competitionGames from '@/components/competition/CompetitionGames.vue';
    import competitionSummary from '@/components/competition/CompetitionSummary.vue';

    export default {
        layout: 'competition',
        middleware: 'resetCompetition',
        components: {
            loader,
            cupIcon,
            rankingIcon,
            infoIcon,
            gamesIcon,
            competitionInfo,
            competitionGames,
            competitionSummary
        },
        data () {
            return {
                error: false
            };
        },
        computed: {
            competition () {
                return this.$store.state.competition;
            },
            competitionSummaryName () {
                return this.$store.state.competitionSummary.name;
            },
            competitionSummaryIconName () {
                return this.$store.state.competitionSummary.iconName;
            }
        },
        apollo: {
            getCompetition: {
                prefetch: true,
                query: getCompetition,
                variables () {
                    return {
                        route: this.$route.params.competition
                    };
                }
            }
        },
        watch: {
            getCompetition (result: any) {
                if (result.length === 1) {
                    this.$store.dispatch('setCompetition', result[0]);
                } else {
                    this.error = true;
                }
            },
            competition (data: any) {
                if (this.competition.name && this.competition.name.length > 0) {
                    document.title = this.competition.name;
                }

                if (Object.keys(data).length > 0) {
                    setTimeout(() => {
                        this.setContentRefs();
                    }, 100);
                }
            }
        },
        methods: {
            setContentRefs () {
                const infoContentEl = document.getElementById('info-section');
                const gamesContentEl = document.getElementById('games-section');

                this.$store.dispatch('setContentRefs', {
                    infoContentEl: infoContentEl,
                    gamesContentEl: gamesContentEl
                });
            }
        }
    };
</script>

<style lang="scss">
    #competition-container {
        min-height: 100%;
        padding-top: 56px;
        padding-bottom: 16px;
        box-sizing: border-box;
        background-color: var(--content-bg-color);
        font-weight: 300;
        letter-spacing: 1px;
        line-height: 24px;
        position: absolute;

        .error {
            text-align: center;
            color: var(--content-txt-color);
            padding-top: 32px;
        }

        .loader {
            position: fixed;
            top: calc(50% - 20px);
            left: calc(50%);
        }

        @media (orientation: landscape) {
            padding-left: 80px;
        }

        @media not all and (orientation: landscape) {
            padding-bottom: 48px;

            .loader {
                top: calc(50% - 60px);
                left: calc(50% - 40px);
            }
        }

        @media (orientation: landscape) and (max-width: 1000px) {
            padding-bottom: unset;
        }

        .section-container {
            padding: 32px 48px;
        }

        .section-container:not(:first-child) {
            padding-top: 0;
        }

        .section-heading, .section-content {
            color: var(--content-txt-color);
        }

        .section-heading {
            display: flex;
            align-items: center;
            font-weight: 800;
            letter-spacing: 2px;
            font-size: 120%;
            color: var(--main-color);
            line-height: 1;
            margin-bottom: 8px;
        }

        .section-heading-icon {
            display: inline-flex;
            margin-right: 12px;
        }

        .section-heading-icon > * {
            fill: var(--main-color);
        }

        @media (max-width: 1000px) {
            .section-content {
                overflow-x: auto;
            }

            .section-container {
                padding: 16px 0;
            }

            .section-heading {
                margin: 0 16px 8px 16px;
            }
        }
    }
</style>
