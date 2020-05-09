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

export function parseCompetitionUpdatedDatetime (updated: string): string {
    return dayjs(updated).format('YYYY-MM-DD');
}
