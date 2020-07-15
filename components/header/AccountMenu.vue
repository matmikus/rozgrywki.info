<template>
    <div class="menu-items-container">
        <div class="menu-item" @click="onLogInClick" v-if="!this.$auth.loggedIn">
            <person-icon></person-icon>
            <span>Logowanie</span>
        </div>
        <div class="menu-item" @click="onLogOutClick" v-if="this.$auth.loggedIn">
            <bye-icon></bye-icon>
            <span>Wyloguj</span>
        </div>
        <div class="menu-item" @click="onLogInClick" v-if="!this.$auth.loggedIn">
            <person-add-icon></person-add-icon>
            <span>Nowe konto</span>
        </div>
        <div class="menu-item" @click="onAboutClick">
            <ball-icon></ball-icon>
            <span>O aplikacji</span>
        </div>
    </div>
</template>

<script lang="ts">
    import personIcon from '@/assets/icons/person.svg';
    import byeIcon from '@/assets/icons/bye.svg';
    import personAddIcon from '@/assets/icons/person_add.svg';
    import ballIcon from '@/assets/icons/ball.svg';

    export default {
        components: {
            personIcon, byeIcon, personAddIcon, ballIcon
        },
        methods: {
            onLogInClick () {
                this.$auth.loginWith('google', { params: { prompt: 'login' } });
            },
            onLogOutClick () {
                setTimeout(() => {
                    this.$auth.logout();
                }, 250);
            },
            onAboutClick () {
                this.$router.push();
            }
        }
    };
</script>
