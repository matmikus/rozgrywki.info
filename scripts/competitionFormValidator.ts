export function competitionNameValidator (value: string) {
    if (value != null) {
        value = value.trim();
    }

    return value != null && value.length > 2 && value.length < 61;
}

export function competitionRouteNameValidator (value: string) {
    if (value != null) {
        value = value.trim();
    }

    return value != null && value.length > 4 && value.length < 41 && hasEveryCharFromList(value, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
}

export function competitionDescriptionValidator (value: string) {
    if (value != null) {
        value = value.trim();
    }

    return value != null && value.length < 1001;
}

export function competitionCompetitorNameValidator (value: string) {
    if (value != null) {
        value = value.trim();
    }

    return value != null && value.length > 2 && value.length < 41;
}

export function pointsValidator (value: string) {
    return value != null && parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100;
}

export function competitorsCountValidator (value: string) {
    return value != null && parseInt(value, 10) >= 2 && parseInt(value, 10) <= 64;
}

export function competitorNameValidator (value: string) {
    if (value != null) {
        value = value.trim();
    }

    return value != null && value.length >= 3 && value.length <= 40;
}

export function gameResultDetailsValidatorFunction (value: string) {
    if (value != null) {
        value = value.trim();
    }

    return value === undefined || value === null || value === '' || value.length >= 0 && value.length <= 40;
}

export function gameResultValidatorFunction (value: string) {
    return value === '' || value === null || value === undefined || parseInt(value, 10) >= 0 && parseInt(value, 10) <= 10000;
}

const hasEveryCharFromList = (value: string, list: string) => {
    for (const element of value) {
        if (!list.includes(element)) {
            return false;
        }
    }

    return true;
};
