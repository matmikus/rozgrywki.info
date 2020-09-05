<template>
    <div id="competition-summary-container">
        <div v-for="stage in competition.stages" :key="stage.id" class="stage">
            <div v-for="container in stage.containers" :key="container.id" class="container">
                <div class="container-name" v-show="container.name">
                    <span class="container-name-text">{{ container.name }}</span>
                </div>
                <template v-if="container.type === 'cup'">
                    <div v-html="getCupHtmlVisualization(container)">
                    </div>
                </template>
                <template v-if="container.type === 'group'">
                    <table class="data-table" cellspacing="0">
                        <tr>
                            <th class="rank-th rank-number-th"><span>Miejsce</span></th>
                            <th class="rank-th rank-competitor-th"><span>Drużyna</span></th>
                            <th class="rank-th"><span>Mecze</span></th>
                            <th class="rank-th"><span>Punkty</span></th>
                            <th class="rank-th"><span>Bilans meczy</span></th>
                            <th class="rank-th"><span>Bilans wyników</span></th>
                        </tr>
                        <tr v-for="competitor in container.ranking"
                            :key="competitor.id"
                            class="data-row">
                            <td>
                                {{ competitor.rank }}.
                            </td>
                            <td class="rank-competitor">
                                {{ competitor.name }}
                            </td>
                            <td>
                                {{ competitor.games }}
                            </td>
                            <td>
                                {{ competitor.points }}
                            </td>
                            <td>
                                {{ competitor.wins + '-' + (container.isDrawEnabled ?
                                competitor.draws + '-' : '') + competitor.losts }}
                            </td>
                            <td>
                                {{ competitor.results.wins }}:{{ competitor.results.losts }}
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
                const sortFunctions = {
                    points: (a: any, b: any) => b.points - a.points,
                    gamesRatio: (a: any, b: any) => b.wins / b.losts - a.wins / a.losts,
                    resultsRatio: (a: any, b: any) => b.results.wins / b.results.losts - a.results.wins / a.results.losts,
                    gamesAmount: (a: any, b: any) => (b.wins + b.losts) - (a.wins + a.losts),
                    directGame: (a: any, b: any) => {
                        if (!container.isDouble) {
                            const directGame = container.games.find((game: any) => (game.aCompetitor.id === a.id && game.bCompetitor.id === b.id) || (game.aCompetitor.id === b.id && game.bCompetitor.id === a.id));

                            if (directGame.aResult > directGame.bResult) {
                                if (directGame.aCompetitor.id === a.id) {
                                    return -1;
                                }

                                if (directGame.aCompetitor.id === b.id) {
                                    return 1;
                                }
                            }

                            if (directGame.aResult < directGame.bResult) {
                                if (directGame.bCompetitor.id === b.id) {
                                    return 1;
                                }

                                if (directGame.bCompetitor.id === a.id) {
                                    return -1;
                                }
                            }
                        }

                        return 0;
                    }
                };

                const sortOrder: any[] = [];
                sortOrder[container.rankPointsOrder - 1] = sortFunctions.points;
                sortOrder[container.rankGamesRatioOrder - 1] = sortFunctions.gamesRatio;
                sortOrder[container.rankResultsRatioOrder - 1] = sortFunctions.resultsRatio;
                sortOrder[container.rankGamesAmountOrder - 1] = sortFunctions.gamesAmount;
                sortOrder[container.rankDirectGameOrder - 1] = sortFunctions.directGame;

                const compareFunc = (a: any, b: any) => {
                    let sortResult = 0;

                    for (const sortFunction of sortOrder) {
                        const sortFunctionResult = sortFunction(a, b);

                        if (sortFunctionResult > 0 || sortFunctionResult < 0) {
                            sortResult = sortFunctionResult;
                            break;
                        }
                    }

                    return sortResult;
                };

                const { games } = container;
                const competitors = this.getCompetitorsFromGames(games).map((competitor: any) => {
                    competitor.data = games.reduce((accumulator: any, game: any) => {
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
                            accumulator.wins += 1;
                        } else if (competitorResult < opponentResult) {
                            accumulator.points += container.loserPoints;
                            accumulator.losts += 1;
                        } else {
                            accumulator.points += container.drawPoints;
                            accumulator.draws += 1;
                        }

                        accumulator.results.wins += competitorResult;
                        accumulator.results.losts += opponentResult;

                        accumulator.games += 1;

                        return accumulator;
                    }, {
                        points: 0,
                        games: 0,
                        wins: 0,
                        losts: 0,
                        draws: 0,
                        results: { wins: 0, losts: 0 }
                    });

                    competitor.points = competitor.data.points;
                    competitor.games = competitor.data.games;
                    competitor.wins = competitor.data.wins;
                    competitor.losts = competitor.data.losts;
                    competitor.draws = competitor.data.draws;
                    competitor.results = competitor.data.results;
                    delete competitor.data;

                    return competitor;
                }).sort(compareFunc);

                for (let i = 0; i < competitors.length; i++) {
                    if (i > 0 && compareFunc(competitors[i], competitors[i - 1]) === 0) {
                        competitors[i].rank = competitors[i - 1].rank;
                    } else {
                        competitors[i].rank = i + 1;
                    }
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
                                         <div class="cup-game-connector">&nbsp;&nbsp;</div>
                                         <div class="cup-result">${this.getCupResult(competition.games[gameCounter], competition.isDouble ? competition.games[gameCounter + 1] : {})}<span class="cup-game-number">#${gameCounter+1}</span></div>
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
                        winnerName = this.getCupDoubleFinalWinner(finalGame, secondFinalGame);
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
            },
            getCupDoubleFinalWinner (firstGame: any, secondGame: any, awayGoalsRule: boolean) {
                const aCompetitor = {
                    name: firstGame.aCompetitor.name,
                    wins: 0,
                    losts: 0,
                    draws: 0,
                    results: {
                        wins: firstGame.aResult + secondGame.bResult,
                        losts: firstGame.bResult + secondGame.aResult
                    }
                };

                const bCompetitor = {
                    name: firstGame.bCompetitor.name,
                    wins: 0,
                    losts: 0,
                    draws: 0,
                    results: {
                        wins: firstGame.bResult + secondGame.aResult,
                        losts: firstGame.aResult + secondGame.bResult
                    }
                };

                if (firstGame.aResult > firstGame.bResult) {
                    aCompetitor.wins += 1;
                    bCompetitor.losts += 1;
                } else if (firstGame.aResult < firstGame.bResult) {
                    aCompetitor.wins += 1;
                    bCompetitor.losts += 1;
                } else {
                    aCompetitor.draws += 1;
                    bCompetitor.draws += 1;
                }

                if (secondGame.aResult > secondGame.bResult) {
                    aCompetitor.wins += 1;
                    bCompetitor.losts += 1;
                } else if (secondGame.aResult < secondGame.bResult) {
                    aCompetitor.wins += 1;
                    bCompetitor.losts += 1;
                } else {
                    aCompetitor.draws += 1;
                    bCompetitor.draws += 1;
                }

                const gamesRatioComparison = bCompetitor.wins / bCompetitor.losts - aCompetitor.wins / aCompetitor.losts;

                if (gamesRatioComparison > 0) {
                    return bCompetitor.name;
                }

                if (gamesRatioComparison < 0) {
                    return aCompetitor.name;
                }

                const resultsRatioComparison = bCompetitor.results.wins / bCompetitor.results.losts - aCompetitor.results.wins / aCompetitor.results.losts;

                if (resultsRatioComparison > 0) {
                    return bCompetitor.name;
                }

                if (resultsRatioComparison < 0) {
                    return aCompetitor.name;
                }

                if (awayGoalsRule) {
                    aCompetitor.results.wins = firstGame.aResult + 2 * secondGame.bResult;
                    bCompetitor.results.wins = 2 * firstGame.bResult + secondGame.aResult;

                    const awayResultsRatioComparison = bCompetitor.results.wins - aCompetitor.results.wins;

                    if (awayResultsRatioComparison > 0) {
                        return bCompetitor.name;
                    }

                    if (awayResultsRatioComparison < 0) {
                        return aCompetitor.name;
                    }
                }

                return '';
            }
        }
    };
