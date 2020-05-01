// obejście problemu odrzucanych zapytań do hasury po wylogowaniu i ustawieniu się tokena na false
// do zapytań załączamy własne ciasteczko authToken, do którego kopiujemy token lub czyścimy

export default function (context) {
    if (process.server) {
        if (context.$auth.$state.loggedIn) {
            context.res.cookie('authToken', context.$auth.getToken('auth0'));
        } else {
            context.res.clearCookie('authToken');
        }
    }
    
    if (process.client) {
        if (context.$auth.$state.loggedIn) {
            document.cookie = `authToken=${context.$auth.getToken('auth0')}`;
        } else {
            document.cookie = 'authToken=';
        }
    }
}