<template>
    <div id="default-header-container">
        <logo class="logo"></logo>
        <div class="competition-info">
            <div class="competition-name-wrapper">
                <span class="competition-name-text">&nbsp;{{ competitionName }}</span>
            </div>
            <div class="spacer"></div>
            <share-button class="share-button pointer"
                          v-if="!!competitionName"
                          @click="onShareButtonClick"></share-button>
        </div>
        <color-mode-button @click="$colorMode.preference = $colorMode.preference === 'light' ? 'dark' : 'light'"
                           class="color-mode-button pointer"></color-mode-button>
        <account-button class="account-button pointer"
                        @click="onAccountButtonClick"></account-button>
        <context-menu ref="accountMenu">
            <div class="menu-item">
                <ball-icon></ball-icon>
                <span>Logowanie</span>
            </div>
            <div class="menu-item">
                <ball-icon></ball-icon>
                <span>Nowe konto</span>
            </div>
            <div class="menu-item">
                <ball-icon></ball-icon>
                <span>O aplikacji</span>
            </div>
        </context-menu>
        <context-menu ref="shareMenu">
            <div class="menu-label">
                Udostępnij:
            </div>
            <div class="menu-item">
                <ball-icon></ball-icon>
                <span>Facebook</span>
            </div>
            <div class="menu-item">
                <ball-icon></ball-icon>
                <span>E-mail</span>
            </div>
            <div class="menu-item">
                <ball-icon></ball-icon>
                <span>Whatsapp</span>
            </div>
            <div class="menu-item">
                <ball-icon></ball-icon>
                <span>Twitter</span>
            </div>
            <div class="menu-item">
                <ball-icon></ball-icon>
                <span>Kopiuj link</span>
            </div>
        </context-menu>
    </div>
</template>

<script lang="ts">
    import logo from '@/components/Logo.vue';
    import contextMenu from '@/components/ContextMenu.vue';
    import colorModeButton from '@/assets/icons/brightness.svg';
    import accountButton from '@/assets/icons/account.svg';
    import shareButton from '@/assets/icons/share.svg';
    import ballIcon from '@/assets/icons/person.svg';
    import ballIcon from '@/assets/icons/person_add.svg';
    import ballIcon from '@/assets/icons/email.svg';
    import ballIcon from '@/assets/icons/link.svg';

    export default {
        components: {
            logo, colorModeButton, accountButton, shareButton, contextMenu, ballIcon
        },
        props: ['competitionName'],
        methods: {
            onAccountButtonClick (event: any) {
                const targetPositions = event.target.getBoundingClientRect();

                setTimeout(() => {
                this.$refs.accountMenu.show(document.body.clientWidth - targetPositions.right, targetPositions.bottom + 4);
                }, 100);
            },
            onShareButtonClick (event: any) {
                const targetPositions = event.target.getBoundingClientRect();

                setTimeout(() => {
                    this.$refs.shareMenu.show(document.body.clientWidth - targetPositions.right, targetPositions.bottom + 4);
                }, 100);
            }
        }
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
