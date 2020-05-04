export function getIdFromAuth0UserSub(auth0UserSub: string): string {
    const result = auth0UserSub.split('|').pop();

    return result ? result : '';
}