<template>
    <div>
        <div id="account-button">
            <account-icon v-if="!$auth.loggedIn"></account-icon>
            <img v-else :src="$auth.user.picture">
        </div>
    </div>
</template>

<script lang="ts">
    import accountIcon from '@/assets/icons/account.svg';

    export default {
        components: { accountIcon }
    };
</script>

<style lang="scss">
    #account-button {
        width: 24px;
        height: 24px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
</style>
