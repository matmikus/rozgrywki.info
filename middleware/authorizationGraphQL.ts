// obejście problemu odrzucanych zapytań do hasury po wylogowaniu i ustawieniu się tokena na false
// do zapytań wykorzystujemy własne ciasteczko authToken, do którego kopiujemy token lub czyścimy
const Cookies = require('cookies');

export default function (context: { $auth: { $state: { loggedIn: boolean }, getToken: any }, res: { cookie: any, clearCookie: any }, req: any }) {
    if (process.server) {
        const cookies = new Cookies(context.req, context.res);
        // TODO context.res nie ma metod cookie i clearCookie na heroku i sie wydupia apka
        if (context.$auth.$state.loggedIn) {
            // context.res.cookie('authToken', context.$auth.getToken('auth0'));
            cookies.set('authToken', context.$auth.getToken('auth0'));
        } else {
            // context.res.clearCookie('authToken', {path:'/'});
            cookies.set('authToken', '', { maxAge: 0 });
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