<template>
    <div id="snackbar-container" :class="{'visible': visible}" @click="closeSnackbar">
        <div class="message">{{ message }}</div>
        <div class="action" v-if="actionText">{{ actionText }}</div>
    </div>
</template>

<script lang="ts">
    export default {
        data () {
            return {
                visible: false,
                message: '',
                actionText: ''
            }
        },
        methods: {
            showSnackbar (message: string, actionText: string = '') {
                this.message = message;
                this.actionText = actionText;
                this.visible = true;

                if (!this.actionText) {
                    setTimeout(() => {
                        this.closeSnackbar();
                    }, 4000);
                }
            },
            closeSnackbar () {
                this.visible = false;
            }
        }
    }
</script>

<style lang="scss">
    #snackbar-container {
        position: fixed;
        bottom: -100px;
        transition: bottom 250ms ease-in-out;
        left: 0;
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

        .action {
            text-transform: uppercase;
            margin-left: 16px;
            color: $main-color-dark;
        }
    }

    @media not all and (orientation: landscape) {
        #snackbar-container.visible {
            bottom: 84px;
        }
    }

    @media not all and (orientation: landscape) {
        #snackbar-container {
            width: calc(100% - 16px);
            left: 8px;
        }
    }

    @media (orientation: landscape) {
        #snackbar-container.visible {
            bottom: 8px;
        }
    }

    @media (orientation: landscape) {
        #snackbar-container {
            left: 88px
        }
    }
</style>
