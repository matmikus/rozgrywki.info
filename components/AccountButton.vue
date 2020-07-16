<template>
    <div>
        <div id="account-button">
            <account-icon v-if="!$auth.loggedIn"></account-icon>
            <img v-else :src="getUserPicture()">
        </div>
    </div>
</template>

<script lang="ts">
    import accountIcon from '@/assets/icons/account.svg';

    export default {
        components: { accountIcon },
        methods: {
            getUserPicture () {
                if (typeof this.$auth.user.picture === 'string') {
                    return this.$auth.user.picture;
                }

                if (this.$auth.user.picture && this.$auth.user.picture.data && typeof this.$auth.user.picture.data.url === 'string') {
                    return this.$auth.user.picture.data.url;
                }

                return '';
            }
        }
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
