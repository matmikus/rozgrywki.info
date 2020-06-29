<template>
    <div id="competition-summary-container">
        <div v-for="stage in competition.stages" :key="stage.id" class="stage">
            <div v-for="container in stage.containers" :key="container.id" class="container">
                tutaj będzie {{ container.type === 'cup' ? 'drabinka' : 'tabela' }} {{
                container.name }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        computed: {
            competition () {
                let competition = this.$store.state.competition;

                for (const stage of competition.stages) {
                    for (const container of stage.containers) {
                        if (container.type === 'group') {
                            container.ranking = this.getGroupRanking(container);
                        }
                    }
                }

                return competition;
            }
        },
        methods: {
            getGroupRanking (container: any) {
                const games = container.games;

                let competitors = this.getCompetitorsFromGames(games).map((competitor: any) => {
                    competitor.pointsAndGames = games.reduce((accumulator: any, game: any) => {
                        if (game.aResult === null || game.bResult === null) {
                            return accumulator;
                        }

                        let competitorResult, opponentResult;

                        if (game.aCompetitor.id === competitor.id) {
                            competitorResult = game.aResult;
                            opponentResult = game.bResult;
                        } else if (game.bCompetitor.id === competitor.id) {
                            competitorResult = game.bResult;
                            opponentResult = game.aResult;
                        } else {
                            return accumulator;
                        }

                        if (competitorResult > opponentResult) {
                            accumulator.points += container.winnerPoints;
                        } else if (competitorResult < opponentResult) {
                            accumulator.points += container.loserPoints;
                        } else {
                            accumulator.points += container.drawPoints;
                        }

                        ++accumulator.games;

                        return accumulator;
                    }, { points: 0, games: 0 });

                    competitor.points = competitor.pointsAndGames.points;
                    competitor.games = competitor.pointsAndGames.games;
                    delete competitor.pointsAndGames;

                    return competitor;
                }).sort((a: any, b: any) => b.points - a.points);

                let rank = 0, previousCompetitorPoints;
                for (const competitor of competitors) {
                    if (competitor.points !== previousCompetitorPoints) {
                        ++rank;
                    }

                    competitor.rank = rank;
                    previousCompetitorPoints = competitor.points;
                }

                return competitors;
            },
            getCompetitorsFromGames (games: any) {
                return games
                    .reduce((competitors: { id: string, name: string }[], game: { aCompetitor: { id: string, name: string }, bCompetitor: { id: string, name: string } }) => {
                        if (game.aCompetitor !== null && competitors.find((el: { id: string, name: string }) => el.id === game.aCompetitor.id) === undefined) {
                            competitors.push(game.aCompetitor);
                        }

                        if (game.bCompetitor !== null && competitors.find((el: { id: string, name: string }) => el.id === game.bCompetitor.id) === undefined) {
                            competitors.push(game.bCompetitor);
                        }

                        return competitors;
                    }, [])
                    .sort((a: { id: any, name: string }, b: { id: any, name: string }) => a.id - b.id);
            }
        }
    };
</script>

<style lang="scss">
    #competition-summary-container {
        @media (max-width: 1000px) {
            .container {
                padding: 0 16px;
            }
        }
    }
</style>
