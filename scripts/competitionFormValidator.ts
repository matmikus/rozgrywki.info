export function competitionNameValidator (value: string) {
    return value.length > 2 && value.length < 61;
}

export function competitionRouteNameValidator (value: string) {
    return value.length > 4 && value.length < 41;
}

export function competitionDescriptionValidator (value: string) {
    return value.length < 1001;
}

export function competitionCompetitorNameValidator (value: string) {
    return value.length > 2 && value.length < 41;
}
