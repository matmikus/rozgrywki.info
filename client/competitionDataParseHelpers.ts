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
        if (game.aResult && game.bResult) {
            game.resultText = `${game.aResult} : ${game.bResult}`;
        } else {
            game.resultText = '';
        }

        return game;
    });
}
