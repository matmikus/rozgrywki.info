export const state = () => ({
    bar: {
        position: 1,
        blocked: false
    },
    competition: {
        name: '',
        route: '',
        link: '',
        description: ''
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
    }
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
    setCompetitionData (state: any, data: { name: string, route: string, link: string, description: string }) {
        state.competition.name = data.name;
        state.competition.route = data.route;
        state.competition.link = data.link;
        state.competition.description = data.description;
    }
};

export const actions = {
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
    showSnackbar (context: any, message: string, actionText: string = '') {
        if (this.state.snackbar.visible) {
            setTimeout(() => {
                this.dispatch('showSnackbar', message, actionText);
            }, 1000);
            return;
        }

        context.commit('showSnackbar', { message, actionText });

        if (!actionText) {
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
    mockCompetitionData (context: any) {
        context.commit('setCompetitionData', {
            name: 'Puchar Burmistrza Pcimia Górnego 2021',
            route: 'puchar-pcimia2021',
            link: 'www.rozgrywki.info/puchar-pcimia2021',
            description: 'Zapraszamy serdecznie na kolejną edycję kultowych rozgrywek w Pcimiu Górnym!'
        });
    }
};
