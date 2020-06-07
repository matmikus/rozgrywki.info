<template>
    <div id="menu-container" v-if="visibility" :style="{ right: rightPosition, top: topPosition }">
        <div class="menu-item">menu</div>
        <div class="menu-item">menu</div>
        <div class="menu-item">menu</div>
        <div class="menu-item">menu</div>
        <div class="menu-item">menu</div>
    </div>
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
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

        .menu-item {
            padding: 16px;
            cursor: pointer;
            text-transform: uppercase;
        }
    }
</style>
