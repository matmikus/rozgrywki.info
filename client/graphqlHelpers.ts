export function hasResults(apolloResultArray: object[]): boolean {
    return apolloResultArray.length > 0;
}

export function getResultObject(apolloResultArray: { [key: string]: number | string }[], propName: string): {} {
    if (apolloResultArray.length === 0) {
        return {};
    }

    if (propName === undefined) {
        return apolloResultArray[0];
    }

    if (apolloResultArray[0][propName] === undefined) {
        return {};
    }

    return apolloResultArray[0][propName];
}