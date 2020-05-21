const dayjs = require('dayjs');

export function parseCompetitionURL (route: string): string {
    if (route === undefined) {
        route = '';
    }

    return `www.rozgrywki.info/${route}`;
}

export function parseCompetitionDateRange (start: string, end: string): string {
    if (start == end) {
        return start;
    }

    return `${start} - ${end}`;
}

export function parseCompetitionUpdatedDate (updated: string): string {
    return dayjs(updated).format('YYYY-MM-DD');
}

export function parseCompetitionUpdatedDatetime (updated: string): string {
    return dayjs(updated).format('YYYY-MM-DD H:mm');
}

export function getCompetitionTypeNameFromType (type: string): string {
    const competitionTypeMap: any = {
        group: 'każdy z każdym',
        cup: 'pucharowe'
    };

    return competitionTypeMap[type] ? competitionTypeMap[type] : '';
}

export function getCompetitorsCountFromCompetitionData (competitionData: any): number {
    return competitionData[competitionData.type] != null ? competitionData[competitionData.type].size : 0;
}

export function getGamesFromCompetitionData (competitionData: any): any[] {
    const games = competitionData[competitionData.type] != null ? competitionData[competitionData.type].games : [];

    return games.map((game: any) => {
        if (game.aResult != null && game.bResult != null) {
            game.resultText = `${game.aResult} : ${game.bResult}`;
        } else {
            game.resultText = '';
        }

        if (game.aCompetitor === null) {
            game.aCompetitor = { name: '?' };
        }

        if (game.bCompetitor === null) {
            game.bCompetitor = { name: '?' };
        }

        return game;
    });
}

export function getCompetitionLastUpdateFromCompetitionData (competitionData: any): any {
    let updates = [competitionData.updatedAt];

    if (competitionData.lastCupUpdate != null && competitionData.lastCupUpdate.lastGameUpdate != null && competitionData.lastCupUpdate.lastGameUpdate[0].updatedAt != null) {
        updates.push(competitionData.lastCupUpdate.lastGameUpdate[0].updatedAt);
    }

    if (competitionData.lastGroupUpdate != null && competitionData.lastGroupUpdate.lastGameUpdate != null && competitionData.lastGroupUpdate.lastGameUpdate[0].updatedAt != null) {
        updates.push(competitionData.lastGroupUpdate.lastGameUpdate[0].updatedAt);
    }

    return updates.reduce((a, b) => (dayjs(a).isAfter(dayjs(b)) ? a : b));
}

export function getCompetitorsFromGames (games: any): any {
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

export function getGroupStandings (competitionData: any): any {
    const games = competitionData.group.games;

    let competitors = getCompetitorsFromGames(games).map((competitor: any) => {
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
                accumulator.points += competitionData.group.winnerPoints;
            } else if (competitorResult < opponentResult) {
                accumulator.points += competitionData.group.loserPoints;
            } else {
                accumulator.points += competitionData.group.drawPoints;
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

    console.log(competitors)
    return competitors;
}
