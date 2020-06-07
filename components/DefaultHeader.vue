<template>
    <div id="default-header-container">
        <logo class="logo"></logo>
        <div class="competition-info">
            <div class="competition-name-wrapper">
                <span class="competition-name-text">&nbsp;{{ competitionName }}</span>
            </div>
            <div class="spacer"></div>
            <share-button class="share-button pointer" v-if="!!competitionName"></share-button>
        </div>
        <color-mode-button @click="$colorMode.preference = $colorMode.preference === 'light' ? 'dark' : 'light'"
                           class="color-mode-button pointer"></color-mode-button>
        <account-button class="account-button pointer"></account-button>
    </div>
</template>

<script lang="ts">
    import logo from '@/components/Logo.vue';
    import colorModeButton from '@/assets/icons/brightness.svg';
    import accountButton from '@/assets/icons/account.svg';
    import shareButton from '@/assets/icons/share.svg';

    export default {
        components: {
            logo, colorModeButton, accountButton, shareButton
        },
        props: ['competitionName']
    };
</script>

<style lang="scss">
    #default-header-container {
        position: fixed;
        width: 100%;
        display: flex;
        align-items: center;
        height: 56px;

        .logo, .color-mode-button, .account-button, .share-button {
            height: 24px;
            margin: 8px;
            flex-shrink: 0;
        }

        .logo {
            margin-left: 16px;
            flex-shrink: 1;
        }

        .spacer {
            flex-grow: 1;
        }

        .competition-info {
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            flex-shrink: 10;
            height: 56px;
            overflow: hidden;
        }

        .competition-name-wrapper {
            height: 56px;
            display: flex;
            align-items: center;
            overflow: hidden;
        }

        .competition-name-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 18px;
        }
    }

    .dark-mode {
        #default-header-container {
            background-color: $accent-color-dark;

            .logo {
                fill: $main-color-dark;
            }

            .color-mode-button, .account-button, .share-button {
                fill: $text-color-dark;
            }

            .color-mode-button {
                transform: scaleX(-1);
            }

            .competition-name-wrapper {
                color: $main-color-dark;
            }
        }
    }

    .light-mode {
        #default-header-container {
            background-color: $accent-color-light;

            .logo {
                fill: $main-color-light;
            }

            .color-mode-button, .account-button, .share-button {
                fill: $text-color-light;
            }

            .competition-name-wrapper {
                color: $main-color-light;
            }
        }
    }
</style>
