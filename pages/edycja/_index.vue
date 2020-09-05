<template>
    <div id="edit-container">
        <competition :route-name-param-name="'index'" :mode="'edit'"></competition>
        <div class="floating-button" :is-scrolling="isScrolling" @click="onSaveClick">
            <save-icon class="floating-button-icon"></save-icon>
            <div class="floating-button-text">ZAPISZ</div>
        </div>
    </div>
</template>

<script lang="ts">
    import Competition from '@/components/competition/Competition.vue';
    import SaveIcon from '@/assets/icons/save.svg';

    export default {
        middleware: ['authenticated', 'resetCompetition'],
        layout: 'competition',
        components: { Competition, SaveIcon },
        computed: {
            isScrolling () {
                return this.$store.state.competitionScrollingDown;
            }
        },
        methods: {
            onSaveClick () {
                console.log('zapis');
            }
        }
    };
</script>

<style lang="scss">
    #edit-container {
        position: relative;
        height: 100%;

        .floating-button {
            height: 48px;
            min-width: 48px;
            box-sizing: border-box;
            position: fixed;
            bottom: 32px;
            right: 32px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: var(--main-color);
            cursor: pointer;
            border-radius: 24px;
            padding: 8px;
        }

        .floating-button-text {
            color: var(--bar-txt-active);
            width: 0;
            overflow: hidden;
            transition: width 250ms ease-in-out;
            text-transform: uppercase;
            font-weight: 500;
            font-size: 16px;
            text-align: center;
        }

        .floating-button-icon {
            fill: var(--bar-txt-active);
            width: 32px;
            height: 32px;
        }

        @media (orientation: landscape) {
            .floating-button:hover > .floating-button-text {
                width: 80px;
            }

            .floating-button:hover {
                padding: 8px 16px;
            }
        }

        .floating-button:not([is-scrolling]) > .floating-button-text {
            width: 80px;
        }

        .floating-button:not([is-scrolling]) {
            padding: 8px 16px;
        }

        @media not all and (orientation: landscape) {
            .floating-button {
                bottom: 92px;
                right: 16px;
                transition: bottom 250ms ease-in-out;
            }

            .floating-button[is-scrolling] {
                bottom: 64px;
            }
        }
    }
</style>
