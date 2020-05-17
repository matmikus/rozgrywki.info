export function createRoundRobinPairsForTeams (competitors: any[], isDouble: boolean = false): { teamA: { name: string }, teamB: { name: string }, gameNumber: number | undefined }[] {
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

            pairs.push({ teamA: aArr[j], teamB: bArr[j], gameNumber: gameCounter++ });
        }

        bArr.push(aArr.pop());
        aArr.splice(1, 0, bArr.shift());
    }

    if (isDouble) {
        let doubleArr = [];

        for (let i = 0; i < pairs.length; i++) {
            doubleArr.push({
                teamA: pairs[i].teamB,
                teamB: pairs[i].teamA,
                gameNumber: gameCounter++
            });
        }

        pairs = pairs.concat(doubleArr);
    }

    return pairs;
}

export function createCupPairsForTeams (competitors: any[]): { teamA: { name: string }, teamB: { name: string }, gameNumber: number | undefined }[] {
    let pairs = [];
    const teamsArr = [...competitors];
    const teamsCount = teamsArr.length;
    let cupSize = 1;

    while (cupSize < teamsCount) {
        cupSize *= 2;
    }

    const fullGamesCount = cupSize - 1;

    const nullTeamsCount = cupSize - teamsCount;

    const nullTeamsRange = Math.floor(cupSize / nullTeamsCount);

    for (let i = 0, nullTeamPosition = 1; i < nullTeamsCount; ++i) {
        teamsArr.splice(nullTeamPosition, 0, null);
        nullTeamPosition += nullTeamsRange;
    }

    for (let i = 0; i < fullGamesCount; ++i) {
        pairs.push({ gameNumber: i + 1, teamA: { name: '?' }, teamB: { name: '?' } })
    }

    for (let i = 0; i < cupSize / 2; ++i) {
        pairs[i].teamA = teamsArr[(i * 2)] !== null ? teamsArr[(i * 2)] : { name: '-' };
        pairs[i].teamB = teamsArr[(i * 2) + 1] !== null ? teamsArr[(i * 2) + 1] : { name: '-' };

        if (teamsArr[(i * 2)] === null) {
            if (i % 2 === 0) {
                pairs[cupSize / 2 + Math.floor(i / 2)].teamA = teamsArr[(i * 2) + 1];
            } else {
                pairs[cupSize / 2 + Math.floor(i / 2)].teamB = teamsArr[(i * 2) + 1];
            }
        } else if (teamsArr[(i * 2) + 1] === null) {
            if (i % 2 === 0) {
                pairs[cupSize / 2 + Math.floor(i / 2)].teamA = teamsArr[(i * 2)];
            } else {
                pairs[cupSize / 2 + Math.floor(i / 2)].teamB = teamsArr[(i * 2)];
            }
        }
    }

    return pairs;
}

export function createHtmlCupVisualization (games: any[]): any {
    const cupSize = games.length + 1;
    let rowsAndCells = ``;
    let gamesCounter = 0;
    const img = `<img src="/v-img.png" style="width: 50%; height: 40px" />`;

    for (let i = cupSize, colspan = 1; i >= 1; i /= 2, colspan *= 2) {
        if (colspan !== 1) {
            rowsAndCells += `<tr>`;

            for (let j = 0; j < i; j += 2) {
                if (i === 1) {
                    rowsAndCells += `<td colspan="${colspan}">${img}</td>`;
                } else {
                    rowsAndCells += `<td colspan="${colspan}">${img}</td><td colspan="${colspan}">${img}</td>`;
                }
            }

            rowsAndCells += `</tr>`;
        }

        rowsAndCells += `<tr>`;

        for (let j = 0; j < i; j += 2) {
            if (i === 1) {
                rowsAndCells += `<td colspan="${colspan}">?</td>`;
            } else {
                rowsAndCells += `<td colspan="${colspan}">${games[gamesCounter].teamA.name}</td><td colspan="${colspan}">${games[gamesCounter].teamB.name}</td>`;

                ++gamesCounter;
            }
        }

        rowsAndCells += `</tr>`;
    }

    return `<table style="width: 100%; table-layout: fixed">${rowsAndCells}</table>`;
}
