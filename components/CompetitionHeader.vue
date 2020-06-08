<template>
    <div id="competition-header-container">
        <div class="competition-name">{{ competitionName }}</div>
        <div class="spacer"></div>
        <share-button class="share-button pointer" @click="onShareButtonClick"></share-button>
        <context-menu ref="shareMenu"></context-menu>
    </div>
</template>

<script lang="ts">
    import shareButton from '@/assets/icons/share.svg';
    import contextMenu from '@/components/ContextMenu.vue';

    export default {
        components: { shareButton, contextMenu },
        props: ['competitionName'],
        methods: {
            onShareButtonClick (event: any) {
                const targetPositions = event.target.getBoundingClientRect();

                setTimeout(() => {
                    this.$refs.shareMenu.show(document.body.clientWidth - targetPositions.right, targetPositions.bottom + 4);
                }, 100);
            }
        }
    };
</script>

<style lang="scss">
    #competition-header-container {
        position: fixed;
        width: 100%;
        display: flex;
        align-items: center;
        height: 56px;

        .share-button {
            height: 24px;
            margin: 8px;
        }

        .spacer {
            flex-grow: 1;
        }

        .competition-name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-shrink: 10;
            margin-left: 16px;
            font-size: 18px;
        }
    }

    .dark-mode {
        #competition-header-container {
            background-color: $accent-color-dark;

            .share-button {
                fill: $text-color-dark;
            }

            .competition-name {
                color: $main-color-dark;
            }
        }
    }

    .light-mode {
        #competition-header-container {
            background-color: $accent-color-light;

            .share-button {
                fill: $text-color-light;
            }

            .competition-name {
                color: $main-color-light;
            }
        }
    }
</style>
