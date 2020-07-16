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
        props: ['iconId'],
        data () {
            return {
                visibility: false,
                rightPosition: null,
                topPosition: null
            };
        },
        mounted () {
            window.addEventListener('mousedown', this.handleEveryTap);
            window.addEventListener('touchstart', this.handleEveryTap);
            window.addEventListener('click', this.handleClick);
        },
        destroyed () {
            window.removeEventListener('mousedown', this.handleEveryTap);
            window.removeEventListener('touchstart', this.handleEveryTap);
            window.removeEventListener('click', this.handleClick);
        },
        methods: {
            handleEveryTap (event: any) {
                if (event.target.closest('.menu-item') !== null) {
                    return;
                }

                if (event.target.closest(`#${this.iconId}`) === null) {
                    this.close();
                }
            },
            handleClick (event: any) {
                if (event.target.closest(`#${this.iconId}`) === null) {
                    this.close();
                }
            },
            show (rightPosition: number, topPosition: number) {
                this.visibility = true;
                this.rightPosition = `${rightPosition}px`;
                this.topPosition = `${topPosition}px`;
            },
            close () {
                this.visibility = false;
            }
        }
    };
</script>

<style lang="scss">
    #menu-container {
        position: absolute;
        border-radius: 4px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        background-color: #fff;
        color: var(--bar-bg-color);
        fill: var(--bar-bg-color);

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
            transition: unset;
        }

        .menu-item[disabled] {
            cursor: default;
            opacity: 0.3;
            transition: unset;
        }

        .menu-item:hover {
            background-color: var(--bar-txt-color);
            /*color: var(--bar-txt-color);*/
            /*fill: var(--bar-txt-color);*/
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
