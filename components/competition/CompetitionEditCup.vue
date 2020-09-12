<template>
    <div id="edit-cup-container">
        <div class="data-row">
            <div class="data-row__label">
                Przy równych wynikach
            </div>
            <div class="data-row__value">
                <edit-input-check id="wyjazd-podwojnie" label="Zdobycz na wyjeździe liczy się podwójnie" v-on:value-changed="onInputValueChanged" :default-value="awayGoalsRule"></edit-input-check>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import editInputCheck from '@/components/competition/EditInputCheck.vue';

    export default {
        components: {
            editInputCheck
        },
        computed: {
            awayGoalsRule () {
                return this.$store.state.competition.stages[0].containers[0].awayGoalsRule;
            }
        },
        methods: {
            onInputValueChanged (value: boolean) {
                this.$store.dispatch('setCompetitionAwayGoalsRule', value);
            }
        }
    };
</script>
<style lang="scss">
    #edit-cup-container {
        margin-top: 24px;

        .data-row {
            background-color: var(--bg1-color);
            padding: 0;
            flex: 1;
            margin: 2px;
            border-radius: $data-row-border-radius;
        }

        .data-row__label {
            opacity: 0.5;
            font-size: 80%;
        }
    }
</style>
