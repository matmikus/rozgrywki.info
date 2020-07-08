export default function ({ route, store }: any) {
    if (store.state.competition && store.state.competition.routeName !== route.params.competition) {
        store.dispatch('resetCompetition');
    }
}
