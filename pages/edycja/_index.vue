<template>
    <div id="edit-container">
        <competition v-if="!saving"
                     :route-name-param-name="'index'"
                     :mode="'edit'"
                     ref="competitionContainer"></competition>
        <div v-if="!saving"
             class="floating-button"
             :is-scrolling="isScrolling"
             @click="onSaveClick">
            <save-icon class="floating-button-icon"></save-icon>
            <div class="floating-button-text">ZAPISZ</div>
        </div>
        <loader v-if="saving"></loader>
    </div>
</template>

<script lang="ts">
    import loader from '@/components/Loader.vue';
    import Competition from '@/components/competition/Competition.vue';
    import SaveIcon from '@/assets/icons/save.svg';
    import updateCompetition from '@/graphql/updateCompetition.graphql';
    import updateContainer from '@/graphql/updateContainer.graphql';
    import updateCompetitor from '@/graphql/updateCompetitor.graphql';
    import updateGame from '@/graphql/updateGame.graphql';
    import insertCompetition from '@/graphql/insertCompetition.graphql';
    import insertCompetitor from '@/graphql/insertCompetitor.graphql';
    import insertContainer from '@/graphql/insertContainer.graphql';
    import insertStage from '@/graphql/insertStage.graphql';
    import insertGame from '@/graphql/insertGame.graphql';
    import deleteCompetition from '@/graphql/deleteCompetition.graphql';
    import deleteCompetitor from '@/graphql/deleteCompetitor.graphql';
    import deleteContainer from '@/graphql/deleteContainer.graphql';
    import deleteGame from '@/graphql/deleteGame.graphql';
    import deleteStage from '@/graphql/deleteStage.graphql';
    import { getUserId, getUserData } from '@/scripts/getUserId.ts';

    export default {
        middleware: ['authenticated', 'resetCompetition'],
        layout: 'competition',
        components: { Competition, SaveIcon, loader },
        computed: {
            isScrolling () {
                return this.$store.state.competitionScrollingDown;
            },
            competition () {
                return this.$store.state.competition;
            },
            isNew () {
                return !this.$store.state.competitionEditLock;
            }
        },
        data () {
            return {
                saving: false,
                gamesCopy: []
            }
        },
        methods: {
            async onSaveClick () {
                this.$store.dispatch('closeSnackbar');
                this.saving = true;

                if (this.hasFormErrors()) {
                    this.saving = false;
                    this.$store.dispatch('showSnackbar', {
                        message: 'Niepoprawne dane. Popraw formularz.',
                        actionText: 'OK'
                    });

                    return;
                }

                if (this.isNew) {
                    if (this.hasEmptyValues()) {
                        this.saving = false;
                        this.$store.dispatch('showSnackbar', {
                            message: 'Uzupełnij wszystkie pola formularza.',
                            actionText: 'OK'
                        });

                        return;
                    }

                    let competitionId: number;
                    let containerId: number;
                    let stageId: number;

                    this.insertCompetition()
                        .then((res: any) => {
                            competitionId = res.data.insertCompetition.returning[0].id;
                            return this.insertStage(competitionId);
                        })
                        .then((res: any) => {
                            stageId = res.data.insertStage.returning[0].id;
                            return this.insertContainer(stageId);
                        })
                        .then((res: any) => {
                            containerId = res.data.insertContainer.returning[0].id;

                            return this.insertCompetitors(containerId);
                        })
                        .then(() => this.insertGames(containerId))
                        .then(() => this.onSaveSuccess(true))
                        .catch(() => {
                            this.deleteGame(containerId)
                                .then(() => this.deleteCompetitor(containerId))
                                .then(() => this.deleteContainer(stageId))
                                .then(() => this.deleteStage(competitionId))
                                .then(() => this.deleteCompetition(competitionId));

                            this.onSaveSuccess(false);
                        });

                    return;
                }

                this.updateCompetition()
                    .then(() => this.updateContainer())
                    .then(() => this.updateCompetitors())
                    .then(() => this.updateGames())
                    .then(() => this.onSaveSuccess(true))
                    .catch(() => this.onSaveSuccess(false));
            },
            hasFormErrors () {
                const getErrors = (component: any) => {
                    if (component.$children === undefined || component.$children.length === 0) {
                        return [component.error];
                    } else {
                        const arr = component.$children;

                        return arr.map((el: any) => getErrors(el));
                    }
                };

                return getErrors(this.$refs.competitionContainer).flat(999).includes(true);
            },
            hasEmptyValues () {
                const getValues = (component: any) => {
                    if (component.$children === undefined || component.$children.length === 0) {
                        return [component.inputValue === '' || component.newValue === '' || component.selected === ''];
                    } else {
                        const arr = component.$children;

                        return arr.map((el: any) => getValues(el));
                    }
                };

                return getValues(this.$refs.competitionContainer).flat(999).includes(true);
            },
            updateCompetition () {
                const competition = this.competition;

                return this.$apollo.mutate({
                    mutation: updateCompetition,
                    variables: {
                        id: competition.id,
                        description: competition.description,
                        end: competition.end,
                        name: competition.name,
                        routeName: competition.routeName,
                        start: competition.start
                    }
                });
            },
            updateContainer () {
                const container = this.competition.stages[0].containers[0];

                return this.$apollo.mutate({
                    mutation: updateContainer,
                    variables: {
                        id: container.id,
                        drawPoints: container.drawPoints,
                        isDrawEnabled: container.isDrawEnabled,
                        loserPoints: container.loserPoints,
                        winnerPoints: container.winnerPoints,
                        onePointLoserPoints: container.onePointLoserPoints,
                        onePointWinnerPoints: container.onePointWinnerPoints,
                        rankDirectGameOrder: container.rankDirectGameOrder,
                        rankGamesAmountOrder: container.rankGamesAmountOrder,
                        rankGamesRatioOrder: container.rankGamesRatioOrder,
                        rankPointsOrder: container.rankPointsOrder,
                        rankResultsRatioOrder: container.rankResultsRatioOrder
                    }
                });
            },
            updateCompetitors () {
                const arr = [];

                for (let competitor of this.competition.stages[0].containers[0].competitors) {
                    arr.push(this.$apollo.mutate({
                        mutation: updateCompetitor,
                        variables: {
                            id: competitor.id,
                            name: competitor.name
                        }
                    }));
                }

                return Promise.all(arr);
            },
            updateGames () {
                const arr = [];

                for (let game of this.competition.stages[0].containers[0].games) {
                    arr.push(this.$apollo.mutate({
                        mutation: updateGame,
                        variables: {
                            id: game.id,
                            aCompetitorId: game.aCompetitor !== null ? game.aCompetitor.id : null,
                            bCompetitorId: game.bCompetitor !== null ? game.bCompetitor.id : null,
                            aResult: game.aResult,
                            bResult: game.bResult,
                            date: game.date,
                            details: game.details
                        }
                    }));
                }

                return Promise.all(arr);
            },
            insertCompetition () {
                const competition = this.competition;

                return this.$apollo.mutate({
                    mutation: insertCompetition,
                    variables: {
                        description: competition.description,
                        end: competition.end,
                        name: competition.name,
                        routeName: competition.routeName,
                        start: competition.start,
                        userId: getUserId(this),
                        userData: getUserData(this)
                    }
                });
            },
            insertStage (competitionId: number) {
                return this.$apollo.mutate({
                    mutation: insertStage,
                    variables: {
                        competitionId: competitionId
                    }
                });
            },
            insertContainer (stageId: number) {
                const container = this.competition.stages[0].containers[0];

                return this.$apollo.mutate({
                    mutation: insertContainer,
                    variables: {
                        stageId: stageId,
                        type: container.type,
                        size: container.size,
                        isDouble: container.isDouble,
                        winnerPoints: container.winnerPoints,
                        loserPoints: container.loserPoints,
                        drawPoints: container.drawPoints,
                        isDrawEnabled: container.isDrawEnabled,
                        onePointWinnerPoints: container.onePointWinnerPoints,
                        onePointLoserPoints: container.onePointLoserPoints,
                        rankPointsOrder: container.rankPointsOrder,
                        rankGamesRatioOrder: container.rankGamesRatioOrder,
                        rankResultsRatioOrder: container.rankResultsRatioOrder,
                        rankGamesAmountOrder: container.rankGamesAmountOrder,
                        rankDirectGameOrder: container.rankDirectGameOrder
                    }
                });
            },
            insertCompetitors (containerId: number) {
                this.gamesCopy = JSON.parse(JSON.stringify(this.competition.stages[0].containers[0].games));
                const arr = [];

                for (let competitor of this.competition.stages[0].containers[0].competitors) {
                    arr.push(this.$apollo.mutate({
                        mutation: insertCompetitor,
                        variables: {
                            containerId: containerId,
                            name: competitor.name
                        }
                    }).then((res: any) => this.setCompetitorsRealId(res.data.insertCompetitor.returning[0])));
                }

                return Promise.all(arr);
            },
            setCompetitorsRealId (data: any) {
                this.gamesCopy.map((el: any) => {
                    if (el.aCompetitor !== null && el.aCompetitor.name === data.name) {
                        el.aCompetitor.id = data.id;
                    } else if (el.bCompetitor !== null && el.bCompetitor.name === data.name) {
                        el.bCompetitor.id = data.id;
                    }

                    return el;
                });

                return Promise.resolve(true);
            },
            insertGames (containerId: number) {
                const arr = [];

                for (let game of this.gamesCopy) {
                    arr.push(this.$apollo.mutate({
                        mutation: insertGame,
                        variables: {
                            containerId: containerId,
                            number: game.number,
                            aCompetitorId: game.aCompetitor ? game.aCompetitor.id : null,
                            bCompetitorId: game.bCompetitor ? game.bCompetitor.id : null,
                            aResult: game.aResult,
                            bResult: game.bResult,
                            date: game.date,
                            details: game.details
                        }
                    }));
                }

                return Promise.all(arr);
            },
            deleteCompetition (competitionId: number) {
                if (!competitionId) {
                    return Promise.resolve(false);
                }

                return this.$apollo.mutate({
                    mutation: deleteCompetition,
                    variables: {
                        id: competitionId
                    }
                });
            },
            deleteCompetitor (containerId: number) {
                if (!containerId) {
                    return Promise.resolve(false);
                }

                return this.$apollo.mutate({
                    mutation: deleteCompetitor,
                    variables: {
                        containerId: containerId
                    }
                });
            },
            deleteContainer (stageId: number) {
                if (!stageId) {
                    return Promise.resolve(false);
                }

                return this.$apollo.mutate({
                    mutation: deleteContainer,
                    variables: {
                        stageId: stageId
                    }
                });
            },
            deleteGame (containerId: number) {
                if (!containerId) {
                    return Promise.resolve(false);
                }

                return this.$apollo.mutate({
                    mutation: deleteGame,
                    variables: {
                        containerId: containerId
                    }
                });
            },
            deleteStage (competitionId: number) {
                if (!competitionId) {
                    return Promise.resolve(false);
                }

                return this.$apollo.mutate({
                    mutation: deleteStage,
                    variables: {
                        competitionId: competitionId
                    }
                });
            },
            onSaveSuccess (success: Boolean) {
                this.saving = false;

                setTimeout(() => {
                    if (success) {
                        this.$store.dispatch('showSnackbar', {
                            message: 'Zapisano pomyślnie!'
                        });
                    } else {
                        this.$store.dispatch('showSnackbar', {
                            message: 'Wystąpił błąd podczas zapisu.',
                            actionText: 'OK'
                        });
                    }
                }, 200);
            }
        }
    };
