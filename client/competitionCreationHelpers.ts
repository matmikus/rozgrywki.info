export function createRoundRobinPairsForTeams (competitors: any[], isDouble: boolean = false): { aCompetitor: { name: string }, bCompetitor: { name: string }, number: number | undefined, date: string | null, aResult: null, bResult: null }[] {
    let teamsArr = [...competitors];
    if (teamsArr.length % 2 !== 0) {
        teamsArr.push(null);
    }

    const teamsCount = teamsArr.length;
    let steps = teamsCount - 1;
    let aArr = [], bArr = [], pairs = [];
    let gameCounter = 1;

    for (let i = 0; i < teamsCount / 2; i++) {
        aArr.push(teamsArr.pop());
        bArr.push(teamsArr.pop());
    }

    for (let i = 0; i < steps; i++) {
        for (let j = 0; j < bArr.length; j++) {
            if (aArr[j] === null || bArr[j] === null) {
                continue;
            }

            pairs.push({
                aCompetitor: aArr[j],
                bCompetitor: bArr[j],
                number: gameCounter++,
                date: null,
                aResult: null,
                bResult: null
            });
        }

        bArr.push(aArr.pop());
        aArr.splice(1, 0, bArr.shift());
    }

    if (isDouble) {
        let doubleArr = [];

        for (let i = 0; i < pairs.length; i++) {
            doubleArr.push({
                aCompetitor: pairs[i].bCompetitor,
                bCompetitor: pairs[i].aCompetitor,
                number: gameCounter++,
                date: null,
                aResult: null,
                bResult: null
            });
        }

        pairs = pairs.concat(doubleArr);
    }

    return pairs;
}

export function createCupPairsForTeams (competitors: any[], isDouble: boolean = false): { aCompetitor: { name: string }, bCompetitor: { name: string }, number: number | undefined, date: string | null, aResult: null, bResult: null }[] {
    let pairs = [];
    const teamsArr = [...competitors];
    const teamsCount = teamsArr.length;
    let cupSize = getCupSizeByCompetitorsCount(teamsCount);

    const fullGamesCount = isDouble ? 2 * (cupSize - 1) : cupSize - 1;

    const nullTeamsCount = cupSize - teamsCount;

    const nullTeamsRange = Math.floor(cupSize / nullTeamsCount);

    for (let i = 0, nullTeamPosition = 1; i < nullTeamsCount; ++i) {
        teamsArr.splice(nullTeamPosition, 0, null);
        nullTeamPosition += nullTeamsRange;
    }

    for (let i = 0; i < fullGamesCount; ++i) {
        pairs.push({
            number: i + 1,
            aCompetitor: { name: '?' },
            bCompetitor: { name: '?' },
            date: null,
            aResult: null,
            bResult: null
        })
    }

    if (isDouble) {
        for (let i = 0; i < cupSize; ++i) {
            pairs[i].aCompetitor = teamsArr[i] !== null ? teamsArr[i] : { name: '-' };
            pairs[i].bCompetitor = teamsArr[i + 1] !== null ? teamsArr[i + 1] : { name: '-' };

            pairs[i + 1].bCompetitor = teamsArr[i] !== null ? teamsArr[i] : { name: '-' };
            pairs[i + 1].aCompetitor = teamsArr[i + 1] !== null ? teamsArr[i + 1] : { name: '-' };

            if (teamsArr[(i * 2)] === null) {
                if (i % 2 === 0) {
                    pairs[2 * (cupSize / 2 + Math.floor(i / 2))].aCompetitor = teamsArr[(i * 2) + 1];
                } else {
                    pairs[2 * (cupSize / 2 + Math.floor(i / 2))].bCompetitor = teamsArr[(i * 2) + 1];
                }
            } else if (teamsArr[(i * 2) + 1] === null) {
                if (i % 2 === 0) {
                    pairs[2 * (cupSize / 2 + Math.floor(i / 2))].aCompetitor = teamsArr[(i * 2)];
                } else {
                    pairs[2 * (cupSize / 2 + Math.floor(i / 2))].bCompetitor = teamsArr[(i * 2)];
                }
            }

            ++i;
        }
    } else {
        for (let i = 0; i < cupSize / 2; ++i) {
            pairs[i].aCompetitor = teamsArr[(i * 2)] !== null ? teamsArr[(i * 2)] : { name: '-' };
            pairs[i].bCompetitor = teamsArr[(i * 2) + 1] !== null ? teamsArr[(i * 2) + 1] : { name: '-' };

            if (teamsArr[(i * 2)] === null) {
                if (i % 2 === 0) {
                    pairs[cupSize / 2 + Math.floor(i / 2)].aCompetitor = teamsArr[(i * 2) + 1];
                } else {
                    pairs[cupSize / 2 + Math.floor(i / 2)].bCompetitor = teamsArr[(i * 2) + 1];
                }
            } else if (teamsArr[(i * 2) + 1] === null) {
                if (i % 2 === 0) {
                    pairs[cupSize / 2 + Math.floor(i / 2)].aCompetitor = teamsArr[(i * 2)];
                } else {
                    pairs[cupSize / 2 + Math.floor(i / 2)].bCompetitor = teamsArr[(i * 2)];
                }
            }
        }
    }

    return pairs;
}

