<template>
    <div id="competition-summary-container">
        <div v-for="stage in competition.stages" :key="stage.id" class="stage">
            <div v-for="container in stage.containers" :key="container.id" class="container">
                <div class="container-name" v-show="container.name">
                    <span>
                        <component :is="container.type === 'cup' ? 'cupIcon' : 'rankingIcon'"
                                   class="container-icon"></component>
                        <span class="container-name-text">{{ container.name }}</span>
                    </span>
                </div>
                <template v-if="container.type === 'cup'">
                    <div v-html="getCupHtmlVisualization(container)">
                    </div>
                </template>
                <template v-if="container.type === 'group'">
                    <table class="data-table" cellspacing="0">
                        <tr class="data-row">
                            <th class="rank-th rank-number-th">Miejsce</th>
                            <th class="rank-th rank-competitor-th">Drużyna</th>
                            <th class="rank-th rank-games-th">Mecze</th>
                            <th class="rank-th rank-points-th">Punkty</th>
                        </tr>
                        <tr v-for="competitor in container.ranking"
                            :key="competitor.id"
                            class="data-row">
                            <td>
                                <div class="rank-number">
                                    {{ competitor.rank }}
                                </div>
                            </td>
                            <td>
                                <div class="rank-competitor">
                                    {{ competitor.name }}
                                </div>
                            </td>
                            <td>
                                <div class="rank-games">
                                    {{ competitor.games }}
                                </div>
                            </td>
                            <td>
                                <div class="rank-points">
                                    {{ competitor.points }}
                                </div>
                            </td>
                        </tr>
                    </table>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import cupIcon from '@/assets/icons/graph.svg';
    import rankingIcon from '@/assets/icons/format_list_numbered.svg';

    export default {
        components: { cupIcon, rankingIcon },
        computed: {
            competition () {
                const { competition } = this.$store.state;

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
                const { games } = container;

                const competitors = this.getCompetitorsFromGames(games).map((competitor: any) => {
                    competitor.pointsAndGames = games.reduce((accumulator: any, game: any) => {
                        if (game.aResult === null || game.bResult === null) {
                            return accumulator;
                        }

                        let competitorResult;
                        let opponentResult;

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

                        accumulator.games += 1;

                        return accumulator;
                    }, { points: 0, games: 0 });

                    competitor.points = competitor.pointsAndGames.points;
                    competitor.games = competitor.pointsAndGames.games;
                    delete competitor.pointsAndGames;

                    return competitor;
                }).sort((a: any, b: any) => b.points - a.points);

                let rank = 0;
                let previousCompetitorPoints;
                for (const competitor of competitors) {
                    if (competitor.points !== previousCompetitorPoints) {
                        rank += 1;
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
            },
            getCupHtmlVisualization (competition: any) {
                if (competition.isDoubleEliminationCup) {
                    return 'Brak podglądu drabinki brazylijskiej';
                }

                const roundsAmount = Math.sqrt(competition.size);
                let currentRoundSize = competition.size;
                let gameCounter = 0;
                let html = '<div class="cup-container">';

                for (let i = 0; i < roundsAmount; i++) {
                    html += '<div class="cup-round">';
                    currentRoundSize /= 2;

                    for (let j = 0; j < currentRoundSize; j++) {
                        html += `<div class="cup-game-container">
                                     <div class="cup-game">
                                         <div class="cup-competitor">
                                            <div>${this.getCompetitorName(competition.games[gameCounter].aCompetitor)}</div>
                                            <div class="cup-competitor-line-container">
                                                <div class="cup-competitor-line"></div>
                                            </div>
                                         </div>
                                         <div class="cup-competitor">
                                             <div>${this.getCompetitorName(competition.games[gameCounter].bCompetitor)}</div>
                                             <div class="cup-competitor-line-container">
                                                <div class="cup-competitor-line"></div>
                                             </div>
                                         </div>
                                     </div>
                                     <div class="cup-game-connector-container">
                                         <div class="cup-game-connector">&nbsp;</div>
                                         <div class="cup-result">${this.getCupResult(competition.games[gameCounter], competition.isDouble ? competition.games[gameCounter + 1] : {})}</div>
                                     </div>
                                 </div>`;

                        gameCounter += 1;

                        if (competition.isDouble) {
                            gameCounter += 1;
                        }
                    }

                    html += '</div>';
                }

                const finalGame = competition.games[competition.games.length - 1];
                let winnerName = '?';

                if (!competition.isDouble && finalGame.aResult !== null && finalGame.bResult !== null) {
                    if (finalGame.aResult > finalGame.bResult) {
                        winnerName = finalGame.aCompetitor.name;
                    } else if (finalGame.aResult < finalGame.bResult) {
                        winnerName = finalGame.bCompetitor.name;
                    }
                }

                if (competition.isDouble) {
                    const secondFinalGame = competition.games[competition.games.length - 2];

                    if (finalGame.aResult !== null && finalGame.bResult !== null && secondFinalGame.aResult !== null && secondFinalGame.bResult !== null) {
                        // TODO określenie kto wygrał podwójny finał
                        winnerName = '';
                    }
                }

                html += `<div class="cup-winner">${winnerName}</div>`;
                html += '</div>';

                return html;
            },
            getCompetitorName (competitorObj: { name: String } | null) {
                return (competitorObj && competitorObj.name) || '?';
            },
            getCupResult (game: any, secondGame: any) {
                let result = '';

                if (game.aResult != null && game.bResult != null) {
                    result = `${game.aResult}:${game.bResult}`;
                }

                if (secondGame.aResult != null && secondGame.bResult != null) {
                    result += ` ,${game.aResult}:${game.bResult}`;
                }

                return result;
            }
        }
    };
</script>

<style lang="scss">
    #competition-summary-container {
        display: inline-block;
        overflow-x: hidden;

        .container-name {
            opacity: 0.5;
            padding-left: 8px;
            padding-bottom: 4px;
            font-weight: bolder;
            height: 24px;
        }

        .container-icon {
            opacity: 0.6;
            fill: var(--content-txt-color);
            width: 18px;
            height: 18px;
        }

        .container-name > span {
            position: absolute;
            display: flex;
            align-items: center;
        }

        .container-name-text {
            padding-left: 8px;
            padding-top: 2px;
        }

        .container:not(:last-child), .stage:not(:last-child) {
            margin-bottom: 12px;
        }

        .data-table {
            border-collapse: separate;
            border-spacing: 0 2px;
        }

        .data-row {
            padding: 4px 8px;
            white-space: nowrap;
            background-color: var(--content-row-bg-color);
        }

        .data-row th {
            padding: 0 8px;
        }

        .data-row td {
            padding: 4px 8px;
        }

        .rank-th {
            font-weight: 300;
            font-size: 80%;
            opacity: 0.5;
        }

        .rank-number-th {
            text-align: left;
        }

        .rank-competitor-th {
            text-align: left;
        }

        .rank-games-th {
            text-align: center;
        }

        .rank-points-th {
            text-align: center;
        }

        .rank-number {
            text-align: left;
            font-family: 'Gudea';
        }

        .rank-competitor {
            text-align: left;
        }

        .rank-games {
            text-align: center;
            font-family: 'Gudea';
        }

        .rank-points {
            text-align: center;
            font-family: 'Gudea';
        }

        .cup-container {
            display: inline-flex;
            background-color: var(--content-row-bg-color);
            white-space: nowrap;
        }

        .cup-round {
            display: flex;
            flex-direction: column;
        }

        .cup-game {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

        .cup-game-container {
            display: flex;
            flex: 1;
        }

        .cup-game-connector-container {
            display: flex;
            align-items: center;
            width: 5px;
            direction: rtl;
        }

        .cup-game-connector {
            display: flex;
            background-color: var(--content-bg-color);
            width: 5px;
            height: 50%;
        }

        .cup-competitor {
            min-height: 50px;
            display: flex;
            align-items: center;
            padding-left: 16px;
        }

        .cup-competitor-line-container {
            min-width: 30px;
            flex: 1;
            margin-left: 16px;
            margin-right: -5px;
        }

        .cup-competitor-line {
            background-color: var(--content-bg-color);
            height: 5px;
            width: 100%;
        }

        .cup-winner {
            display: flex;
            align-items: center;
            padding: 16px;
        }

        .cup-result {
            padding-right: 4px;
            direction: ltr;
            font-family: 'Gudea';
        }

        @media (max-width: 1000px) {
            max-width: calc(100vw - 95px);

            .container {
                overflow-x: auto;
                padding: 0 16px;
            }
        }

        @media not all and (orientation: landscape) {
            max-width: calc(100vw - 16px);
        }

        @media (max-width: 700px) {
            max-width: 100vw;
        }
    }
</style>
