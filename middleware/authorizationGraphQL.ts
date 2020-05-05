// obejście problemu odrzucanych zapytań do hasury po wylogowaniu i ustawieniu się tokena na false
// do zapytań wykorzystujemy własne ciasteczko authToken, do którego kopiujemy token lub czyścimy

export default function (context: { $auth: { $state: { loggedIn: boolean }, getToken: any }, res: { cookie: any, clearCookie: any } }) {
    if (process.server) {
        if (context.$auth.$state.loggedIn) {
            context.res.cookie('authToken', context.$auth.getToken('auth0'));
        } else if (typeof context.res.clearCookie === 'function') {
            context.res.clearCookie('authToken', {path:'/'});
        }
    }
    
    if (process.client) {
        if (context.$auth.$state.loggedIn) {
            document.cookie = `authToken=${context.$auth.getToken('auth0')}`;
        } else {
            document.cookie = 'authToken=';
        }
    }
};