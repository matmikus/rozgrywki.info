<template>
    <div id="competition-nav-container" :class="{'small-nav': small}">
        <div class="nav-item">
            <div class="spacer"></div>
            <div class="icon-container">
                <info-icon class="nav-icon"></info-icon>
            </div>
            <div class="name-container">info</div>
            <div class="spacer"></div>
        </div>
        <div class="nav-item">
            <div class="spacer"></div>
            <div class="icon-container">
                <games-icon class="nav-icon"></games-icon>
            </div>
            <div class="name-container">mecze</div>
            <div class="spacer"></div>
        </div>
        <div class="nav-item" v-if="false">
            <div class="spacer"></div>
            <div class="icon-container">
                <ranking-icon class="nav-icon"></ranking-icon>
            </div>
            <div class="name-container">tabela</div>
            <div class="spacer"></div>
        </div>
        <div class="nav-item">
            <div class="spacer"></div>
            <div class="icon-container">
                <cup-icon class="nav-icon"></cup-icon>
            </div>
            <div class="name-container">drabinka</div>
            <div class="spacer"></div>
        </div>
        <div class="active-bar-container"></div>
    </div>
</template>

<script lang="ts">
    import cupIcon from '@/assets/icons/graph.svg';
    import rankingIcon from '@/assets/icons/format_list_numbered.svg';
    import infoIcon from '@/assets/icons/info.svg';
    import gamesIcon from '@/assets/icons/reorder.svg';

    export default {
        components: { cupIcon, rankingIcon, infoIcon, gamesIcon },
        props: ['small']
    };
</script>

<style lang="scss">
    #competition-nav-container {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;

        .nav-item {
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: height 250ms ease-in-out;
        }

        .name-container {
            text-transform: uppercase;
            font-size: 12px;
        }

        .spacer {
            height: 17px;
        }

        .active-bar-container {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 33%;
            height: 3px;
            transition: left 250ms ease-in-out;
        }

        .icon-container {
            height: 28px;
            transition: height 250ms ease-in-out;
            display: flex;
            align-items: flex-start;
            overflow: hidden;
        }

        @media (not (orientation: landscape)) {
            .active-bar-container {
                top: unset !important;
            }
        }

        @media (orientation: landscape) {
            bottom: unset;
            top: 56px;
            width: 80px;
            height: calc(100% - 56px);
            flex-direction: column;

            .nav-item {
                flex: unset;
                height: 72px;
                transition: unset;
            }

            .active-bar-container {
                position: absolute;
                top: 0;
                right: 0;
                bottom: unset;
                left: unset !important;
                width: 3px;
                height: 72px;
                transition: top 250ms ease-in-out;
            }
        }
    }

    .dark-mode {
        #competition-nav-container {
            background-color: $accent-color-dark;

            .nav-icon {
                fill: $text-color-dark;
            }

            .name-container {
                color: $text-color-dark;
            }

            .active-bar-container {
                background-color: $text-color-dark;
            }
        }
    }

    .light-mode {
        #competition-nav-container {
            background-color: $accent-color-light;

            .nav-icon {
                fill: $text-color-light;
            }

            .name-container {
                color: $text-color-light;
            }

            .active-bar-container {
                background-color: $text-color-light;
            }
        }
    }

    @media not all and (orientation: landscape) {
        #competition-nav-container.small-nav {
            .nav-item {
                height: 48px;
            }

            .icon-container {
                height: 0;
            }
        }
    }
</style>
