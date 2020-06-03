<template>
    <div id="competition-header-container">
        <div class="competition-name">{{ competitionName }}</div>
        <div class="spacer"></div>
        <share-button class="share-button pointer"></share-button>
    </div>
</template>

<script lang="ts">
    import shareButton from '@/assets/icons/share.svg';

    export default {
        components: { shareButton },
        props: ['competitionName']
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
