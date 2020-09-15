<template>
    <div class="menu-items-container">
        <div class="menu-item" @click="onLogInGmailClick" v-if="!this.$auth.loggedIn">
            <google-icon></google-icon>
            <span>Logowanie Gmail</span>
        </div>
        <div class="menu-item" @click="onLogInFacebookClick" v-if="!this.$auth.loggedIn" >
            <facebook-icon></facebook-icon>
            <span>Logowanie Facebook</span>
        </div>
        <div class="menu-item" @click="onMineClick" v-if="this.$auth.loggedIn">
            <list-icon></list-icon>
            <span>Moje rozgrywki</span>
        </div>
        <div class="menu-item" @click="onAboutClick">
            <ball-icon></ball-icon>
            <span>O aplikacji</span>
        </div>
        <div class="menu-item" @click="onLogOutClick" v-if="this.$auth.loggedIn">
            <bye-icon></bye-icon>
            <span>Wyloguj</span>
        </div>
    </div>
</template>

<script lang="ts">
    import byeIcon from '@/assets/icons/bye.svg';
    import ballIcon from '@/assets/icons/ball.svg';
    import facebookIcon from '@/assets/icons/facebook.svg';
    import googleIcon from '@/assets/icons/google.svg';
    import listIcon from '@/assets/icons/list.svg';

    export default {
        components: {
            facebookIcon, byeIcon, googleIcon, ballIcon, listIcon
        },
        methods: {
            onLogInGmailClick () {
                this.$auth.loginWith('google', { params: { prompt: 'login' } });
            },
            onLogInFacebookClick (event: any) {
                this.$auth.loginWith('facebook', { params: { prompt: 'login' } });
                event.stopPropagation();
            },
            onLogOutClick () {
                setTimeout(() => {
                    this.$auth.logout();
                }, 250);
            },
            onAboutClick () {
                this.$router.push('/');
            },
            onMineClick () {
                this.$router.push('/moje');
            }
        }
    };
</script>
