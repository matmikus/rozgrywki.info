export const state = () => ({
    bar: {
        position: 1,
        blocked: false
    },
    competitionScrollingDown: false,
    competition: {},
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
    },
    setContentRefs (context: any, refs: any) {
        context.commit('setContentRefs', refs);
    }
};
