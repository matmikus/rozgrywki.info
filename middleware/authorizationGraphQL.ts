// obejście problemu odrzucanych zapytań do hasury po wylogowaniu i ustawieniu się tokena na false
// do zapytań wykorzystujemy własne ciasteczko authToken, do którego kopiujemy token lub czyścimy
const cookie = require('cookie');

export default function (context: { $auth: { $state: { loggedIn: boolean }, getToken: any }, res: { setHeader: any, clearCookie: any }, req: any }) {
    if (process.server) {
        if (context.$auth.$state.loggedIn) {
            context.res.setHeader('set-cookie', cookie.serialize('authToken', context.$auth.getToken('auth0')));
        } else {
            context.res.setHeader('set-cookie', cookie.serialize('authToken', ''));
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