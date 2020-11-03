export function getUserId (context: any) {
    const strategy = context.$auth.strategy.name;

    if (strategy === 'google') {
        return `google-${context.$auth.user.sub}`;
    }

    if (strategy === 'facebook') {
        return `facebook-${context.$auth.user.id}`;
    }

    return '';
}
