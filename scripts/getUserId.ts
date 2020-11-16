export function getUserId (context: any) {
    const strategy = context.$auth ? context.$auth.strategy.name : null;

    if (strategy === 'google') {
        return `google-${context.$auth.user.sub}`;
    }

    if (strategy === 'facebook') {
        return `facebook-${context.$auth.user.id}`;
    }

    return '';
}

export function getUserData (context: any) {
    if (context.$auth && context.$auth.user) {
        return `email: ${context.$auth.user.email}, name: ${context.$auth.user.name}, locale: ${context.$auth.user.locale}`;
    }

    return '';
}
