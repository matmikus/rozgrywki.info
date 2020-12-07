export function getUserId (context: any) {
    const strategy = context.$auth ? context.$auth.strategy.name : null;

    if (strategy === 'google' && context.$auth.user) {
        return `google-${context.$auth.user.sub}`;
    }

    if (strategy === 'facebook' && context.$auth.user) {
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

export function getUpdateToken (context: any) {
    return context.$auth && context.$auth.updateToken ? context.$auth.updateToken : '';
}
