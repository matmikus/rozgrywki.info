<template>
    <div id="competition-nav-container" :class="{'small-nav': small}">
        <div class="nav-item" v-scroll-to="'#info-section'" @click="moveBar('info-section')">
            <div class="spacer"></div>
            <div class="icon-container">
                <info-icon class="nav-icon"></info-icon>
            </div>
            <div class="name-container">info</div>
            <div class="spacer"></div>
        </div>
        <div class="nav-item" v-scroll-to="'#games-section'" @click="moveBar('games-section')">
            <div class="spacer"></div>
            <div class="icon-container">
                <games-icon class="nav-icon"></games-icon>
            </div>
            <div class="name-container">mecze</div>
            <div class="spacer"></div>
        </div>
        <div class="nav-item"
             v-if="false"
             v-scroll-to="'#ranking-section'"
             @click="moveBar('ranking-section')">
            <div class="spacer"></div>
            <div class="icon-container">
                <ranking-icon class="nav-icon"></ranking-icon>
            </div>
            <div class="name-container">tabela</div>
            <div class="spacer"></div>
        </div>
        <div class="nav-item" v-scroll-to="'#cup-section'" @click="moveBar('cup-section')">
            <div class="spacer"></div>
            <div class="icon-container">
                <component :is="competitionSummaryIconName" class="nav-icon"></component>
            </div>
            <div class="name-container">{{ competitionSummaryName }}</div>
            <div class="spacer"></div>
        </div>
        <div class="active-bar-container"
             :class="barPositionClassName"></div>
    </div>
</template>

<script lang="ts">
    import cupIcon from '@/assets/icons/graph.svg';
    import rankingIcon from '@/assets/icons/format_list_numbered.svg';
    import infoIcon from '@/assets/icons/info.svg';
    import gamesIcon from '@/assets/icons/reorder.svg';

    export default {
        components: {
            cupIcon, rankingIcon, infoIcon, gamesIcon
        },
        props: ['small'],
        computed: {
            barPositionClassName () {
                return `position-${this.$store.state.bar.position}`;
            },
            competitionSummaryName () {
                return this.$store.state.competitionSummary.name;
            },
            competitionSummaryIconName () {
                return this.$store.state.competitionSummary.iconName;
            }
        },
        methods: {
            moveBar (section: string) {
                const data: { [key: string]: number } = {
                    'info-section': 1,
                    'games-section': 2,
                    'cup-section': 3
                };

                this.$store.dispatch('moveBarWithLock', data[section]);
            }
        },
        mounted () {
            this.$store.dispatch('resetBar');
        }
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
        background-color: var(--bar-bg-color);

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

        .nav-icon {
            fill: var(--bar-txt-color);
        }

        .name-container {
            text-transform: uppercase;
            font-size: 12px;
            color: var(--bar-txt-color);
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
            background-color: var(--main-color);
        }

        .active-bar-container.position-2 {
            top: 72px;
            left: 33%;
        }

        .active-bar-container.position-3 {
            top: 144px;
            left: 67%;
        }

        .icon-container {
            height: 28px;
            transition: height 250ms ease-in-out;
            display: flex;
            align-items: flex-start;
            overflow: hidden;
        }

        @media not all and (orientation: landscape) {
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
                width: 100%;
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

    @media (hover: hover) {
            #competition-nav-container {
                .nav-item:hover {
                    .nav-icon {
                        fill: var(--bar-txt-active);
                    }

                    .name-container {
                        color: var(--bar-txt-active);
                    }
                }
            }
    }
</style>
