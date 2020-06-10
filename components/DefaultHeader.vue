<template>
    <div id="default-header-container">
        <logo class="logo" @click="onLogoClick"></logo>
        <div class="competition-info">
            <div class="competition-name-wrapper">
                <span class="competition-name-text">&nbsp;{{ competition.name }}</span>
            </div>
            <div class="spacer"></div>
            <share-button class="share-button pointer"
                          id="default-header-share-button"
                          v-if="!!competition.name"
                          v-tooltip.bottom="{ content: 'Udostępnij', delay: { show: 500, hide: 0, trigger: 'hover', trigger: 'hover' } }"
                          @click="onShareButtonClick"></share-button>
        </div>
        <color-mode-button @click="$colorMode.preference = $colorMode.preference === 'light' ? 'dark' : 'light'"
                           class="color-mode-button pointer"
                           v-tooltip.bottom="{ content: 'Zmień kolorystykę', delay: { show: 500, hide: 0, trigger: 'hover' } }">
        </color-mode-button>
        <account-button class="account-button pointer"
                        id="default-header-account-button"
                        v-tooltip.bottom="{ content: 'Menu użytkownika', delay: { show: 500, hide: 0, trigger: 'hover' } }"
                        @click="onAccountButtonClick"></account-button>
        <context-menu ref="accountMenuRef" :iconId="'default-header-account-button'">
            <account-menu></account-menu>
        </context-menu>
        <context-menu ref="shareMenuRef" :iconId="'default-header-share-button'">
            <share-menu></share-menu>
        </context-menu>
    </div>
</template>

<script lang="ts">
    import logo from '@/assets/logo/logo.svg';
    import colorModeButton from '@/assets/icons/brightness.svg';
    import accountButton from '@/assets/icons/account.svg';
    import shareButton from '@/assets/icons/share.svg';
    import contextMenu from '@/components/ContextMenu.vue';
    import accountMenu from '@/components/AccountMenu.vue';
    import shareMenu from '@/components/ShareMenu.vue';

    export default {
        components: {
            logo, colorModeButton, accountButton, shareButton, contextMenu, accountMenu, shareMenu
        },
        data () {
            return {
                competition: this.$store.state.competition
            }
        },
        methods: {
            onAccountButtonClick (event: any) {
                const targetPositions = event.target.getBoundingClientRect();

                if (this.$refs.accountMenuRef.visibility) {
                    this.$refs.accountMenuRef.close();
                } else {
                    this.$refs.accountMenuRef.show(document.body.clientWidth - targetPositions.right, targetPositions.bottom + 4);
                }
            },
            onShareButtonClick (event: any) {
                const targetPositions = event.target.getBoundingClientRect();

                if (this.$refs.shareMenuRef.visibility) {
                    this.$refs.shareMenuRef.close();
                } else {
                    this.$refs.shareMenuRef.show(document.body.clientWidth - targetPositions.right, targetPositions.bottom + 4);
                }
            },
            onLogoClick () {
                this.$router.push('/');
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
            cursor: pointer;
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
            transition: unset;
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

    @media (hover: hover) {
        .light-mode {
            #default-header-container {
                .color-mode-button:hover, .account-button:hover, .share-button:hover {
                    fill: $main-color-light;
                }
            }
        }

        .dark-mode {
            #default-header-container {
                .color-mode-button:hover, .account-button:hover, .share-button:hover {
                    fill: $main-color-dark;
                }
            }
        }
    }
</style>
