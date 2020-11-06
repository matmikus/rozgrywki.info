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
        // todo logic
    } else if (type === 'group') {
        games = bergerTable2(competitors);

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

function bergerTable (competitors: any) {
    const teams = [...competitors];

    if (teams.length % 2 !== 0) {
        teams.push({});
    }

    const n = teams.length;
    const numberOfRounds = n - 1;
    const gamesPerRound = n / 2;

    let columnA = teams.slice(0, gamesPerRound);
    let columnB = teams.slice(gamesPerRound);
    const fixed = teams[0];

    let gameCount = 1;
    return Array.from({ length: numberOfRounds }).map((_, i) => {
        let round = Array.from({ length: gamesPerRound }).reduce((acc: any, _, k) => {
            if ((columnA[k].id !== undefined && columnB[k].id !== undefined)) {
                acc.push({
                    number: gameCount,
                    aCompetitor: columnA[k],
                    bCompetitor: columnB[k],
                    aResult: null,
                    bResult: null,
                    date: null,
                    details: null
                });
                gameCount++;
            }
            return acc;
        }, []);

        columnA = [fixed, columnB.shift(), ...columnA.slice(1)];
        columnB.push(columnA.pop());
        return round;
    }).flat();
}

function bergerTable2 (competitors: any[]) {
    let teams = [...competitors];
    const separate = teams.length % 2 === 0 ? teams.pop() : null;
    let games = [];
    let counter = 0;

    for (let j = 0; j < teams.length; j++) {
        if (separate !== null) games.push({ aCompetitor: teams[0], bCompetitor: separate, number: ++counter });

        for (let i = 1; i <= Math.floor(teams.length / 2); i++) {
            games.push({ aCompetitor: teams[i], bCompetitor: teams[teams.length - i], number: ++counter });
        }

        teams.unshift(teams.pop());
        teams.unshift(teams.pop());
    }

    return games;
}
