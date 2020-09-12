export function getCupHtmlVisualization (competition: any) {
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
                                            <div>${getCompetitorName(competition.games[gameCounter].aCompetitor)}</div>
                                            <div class="cup-competitor-line-container">
                                                <div class="cup-competitor-line"></div>
                                            </div>
                                         </div>
                                         <div class="cup-competitor">
                                             <div>${getCompetitorName(competition.games[gameCounter].bCompetitor)}</div>
                                             <div class="cup-competitor-line-container">
                                                <div class="cup-competitor-line"></div>
                                             </div>
                                         </div>
                                     </div>
                                     <div class="cup-game-connector-container">
                                         <div class="cup-game-connector">&nbsp;&nbsp;</div>
                                         <div class="cup-result">${getCupResult(competition.games[gameCounter], competition.isDouble ? competition.games[gameCounter + 1] : {})}<span class="cup-game-number">#${gameCounter + 1}</span></div>
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
            winnerName = getCupDoubleFinalWinner(finalGame, secondFinalGame, competition.awayGoalsRule);
        }
    }

    html += `<div class="cup-winner">${winnerName}</div>`;
    html += '</div>';

    return html;
}

function getCompetitorName (competitorObj: { name: String } | null) {
    return (competitorObj && competitorObj.name) || '?';
}

function getCupResult (game: any, secondGame: any) {
    let result = '';

    if (game.aResult != null && game.bResult != null) {
        result = `${game.aResult}:${game.bResult}`;
    }

    if (secondGame.aResult != null && secondGame.bResult != null) {
        result += ` ,${game.aResult}:${game.bResult}`;
    }

    return result;
}

function getCupDoubleFinalWinner (firstGame: any, secondGame: any, awayGoalsRule: boolean) {
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
