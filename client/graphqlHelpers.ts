export function hasResults(apolloResultArray: object[]): boolean {
    return apolloResultArray.length > 0;
}

export function getResultObject(apolloResultArray: { [key: string]: number | string }[]): {} {
    if (apolloResultArray.length === 0) {
        return {};
    }

    return apolloResultArray[0];
}
