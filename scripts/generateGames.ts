export function generateGamesForContainer (container: any, data: any) {
    let { competitors, type, isDouble } = container;

    if (data.type) {
        type = data.type;
    }

    if (data.isDouble) {
        isDouble = data.isDouble;
    }

    if (data.size) {
        competitors = [];

        for (let i = 0; i < data.size; i++) {
            competitors.push({ name: '', id: i });
        }
    }

    let games: any[] = [];

    if (type === 'cup') {
        let cupSize = 2;
        while (cupSize < competitors.length) {
            cupSize *= 2;
        }

        let firstRoundPairs: any[] = [];
        for (let i = 0; i < cupSize / 2; i++) {
            firstRoundPairs.push({
                seed: i + 1,
                aCompetitor: competitors[i],
                bCompetitor: competitors[cupSize - 1 - i] !== undefined ? competitors[cupSize - 1 - i] : null
            });
        }

        for (let i = 0; i < cupSize - 1; i++) {
            games.push({
                number: i + 1,
                aCompetitor: null,
                bCompetitor: null,
                aResult: null,
                bResult: null,
                details: null,
                date: null
            });
        }

        const order = cupSeedingOrder(firstRoundPairs.length);
        for (let i = 0; i < firstRoundPairs.length; i++) {
            games[i].aCompetitor = firstRoundPairs[order[i] - 1].aCompetitor;
            games[i].bCompetitor = firstRoundPairs[order[i] - 1].bCompetitor;
        }

        for (let i = 0; i < cupSize / 2; i++) {
            if (games[i].aCompetitor === null) setCupGameWiner(cupSize, games, games[i].number, games[i].bCompetitor);
            else if (games[i].bCompetitor === null) setCupGameWiner(cupSize, games, games[i].number, games[i].aCompetitor);
        }

    } else if (type === 'group') {
        games = getBergerTable(competitors);

        if (isDouble) {
            let gameCounter = games.length + 1;
            let secondRound = JSON.parse(JSON.stringify(games));

            secondRound = secondRound.map((el: any) => {
                const tempCompetitor = el.aCompetitor;
                el.aCompetitor = el.bCompetitor;
                el.bCompetitor = tempCompetitor;
                el.number = gameCounter++;

                return el;
            });

            games = games.concat(secondRound);
        }

    }

    return games;
}

function getBergerTable (competitors: any[]) {
    let teams = [...competitors];
    const separate = teams.length % 2 === 0 ? teams.pop() : null;
    let games = [];
    let counter = 0;

    for (let j = 0; j < teams.length; j++) {
        if (separate !== null) games.push({
            aCompetitor: teams[0],
            bCompetitor: separate,
            number: ++counter
        });

        for (let i = 1; i <= Math.floor(teams.length / 2); i++) {
            games.push({
                aCompetitor: teams[i],
                bCompetitor: teams[teams.length - i],
                number: ++counter
            });
        }

        teams.unshift(teams.pop());
        teams.unshift(teams.pop());
    }

    return games.map((el: any) => {
        el.aResult = null;
        el.bResult = null;
        el.details = null;
        el.date = null;
    });
}

function cupSeedingOrder (numPlayers: number) {
    let rounds = Math.log(numPlayers) / Math.log(2) - 1;
    let pls = [1, 2];

    for (let i = 0; i < rounds; i++) {
        pls = nextLayer(pls);
    }

    return pls;

    function nextLayer (pls: number[]) {
        let out: number[] = [];
        let length = pls.length * 2 + 1;

        pls.forEach(function (d) {
            out.push(d);
            out.push(length - d);
        });

        return out;
    }
}

function setCupGameWiner (cupSize: number, games: any[], gameNumber: number, competitor: any) {
    const isEven = gameNumber % 2 === 0;
    let nextGameNumber = getNextGameNumber(cupSize, gameNumber);

    let nextGame = games.find((el: any) => el.number === nextGameNumber);
    if (isEven) {
        nextGame.bCompetitor = competitor;
    } else {
        nextGame.aCompetitor = competitor;
    }
}

function getNextGameNumber (cupSize: number, gameNumber: number) {
    let round = 1;
    let currentRound = cupSize / 2;
    let previousRound = 0;
    while (gameNumber > currentRound) {
        round++;
        previousRound = currentRound;
        currentRound += cupSize / Math.pow(2, round);
    }

    const gameNumberInRound = gameNumber - previousRound;
    const nextGameNumber = Math.ceil(gameNumberInRound / 2) + currentRound;
    return nextGameNumber === cupSize ? null : nextGameNumber;
}
