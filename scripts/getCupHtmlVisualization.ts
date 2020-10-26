export function getCupHtmlVisualization (competition: any) {
    if (competition.isDoubleEliminationCup) {
        return 'Brak podglądu drabinki brazylijskiej';
    }

    if (competition.games.length === 0) {
        return 'Brak wygenerowanych meczów';
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
                                         <div class="cup-result">${getCupResult(competition.games[gameCounter])}<span class="cup-game-number">#${gameCounter + 1}</span></div>
                                     </div>
                                 </div>`;

            gameCounter += 1;
        }

        html += '</div>';
    }

    const finalGame = competition.games[competition.games.length - 1];
    let winnerName = '?';

    if (finalGame.aResult !== null && finalGame.bResult !== null) {
        if (finalGame.aResult > finalGame.bResult) {
            winnerName = finalGame.aCompetitor.name;
        } else if (finalGame.aResult < finalGame.bResult) {
            winnerName = finalGame.bCompetitor.name;
        }
    }

    html += `<div class="cup-winner">${winnerName}</div>`;
    html += '</div>';

    return html;
}

function getCompetitorName (competitorObj: { name: String } | null) {
    return (competitorObj && competitorObj.name) || '?';
}

function getCupResult (game: any) {
    let result = '';

    if (game.aResult != null && game.bResult != null) {
        result = `${game.aResult}:${game.bResult}`;
    }

    return result;
}
