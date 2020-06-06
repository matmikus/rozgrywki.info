export const state = () => ({
    bar: {
        top: '0',
        left: '0'
    }
});

export const mutations = {
    moveBar (state: any, position: { top: string, left: string}) {
        state.bar.top = position.top;
        state.bar.left = position.left;
    }
};