export function createHtmlCupVisualization (games: any[], isDouble: boolean = false): any {
    const cupSize = isDouble ? games.length / 2 + 1 : games.length + 1;
    let rowsAndCells = ``;
    let gamesCounter = 0;

    const getImg = function () {
        return `
            <svg width="50%" height="55" viewBox="0 0 1080 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.353553" y1="0.646447" x2="540.3535" y2="54.6464" stroke="#EEEEEE"/>
            <line x1="530.6464" y1="54.6464" x2="1070.646" y2="0.646449" stroke="#EEEEEE"/>
            </svg>
            `;
    };

    for (let i = cupSize, colspan = 1; i >= 1; i /= 2, colspan *= 2) {
        if (colspan !== 1) {
            rowsAndCells += `<tr>`;

            for (let j = 0; j < i; j += 2) {
                if (i === 1) {
                    rowsAndCells += `<td colspan="${colspan}">${getImg()}</td>`;
                } else {
                    rowsAndCells += `<td colspan="${colspan}">${getImg()}</td><td colspan="${colspan}">${getImg()}</td>`;
                }
            }

            rowsAndCells += `</tr>`;
        }

        rowsAndCells += `<tr>`;

        for (let j = 0; j < i; j += 2) {
            if (i === 1) {
                let winner = '?';
                const lastGame = games[games.length - 1];
                if (lastGame.aResult !== null && lastGame.bResult !== null && lastGame.aCompetitor !== null && lastGame.bCompetitor !== null) {
                    if (lastGame.aResult > lastGame.bResult) winner = lastGame.aCompetitor.name;
                    if (lastGame.aResult < lastGame.bResult) winner = lastGame.bCompetitor.name;
                }

                rowsAndCells += `<td colspan="${colspan}">${winner}</td>`;
            } else {
                rowsAndCells += `<td colspan="${colspan}">${games[gamesCounter].aCompetitor.name}</td><td colspan="${colspan}">${games[gamesCounter].bCompetitor.name}</td>`;

                ++gamesCounter;

                if (isDouble) {
                    ++gamesCounter;
                }
            }
        }

        rowsAndCells += `</tr>`;
    }

    return `<table style="width: 100%; table-layout: fixed" cellspacing="4">${rowsAndCells}</table>`;
}

export function getCupSizeByCompetitorsCount (teamsCount: number) {
    let size = 1;

    while (size < teamsCount) {
        size *= 2;
    }

    return size;
}

import { polishForbiddenWords, englishForbiddenWords } from './forbiddenWords.ts';

export function testForbiddenWordsIn (text: string) {
    const testedString = text.toLowerCase().replace(/\s|-|_|[.]/g, '');

    for (const word of polishForbiddenWords) {
        if (testedString.includes(word)) {
            return true;
        }
    }

    for (const word of englishForbiddenWords) {
        if (testedString.includes(word)) {
            return true;
        }
    }

    return false;
}
