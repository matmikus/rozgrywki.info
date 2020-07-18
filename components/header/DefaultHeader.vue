<template>
    <div id="default-header-container">
        <logo class="logo" @click="onLogoClick"></logo>
        <div class="competition-info">
            <div class="competition-name-wrapper">
                <span v-if="isCompetition" class="competition-name-text">&nbsp;{{ competition.name }}</span>
            </div>
            <div class="spacer"></div>
            <share-button class="share-button pointer"
                          id="default-header-share-button"
                          v-if="isCompetition"
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
                        @click.native="onAccountButtonClick"></account-button>
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
    import accountButton from '@/components/AccountButton.vue';
    import shareButton from '@/assets/icons/share.svg';
    import contextMenu from '@/components/ContextMenu.vue';
    import accountMenu from '@/components/header/AccountMenu.vue';
    import shareMenu from '@/components/header/ShareMenu.vue';

    export default {
        props: ['isCompetition'],
        components: {
            logo, colorModeButton, accountButton, shareButton, contextMenu, accountMenu, shareMenu
        },
        computed: {
            competition () {
                return this.$store.state.competition;
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
        background-color: var(--bar-bg-color);
        z-index: 100;

        .logo, .color-mode-button, .account-button, .share-button {
            height: 24px;
            margin: 8px;
            flex-shrink: 0;
            cursor: pointer;
            fill: var(--bar-txt-color);
        }

        .logo {
            margin-left: 16px;
            flex-shrink: 1;
            fill: var(--main-color);
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
            color: var(--bar-txt-color);
        }

        .competition-name-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 18px;
            transition: unset;
        }

        @media (hover: hover) {
            .color-mode-button:hover, .account-button:hover, .share-button:hover {
                fill: var(--bar-txt-active);
            }
        }
    }

    .dark-mode {
        #default-header-container {
            .color-mode-button {
                transform: scaleX(-1);
            }
        }
    }
</style>
