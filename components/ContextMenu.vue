<template>
    <transition name="show-menu">
        <div id="menu-container"
             v-if="visibility"
             :style="{ right: rightPosition, top: topPosition }">
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts">
    export default {
        data () {
            return {
                visibility: false,
                rightPosition: null,
                topPosition: null
            }
        },
        mounted () {
            window.addEventListener('mousedown', this.handleEveryClick);
            window.addEventListener('touchstart', this.handleEveryClick);
        },
        destroyed () {
            window.removeEventListener('mousedown', this.handleEveryClick);
            window.removeEventListener('touchstart', this.handleEveryClick);
        },
        methods: {
            handleEveryClick (event: any) {
                this.visibility = false;
            },
            show (rightPosition: number, topPosition: number) {
                this.visibility = true;
                this.rightPosition = rightPosition + 'px';
                this.topPosition = topPosition + 'px';
            }
        }
    }
</script>

<style lang="scss">
    #menu-container {
        position: absolute;
        border-radius: 4px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        background-color: $text-color-dark;
        color: $accent-color-dark;
        fill: $accent-color-dark;

        .menu-label, .menu-item {
            height: 48px;
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 14px;
            overflow: hidden;
        }

        .menu-label {
            color: rgba(37, 39, 77, 0.5);
            cursor: default;
        }

        .menu-item {
            cursor: pointer;
        }

        .menu-item:hover {
            background-color: $main-color-dark;
        }

        .menu-item > *:not(:first-child) {
            margin-left: 8px;
        }

        .menu-items-container > :first-child {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }

        .menu-items-container > :last-child {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }

    .show-menu-enter-active {
        .menu-label, .menu-item {
            animation: show-menu .25s forwards;
        }
    }

    .show-menu-leave-active {
        .menu-label, .menu-item {
            animation: show-menu .25s reverse forwards;
        }
    }

    @keyframes show-menu {
        0% {
            height: 0;
        }
        100% {
            height: 48px;
        }
    }
</style>
