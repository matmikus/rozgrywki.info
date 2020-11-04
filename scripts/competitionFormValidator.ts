export function competitionNameValidator (value: string) {
    return value != null && value.length > 2 && value.length < 61;
}

export function competitionRouteNameValidator (value: string) {
    return value != null && value.length > 4 && value.length < 41;
}

export function competitionDescriptionValidator (value: string) {
    return value != null && value.length < 1001;
}

export function competitionCompetitorNameValidator (value: string) {
    return value != null && value.length > 2 && value.length < 41;
}

export function pointsValidator (value: string) {
    return value != null && parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100;
}

export function competitorsCountValidator (value: string) {
    return value != null && parseInt(value, 10) >= 2 && parseInt(value, 10) <= 64;
}

export function competitorNameValidator (value: string) {
    return value != null && value.length >= 3 && value.length <= 40;
}

export function gameResultDetailsValidatorFunction (value: string) {
    return value === undefined || value === null || value === '' || value.length >= 0 && value.length <= 40;
}

export function gameResultValidatorFunction (value: string) {
    return value === '' || value === null || value === undefined || parseInt(value, 10) >= 0 && parseInt(value, 10) <= 10000;
}
