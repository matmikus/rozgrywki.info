export function getGroupRanking (container: any) {
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
    const competitors = getCompetitorsFromGames(games).map((competitor: any) => {
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
console.log(competitors)
    return competitors;
}

function getCompetitorsFromGames (games: any) {
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
