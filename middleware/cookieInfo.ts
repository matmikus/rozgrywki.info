export default function ({ app, store }: any) {
    const cookieInfo = app.$cookies.get('nuxt-cookie-info');

    if (!cookieInfo) {
        store.dispatch('showSnackbar', { message: 'Strona wykorzystuje cookies', actionText: 'OK' });
        app.$cookies.set('nuxt-cookie-info', true);
    }
}