</script>

<style lang="scss">
    #competition-summary-container {
        display: inline-block;
        overflow-x: hidden;

        .container-name {
            padding-bottom: 8px;
            padding-left: 4px;
            font-weight: 500;
            height: 24px;
            line-height: 19px;
            color: var(--content1-color);
            text-transform: uppercase;
        }

        .container-name-text {
            position: absolute;
            display: flex;
            align-items: center;
        }

        .container:not(:last-child), .stage:not(:last-child) {
            margin-bottom: 32px;
        }

        .data-table {
            border-collapse: separate;
            border-radius: $data-row-border-radius;
        }

        .data-row {
            white-space: nowrap;
        }

        .data-row > td {
            background-color: var(--bg1-color);
        }

        .data-row:not(:last-child) > td {
            border-bottom: 1px solid var(--content-divider-color);
        }

        .data-row:nth-child(2) > td:first-child {
            border-top-left-radius: $data-row-border-radius;
        }

        .data-row:nth-child(2) > td:last-child {
            border-top-right-radius: $data-row-border-radius;
        }

        .data-row:last-child > td:first-child {
            border-bottom-left-radius: $data-row-border-radius;
        }

        .data-row:last-child > td:last-child {
            border-bottom-right-radius: $data-row-border-radius;
        }

        .rank-th {
            text-align: center;
            font-size: 88%;
            line-height: 16px;
            font-weight: 200;
            padding: 8px 18px;
            color: var(--content5-color);
        }

        .rank-number-th {
            text-align: left;
            padding-left: 2px;
            padding-right: 2px;
        }

        .rank-competitor-th {
            text-align: left;
        }

        .data-row > td {
            text-align: center;
            padding: 16px 18px;
        }

        .data-row > td:first-child {
            font-weight: 600;
            padding-left: 2px;
            padding-right: 2px;
        }

        .data-row > td.rank-competitor {
            text-align: left;
        }

        .cup-container {
            display: inline-flex;
            background-color: var(--bg1-color);
            white-space: nowrap;
            border-radius: $data-row-border-radius;
            padding: 16px;
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
            background-color: var(--cup-line-color);
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
            background-color: var(--cup-line-color);
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

        .cup-game-number {
            font-weight: 500;
            font-family: 'Roboto';
            opacity: 0.4;
            padding-right: 4px;
            padding-left: 8px;
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