</script>

<style lang="scss">
    #edit-container {
        position: relative;
        height: 100%;

        .floating-button {
            height: 48px;
            min-width: 48px;
            box-sizing: border-box;
            position: fixed;
            bottom: 32px;
            right: 32px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: var(--main-color);
            cursor: pointer;
            border-radius: 24px;
            padding: 8px;
        }

        .floating-button-text {
            color: #fff;
            width: 0;
            overflow: hidden;
            transition: width 250ms ease-in-out;
            text-transform: uppercase;
            font-weight: 500;
            font-size: 16px;
            text-align: center;
        }

        .floating-button-icon {
            fill: #fff;
            width: 32px;
            height: 32px;
        }

        @media (orientation: landscape) {
            .floating-button:hover > .floating-button-text {
                width: 80px;
            }

            .floating-button:hover {
                padding: 8px 16px;
            }
        }

        .floating-button:not([is-scrolling]) > .floating-button-text {
            width: 80px;
        }

        .floating-button:not([is-scrolling]) {
            padding: 8px 16px;
        }

        @media not all and (orientation: landscape) {
            .floating-button {
                bottom: 92px;
                right: 16px;
                transition: bottom 250ms ease-in-out;
            }

            .floating-button[is-scrolling] {
                bottom: 64px;
            }
        }
    }
</style>
