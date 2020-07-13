<template>
    <div id="competition-header-container">
        <div class="competition-name">{{ competition.name }}</div>
        <div class="spacer"></div>
        <share-button class="share-button pointer"
                      @click="onShareButtonClick"
                      id="competition-header-share-button"
                      v-tooltip.bottom="{ content: 'Udostępnij', delay: { show: 500, hide: 0, trigger: 'hover' } }"></share-button>
        <context-menu ref="shareMenuRef" :iconId="'competition-header-share-button'">
            <share-menu></share-menu>
        </context-menu>
    </div>
</template>

<script lang="ts">
    import shareButton from '@/assets/icons/share.svg';
    import contextMenu from '@/components/ContextMenu.vue';
    import shareMenu from '@/components/header/ShareMenu.vue';

    export default {
        components: { shareButton, contextMenu, shareMenu },
        computed: {
            competition () {
                return this.$store.state.competition;
            }
        },
        methods: {
            onShareButtonClick (event: any) {
                const targetPositions = event.target.getBoundingClientRect();

                if (this.$refs.shareMenuRef.visibility) {
                    this.$refs.shareMenuRef.close();
                } else {
                    this.$refs.shareMenuRef.show(document.body.clientWidth - targetPositions.right, targetPositions.bottom + 4);
                }
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
        background-color: var(--bar-bg-color);

        .share-button {
            height: 24px;
            margin: 8px;
            fill: var(--bar-txt-color);
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
            color: var(--bar-txt-color);
        }

        @media (hover: hover) {
            .share-button:hover {
                fill: var(--bar-txt-active);
            }
        }
    }
</style>
