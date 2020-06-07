export const state = () => ({
    bar: {
        position: 1,
        blocked: false
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
    }
};
