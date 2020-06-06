export const state = () => ({
    bar: {
        top: '0',
        left: '0',
        blocked: false
    }
});

export const mutations = {
    moveBar (state: any, position: { top: string, left: string }) {
        if (state.bar.blocked) {
            return;
        }

        state.bar.top = position.top;
        state.bar.left = position.left;
    },
    lockedBar (state: any, locked: boolean) {
        state.bar.blocked = locked;
    }
};

export const actions = {
    moveBar (context: any, position: { top: string, left: string }) {
        context.commit('moveBar', position);
        context.commit('lockedBar', true);

        setTimeout(() => {
            context.commit('lockedBar', false);
        }, 250);
    }
};
