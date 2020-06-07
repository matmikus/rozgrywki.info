<template>
    <div id="dialog-container" :class="{'visible': visible}">
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
                visible: false,
                cardVisible: false,
                heading: '',
                message: '',
                cancelText: '',
                okText: '',
                promiseResolve: null
            };
        },
        methods: {
            showDialog (heading: string, message: string, okText: string = '', cancelText: string = '') {
                this.heading = heading;
                this.message = message;
                this.cancelText = cancelText;
                this.okText = okText;
                this.visible = true;
                this.cardVisible = true;

                return new Promise((resolve) => {
                    this.promiseResolve = resolve;
                });
            },
            closeDialog () {
                this.cardVisible = false;
                setTimeout(() => {
                    this.visible = false;
                }, 250);
            },
            onCancelClick () {
                this.closeDialog();
                this.promiseResolve(false);
            },
            onOkClick () {
                this.closeDialog();
                this.promiseResolve(true);
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

            .heading {
                font-size: 16px;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 12px 24px;
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
                    color: $main-color-dark;
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
