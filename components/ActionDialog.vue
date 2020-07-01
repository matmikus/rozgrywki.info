<template>
    <div id="dialog-container" :class="{'visible': containerVisible}">
        <div class="dialog-card" :class="{'visible': cardVisible}">
            <div class="heading">{{ heading }}</div>
            <div class="message">{{ message }}</div>
            <div class="actions">
                <div class="action cancel" v-if="cancelText" @click="onCancelClick">
                    {{ cancelText }}
                </div>
                <div class="action ok" v-if="okText" @click="onOkClick">{{ okText }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        data () {
            return {
                containerVisible: false,
                promiseResolve: null
            };
        },
        methods: {
            closeDialog (promiseResolve: boolean) {
                this.$store.dispatch('closeActionDialog', promiseResolve);
            },
            onCancelClick () {
                this.closeDialog(false);
            },
            onOkClick () {
                this.closeDialog(true);
            }
        },
        computed: {
            cardVisible () {
                return this.$store.state.actionDialog.visible;
            },
            heading () {
                return this.$store.state.actionDialog.heading;
            },
            message () {
                return this.$store.state.actionDialog.message;
            },
            cancelText () {
                return this.$store.state.actionDialog.cancelText;
            },
            okText () {
                return this.$store.state.actionDialog.okText;
            }
        },
        watch: {
            cardVisible (value: boolean) {
                if (value) {
                    this.containerVisible = true;
                } else {
                    setTimeout(() => {
                        this.containerVisible = false;
                    }, 250);
                }
            }
        }
    };
</script>

<style lang="scss">
    #dialog-container {
        opacity: 0;
        pointer-events: none;
        display: flex;
        position: fixed;
        top: 0;
        z-index: 200;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        .dialog-card {
            transform: scale(0);
            transition: transform 250ms ease-in-out;
            min-width: 280px;
            background-color: #fff;
            border-radius: 4px;
            max-width: 400px;
            margin: 32px;

            .heading {
                font-size: 16px;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 12px 24px;
                box-sizing: border-box;
            }

            .message {
                font-size: 14px;
                padding: 0 24px 12px;
            }

            .actions {
                height: 52px;
                margin: 0 24px;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .action {
                    font-size: 16px;
                    margin-left: 24px;
                    text-transform: uppercase;
                    cursor: pointer;
                }

                .action.ok {
                    color: var(--main-color);
                }
            }
        }
    }

    #dialog-container.visible {
        opacity: 1;
        pointer-events: auto;

        .dialog-card.visible {
            transform: scale(1);
        }
    }
</style>
