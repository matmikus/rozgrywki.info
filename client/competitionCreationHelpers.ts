export function createRoundRobinPairsForTeams (competitors: any[], isDouble: boolean = false): { teamA: string | undefined, teamB: string | undefined, gameNumber: number | undefined }[] {
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
            doubleArr.push({ teamA: pairs[i].teamB, teamB: pairs[i].teamA, gameNumber: gameCounter++ });
        }

        pairs = pairs.concat(doubleArr);
    }

    return pairs;
}
