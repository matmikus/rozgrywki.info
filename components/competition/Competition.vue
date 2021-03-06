<template>
    <div id="competition-container">
        <div v-if="error" class="error">Nie ma takich rozgrywek :(</div>
        <template v-else-if="competition.name !== undefined">
            <div id="info-section" class="section-container">
                <div class="section-heading">
                    <div class="section-heading-icon">
                        <info-icon></info-icon>
                    </div>
                    INFO
                </div>
                <div class="section-content">
                    <competition-info :mode="mode"></competition-info>
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
                    <competition-games :mode="mode"></competition-games>
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
        props: ['routeNameParamName', 'mode'],
        apollo: {
            getCompetition: {
                prefetch: true,
                query: getCompetition,
                variables () {
                    return {
                        route: this.$route.params[this.routeNameParamName]
                    };
                }
            }
        },
        watch: {
            getCompetition (result: any) {
                if (result.length === 1) {
                    this.$store.dispatch('setCompetition', { competition: result[0], mode: this.mode });
                } else if (result.length === 0 && this.mode === 'edit') {
                    this.$store.dispatch('setEmptyCompetition');
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
        font-weight: 300;
        line-height: 24px;
        position: absolute;

        .error {
            text-align: center;
            color: var(--content1-color);
            padding-top: 32px;
        }

        .loader {
            position: fixed;
            top: calc(50% - 20px);
            left: calc(50% - 32px);
        }

        @media (orientation: landscape) {
            padding-left: 80px;
        }

        @media not all and (orientation: landscape) {
            padding-bottom: 48px;

            .loader {
                top: calc(50% - 60px);
                left: calc(50% - 32px);
            }
        }

        @media (orientation: landscape) and (max-width: 1000px) {
            padding-bottom: unset;
        }

        .section-container {
            padding: 54px 16px 54px 90px;
            box-sizing: border-box;

        }

        .section-container:not(:first-child) {
            padding-top: 0;
        }

        .section-heading, .section-content {
            color: var(--content1-color);
        }

        .section-heading {
            display: flex;
            align-items: center;
            font-weight: 800;
            font-size: 113%;
            color: var(--main-color);
            line-height: 1;
            margin-bottom: 24px;
        }

        .section-heading-icon {
            display: inline-flex;
            margin-right: 18px;
            margin-left: 2px;
        }

        .section-heading-icon > * {
            fill: var(--main-color);
        }

        @media (max-width: 1000px) {
            .section-content {
                overflow-x: auto;
            }

            .section-container {
                padding: 32px 0;
            }

            .section-heading {
                margin: 0 16px 24px 16px;
            }
        }
    }
</style>
