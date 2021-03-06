<template>
    <div id="snackbar-container"
         :class="{'visible': visible, 'small-nav': withSmallNav, 'big-nav': withBigNav, 'left-nav': withLeftNav }"
         @click="closeSnackbar">
        <div class="message">{{ message }}</div>
        <div class="action" v-if="actionText">{{ actionText }}</div>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['withLeftNav'],
        methods: {
            closeSnackbar () {
                this.$store.dispatch('closeSnackbar');
            }
        },
        computed: {
            message () {
                return this.$store.state.snackbar.message;
            },
            actionText () {
                return this.$store.state.snackbar.actionText;
            },
            visible () {
                return this.$store.state.snackbar.visible;
            },
            withSmallNav () {
                return this.$route.name === 'competition' && this.$store.state.competition.name !== undefined && this.$store.state.competitionScrollingDown;
            },
            withBigNav () {
                return this.$route.name === 'competition' && this.$store.state.competition.name !== undefined && !this.$store.state.competitionScrollingDown;
            }
        }
    };
</script>

<style lang="scss">
    #snackbar-container {
        position: fixed;
        bottom: -100px;
        transition: bottom 250ms ease-in-out;
        left: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #cacaca;
        background-color: rgba(0, 0, 0, 0.8);
        padding: 16px;
        box-sizing: border-box;
        border-radius: 4px;
        min-height: 48px;
        cursor: pointer;
        z-index: 100;

        .action {
            text-transform: uppercase;
            margin-left: 16px;
            color: var(--main-color);
        }
    }

    #snackbar-container.visible {
        bottom: 8px;
    }

    @media not all and (orientation: landscape) {
        #snackbar-container.visible.big-nav {
            bottom: 84px;
        }

        #snackbar-container.visible.small-nav {
            bottom: 56px;
        }
    }

    @media not all and (orientation: landscape) {
        #snackbar-container {
            width: calc(100% - 16px);
            left: 8px;
        }
    }

    @media (orientation: landscape) {
        #snackbar-container.left-nav {
            left: 88px
        }
    }
</style>
