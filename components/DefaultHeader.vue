<template>
    <div id="default-header-container">
        <logo class="logo"></logo>
        <div class="spacer"></div>
        <color-mode-button @click="$colorMode.preference = $colorMode.preference === 'light' ? 'dark' : 'light'"
                           class="color-mode-button pointer"></color-mode-button>
        <account-button class="account-button pointer"></account-button>
    </div>
</template>

<script lang="ts">
    import logo from '@/components/Logo.vue';
    import colorModeButton from '@/assets/icons/brightness.svg';
    import accountButton from '@/assets/icons/account.svg';

    export default {
        components: { logo, colorModeButton, accountButton },
        methods: {
            onColorModeButtonTap () {

            }
        }
    };
</script>

<style lang="scss">
    #default-header-container {
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        height: 56px;

        .logo {
            flex-shrink: 10;
        }

        .logo, .color-mode-button, .account-button {
            height: 24px;
            margin: 8px;
        }

        .spacer {
            flex-grow: 1;
        }
    }

    .dark-mode {
        #default-header-container {
            background-color: $accent-color-dark;

            .logo, .color-mode-button, .account-button {
                fill: $main-color-dark;
            }

            .color-mode-button {
                transform: scaleX(-1);
            }
        }
    }

    .light-mode {
        #default-header-container {
            background-color: $accent-color-light;

            .logo, .color-mode-button, .account-button {
                fill: $main-color-light;
            }
        }
    }
</style>
