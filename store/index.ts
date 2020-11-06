import { getGroupRanking } from '@/scripts/getGroupRanking';
import { generateGamesForContainer } from '@/scripts/generateGames';

export const state = () => ({
    bar: {
        position: 1,
        blocked: false
    },
    competitionScrollingDown: false,
    competition: {},
    competitionEditLock: true,
    competitionSummary: {
        name: '',
        iconName: ''
    },
    snackbar: {
        message: '',
        actionText: '',
        visible: false,
        autoCloseCountDown: null
    },
    actionDialog: {
        heading: '',
        message: '',
        cancelText: '',
        okText: '',
        visible: false
    },
    infoContentEl: null,
    gamesContentEl: null
});

export const mutations = {
    moveBar (state: any, position: number) {
        if (state.bar.blocked) {
            return;
        }

        state.bar.position = position;
    },
    lockedBar (state: any, locked: boolean) {
        state.bar.blocked = locked;
    },
    setCompetitionScrollingDown (state: any, value: boolean) {
        state.competitionScrollingDown = value;
    },
    showSnackbar (state: any, data: { message: string, actionText: string }) {
        state.snackbar.message = data.message;
        state.snackbar.actionText = data.actionText;
        state.snackbar.visible = true;
        state.snackbar.autoCloseCountDown = 4;
    },
    snackbarCountDownDecrement (state: any) {
        state.snackbar.autoCloseCountDown--;
    },
    closeSnackbar (state: any) {
        state.snackbar.visible = false;
    },
    showActionDialog (state: any, data: { heading: string, message: string, cancelText: string | undefined, okText: string }) {
        state.actionDialog.heading = data.heading;
        state.actionDialog.message = data.message;
        state.actionDialog.cancelText = data.cancelText;
        state.actionDialog.okText = data.okText;
        state.actionDialog.visible = true;
    },
    async closeActionDialog (state: any, resolveValue: boolean) {
        state.actionDialog.visible = false;
        state.actionDialog.promiseResolve(resolveValue);
    },
    setCompetition (state: any, data: any) {
        state.competition = data.competition;

        const types = data.competition.stages.reduce((acc: any, stage: any) => {
            acc.push(stage.containers.reduce((acc2: any, container: any) => {
                acc2.push(container.type);
                return acc2;
            }, []));
            return acc;
        }, []).flat();

        if (data.mode === 'edit') {
            state.competitionSummary.name = 'PODGLĄD';
            state.competitionSummary.iconName = 'cupIcon';
        } else if (types.includes('cup')) {
            state.competitionSummary.name = 'DRABINKA';
            state.competitionSummary.iconName = 'cupIcon';
        } else {
            state.competitionSummary.name = 'TABELA';
            state.competitionSummary.iconName = 'rankingIcon';
        }

        state.competition.fullRoute = `www.rozgrywki.info/${data.competition.routeName}`;
        state.competitionEditLock = true;
    },
    setCompetitionGroupRanking (state: any) {
        for (const stage of state.competition.stages) {
            for (const container of stage.containers) {
                if (container.type === 'group') {
                    container.ranking = getGroupRanking(container);
                }
            }
        }
    },
    setCompetitionCompetitorsFromGames (state: any) {
        for (const stage of state.competition.stages) {
            for (const container of stage.containers) {
                let competitors: any = [];

                for (const game of container.games) {
                    if (game.aCompetitor !== null && competitors.find((el: any) => el.id === game.aCompetitor.id) === undefined) {
                        competitors.push({ id: game.aCompetitor.id, name: game.aCompetitor.name });
                    }

                    if (game.bCompetitor !== null && competitors.find((el: any) => el.id === game.bCompetitor.id) === undefined) {
                        competitors.push({ id: game.bCompetitor.id, name: game.bCompetitor.name });
                    }
                }

                container.competitors = competitors.sort((a: any, b: any) => a.id - b.id);
            }
        }
    },
    setEmptyCompetition (state: any) {
        state.competition = {
            description: '',
            end: '',
            name: '',
            routeName: '',
            stages: [{
                promotionCount: null,
                sequenceNumber: 1,
                containers: [{
                    competitors: [{ name: '', id: 0 }, { name: '', id: 1 }],
                    drawPoints: null,
                    games: [],
                    isDouble: false,
                    isDoubleEliminationCup: false,
                    isDrawEnabled: false,
                    loserPoints: null,
                    name: null,
                    onePointLoserPoints: null,
                    onePointWinnerPoints: null,
                    rankDirectGameOrder: 5,
                    rankGamesAmountOrder: 4,
                    rankGamesRatioOrder: 2,
                    rankPointsOrder: 1,
                    rankResultsRatioOrder: 3,
                    size: 2,
                    type: undefined,
                    winnerPoints: null
                }],
            }],
            start: '',
            updatedAt: ''
        };

        state.competitionSummary.name = 'PODGLĄD';
        state.competitionSummary.iconName = 'cupIcon';
        state.competitionEditLock = false;
    },
    setContentRefs (state: any, refs: any) {
        state.infoContentEl = refs.infoContentEl;
        state.gamesContentEl = refs.gamesContentEl;
    },
    resetBar (state: any) {
        state.bar = {
            position: 1,
            blocked: false
        };
    },
    resetCompetition (state: any) {
        state.competition = {};
        state.competitionSummary = {
            name: '',
            iconName: ''
        };
    },
    setCompetitionDrawEnabled (state: any, value: boolean) {
        state.competition.stages[0].containers[0].isDrawEnabled = value;
    },
    setCompetitionWinnerPoints (state: any, value: number) {
        state.competition.stages[0].containers[0].winnerPoints = value;
    },
    setCompetitionLoserPoints (state: any, value: number) {
        state.competition.stages[0].containers[0].loserPoints = value;
    },
    setCompetitionDrawPoints (state: any, value: number) {
        state.competition.stages[0].containers[0].drawPoints = value;
    },
    setCompetitionOnePointWinnerPoints (state: any, value: number) {
        state.competition.stages[0].containers[0].onePointWinnerPoints = value;
    },
    setCompetitionOnePointLoserPoints (state: any, value: number) {
        state.competition.stages[0].containers[0].onePointLoserPoints = value;
    },
    setCompetitionRankOrder (state: any, orderArr: any) {
        for (const el of orderArr) {
            state.competition.stages[0].containers[0][el.property] = orderArr.indexOf(el) + 1;
        }
    },
    setCompetitionSize (state: any, size: number) {
        state.competition.stages[0].containers[0].size = size;
    },
    setCompetitorName (state: any, data: any) {
        state.competition.stages[0].containers[0].competitors[data.index].name = data.name;

        const id = state.competition.stages[0].containers[0].competitors[data.index].id;

        state.competition.stages[0].containers[0].games.forEach((game: any) => {
            if (game.aCompetitor !== null && game.aCompetitor.id === id) {
                game.aCompetitor.name = data.name;
            } else if (game.bCompetitor !== null && game.bCompetitor.id === id) {
                game.bCompetitor.name = data.name;
            }
        });
    },
    setEmptyCompetitorsList (state: any, size: number) {
        let arr: any = [];

        for (let i = 0; i < size; i++) {
            arr.push({ name: '', id: i });
        }

        state.competition.stages[0].containers[0].competitors = arr;
    },
    setCompetitionName (state: any, value: string) {
        state.competition.name = value;
    },
    setCompetitionRouteName (state: any, value: string) {
        state.competition.routeName = value;
    },
    setCompetitionDescription (state: any, value: string) {
        state.competition.description = value;
    },
    setCompetitionStartDate (state: any, value: string) {
        state.competition.start = value;
    },
    setCompetitionEndDate (state: any, value: string) {
        state.competition.end = value;
    },
    setCompetitionType (state: any, value: string) {
        state.competition.stages[0].containers[0].type = value;
    },
    setCompetitionIsDouble (state: any, value: boolean) {
        state.competition.stages[0].containers[0].isDouble = value;
    },
    setCompetitionResultData (state: any, data: any) {
        if (!data || !data.id) {
            return false;
        }

        const game = state.competition.stages[0].containers[0].games.find((el: any) => el.id === data.id);

        if (state.competition.stages[0].containers[0].type === 'cup') {
            const getNextGameNumber = (gameNumber: number) => {
                let cupSize = 2;
                while (cupSize < state.competition.stages[0].containers[0].size) {
                    cupSize *= 2;
                }

                let round = 1;
                let currentRound = cupSize / 2;
                let previousRound = 0;
                while (gameNumber > currentRound) {
                    round++;
                    previousRound = currentRound;
                    currentRound += cupSize / Math.pow(2, round);
                }

                const gameNumberInRound = gameNumber - previousRound;
                const nextGameNumber = Math.ceil(gameNumberInRound / 2) + currentRound;
                return nextGameNumber === cupSize ? null : nextGameNumber;
            };

            const setCupGameWinner = (gameNumber: number) => {
                let winner;
                const game = state.competition.stages[0].containers[0].games.find((el: any) => el.number === gameNumber)

                if (game.aResult == null || game.bResult == null || game.aResult === game.bResult) {
                    return;
                } else if (game.aResult > game.bResult) {
                    winner = game.aCompetitor;
                } else if (game.bResult > game.aResult) {
                    winner = game.bCompetitor;
                }

                const isEven = gameNumber % 2 === 0;
                let nextGameNumber = getNextGameNumber(gameNumber);

                while (nextGameNumber !== null) {
                    let nextGame = state.competition.stages[0].containers[0].games.find((el: any) => el.number === nextGameNumber);
                    if (isEven) {
                        nextGame.bCompetitor = winner;
                    } else {
                        nextGame.aCompetitor = winner;
                    }

                    if (nextGame.aResult == null || nextGame.bResult == null || nextGame.aResult === nextGame.bResult) {
                        break;
                    } else if (nextGame.aResult > nextGame.bResult) {
                        winner = nextGame.aCompetitor;
                    } else if (nextGame.bResult > nextGame.aResult) {
                        winner = nextGame.bCompetitor;
                    }

                    nextGameNumber = getNextGameNumber(nextGameNumber);
                }
            };

            const resetCupGameWinner = (gameNumber: number) => {
                const isEven = gameNumber % 2 === 0;
                let nextGameNumber = getNextGameNumber(gameNumber);

                while (nextGameNumber !== null) {
                    let nextGame = state.competition.stages[0].containers[0].games.find((el: any) => el.number === nextGameNumber)

                    if (isEven) {
                        nextGame.bCompetitor = null;
                    } else {
                        nextGame.aCompetitor = null;
                    }

                    nextGameNumber = getNextGameNumber(nextGameNumber);
                }
            };
            // byly 2 wyniki rozne, a teraz nie ma jednego lub sa rowne:
            if (game.aResult !== null && game.bResult !== null && game.aResult !== game.bResult && (data.aResult === null || data.bResult === null || game.aResult === data.bResult || game.bResult === data.aResult)) {
                resetCupGameWinner(game.number);
            }
            // byly 2 wyniki rozne, a teraz sa 2 wyniki rozne ale inny wygrany:
            else if (game.aResult !== null && game.bResult !== null && game.aResult !== game.bResult && ((data.aResult != null && data.aResult !== game.bResult && ((game.aResult / game.bResult) > 1) !== ((data.aResult / game.bResult) > 1)) || (data.bResult != null && data.bResult !== game.aResult && ((game.aResult / game.bResult) > 1) !== ((game.aResult / data.bResult) > 1)))) {
                Object.assign(game, data);
                setCupGameWinner(game.number);
            }
            // nie bylo 2 wynikow roznych, a teraz sa:
            else if (((game.aResult === null && game.bResult !== null || game.aResult !== null && game.bResult === null) || (game.aResult !== null && game.bResult !== null && game.aResult === game.bResult)) && ((data.aResult != null && game.bResult !== null && data.aResult !== game.bResult) || (data.bResult != null && game.aResult !== null && data.bResult !== game.aResult))) {
                Object.assign(game, data);
                setCupGameWinner(game.number);
            }
        }

        Object.assign(game, data);
    },
    createCompetitionGames (state: any, data: any) {
        state.competition.stages[0].containers[0].games = generateGamesForContainer(state.competition.stages[0].containers[0], data);
    }
};

export const actions = {
    resetCompetition (context: any) {
        context.commit('resetCompetition');
    },
    resetBar (context: any) {
        context.commit('resetBar');
    },
    moveBarWithLock (context: any, position: number) {
        context.commit('moveBar', position);
        context.commit('lockedBar', true);

        setTimeout(() => {
            context.commit('lockedBar', false);
        }, 300);
    },
    moveBar (context: any, position: number) {
        context.commit('moveBar', position);
    },
    setCompetitionScrollingDown (context: any, value: boolean) {
        context.commit('setCompetitionScrollingDown', value);
    },
    showSnackbar (context: any, data: { message: string, actionText: string | undefined }) {
        if (this.state.snackbar.visible) {
            setTimeout(() => {
                this.dispatch('showSnackbar', data);
            }, 1000);
            return;
        }

        context.commit('showSnackbar', data);

        if (!data.actionText) {
            this.dispatch('autoCloseSnackbar');
        }
    },
    closeSnackbar (context: any) {
        context.commit('closeSnackbar');
    },
    autoCloseSnackbar (context: any) {
        if (!this.state.snackbar.visible) {
            return;
        }

        if (this.state.snackbar.autoCloseCountDown > 0) {
            setTimeout(() => {
                context.commit('snackbarCountDownDecrement');
                this.dispatch('autoCloseSnackbar');
            }, 1000);
        } else {
            context.commit('closeSnackbar');
        }
    },
    showActionDialog (context: any, data: { heading: string, message: string, cancelText: string | undefined, okText: string }) {
        context.commit('showActionDialog', data);

        this.state.actionDialog.promise = new Promise(resolve => {
            this.state.actionDialog.promiseResolve = resolve;
        });

        return this.state.actionDialog.promise;
    },
    closeActionDialog (context: any, resolveValue: boolean) {
        context.commit('closeActionDialog', resolveValue);
    },
    setCompetition (context: any, data: any) {
        context.commit('setCompetition', data);
        context.commit('setCompetitionGroupRanking');
        context.commit('setCompetitionCompetitorsFromGames');
    },
    setEmptyCompetition (context: any) {
        context.commit('setEmptyCompetition');
    },
    setContentRefs (context: any, refs: any) {
        context.commit('setContentRefs', refs);
    },
    setCompetitionDrawEnabled (context: any, value: boolean) {
        context.commit('setCompetitionDrawEnabled', value);
    },
    setCompetitionWinnerPoints (context: any, value: number) {
        context.commit('setCompetitionWinnerPoints', value);
        context.commit('setCompetitionGroupRanking');
    },
    setCompetitionLoserPoints (context: any, value: number) {
        context.commit('setCompetitionLoserPoints', value);
        context.commit('setCompetitionGroupRanking');
    },
    setCompetitionDrawPoints (context: any, value: number) {
        context.commit('setCompetitionDrawPoints', value);
        context.commit('setCompetitionGroupRanking');
    },
    setCompetitionOnePointWinnerPoints (context: any, value: number) {
        context.commit('setCompetitionOnePointWinnerPoints', value);
        context.commit('setCompetitionGroupRanking');
    },
    setCompetitionOnePointLoserPoints (context: any, value: number) {
        context.commit('setCompetitionOnePointLoserPoints', value);
        context.commit('setCompetitionGroupRanking');
    },
    setCompetitionRankOrder (context: any, orderArr: any) {
        context.commit('setCompetitionRankOrder', orderArr);
        context.commit('setCompetitionGroupRanking');
    },
    setCompetitionSize (context: any, size: number) {
        context.commit('setCompetitionSize', size);
        context.commit('setEmptyCompetitorsList', size);
        context.commit('createCompetitionGames', { size: size });
    },
    setCompetitionGroupRanking (context: any) {
        context.commit('setCompetitionGroupRanking');
    },
    setCompetitorName (context: any, data: any) {
        context.commit('setCompetitorName', data);
    },
    setCompetitionName (context: any, value: string) {
        context.commit('setCompetitionName', value);
    },
    setCompetitionRouteName (context: any, value: string) {
        context.commit('setCompetitionRouteName', value);
    },
    setCompetitionDescription (context: any, value: string) {
        context.commit('setCompetitionDescription', value);
    },
    setCompetitionStartDate (context: any, value: string) {
        context.commit('setCompetitionStartDate', value);
    },
    setCompetitionEndDate (context: any, value: string) {
        context.commit('setCompetitionEndDate', value);
    },
    setCompetitionTypeAndDouble (context: any, data: { type: string, isDouble: boolean }) {
        context.commit('setCompetitionType', data.type);
        context.commit('setCompetitionIsDouble', data.isDouble);
        context.commit('createCompetitionGames', data);
    },
    setCompetitionResultData (context: any, data: any) {
        context.commit('setCompetitionResultData', data);
        context.commit('setCompetitionGroupRanking');
    }
};
