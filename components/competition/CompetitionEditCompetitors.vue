<template>
    <div id="edit-competitors">
        <div class="data-row" style="width: 50%">
            <div class="data-row__label">
                Ilość uczestników
            </div>
            <div class="data-row__value">
                <edit-input-text :type="'number'"
                                 :info="'Zakres 2-64'"
                                 :min="2"
                                 :max="64"
                                 v-on:value-changed="onSizeChanged"
                                 :default-value="size"
                                 :disabled="competitionEditLock"
                                 :validation-func="competitorsCountValidatorFunc"></edit-input-text>
            </div>
        </div>
        <div class="data-row">
            <div class="data-row__label">
                Uczestnicy
            </div>
            <div class="data-row__value">
                <div v-for="item in competitorsList">
                    <edit-input-text :validation-func="competitorNameValidatorFunc"></edit-input-text>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import editInputText from '@/components/competition/EditInputText.vue';
    import {
        competitorsCountValidator, competitorNameValidator
    } from '@/scripts/competitionFormValidator';

    export default {
        components: {
            editInputText, competitorNameValidator, competitorsCountValidator
        },
        data () {
            return {
                competitorsList: [],
                competitorNameValidatorFunc: competitorNameValidator,
                competitorsCountValidatorFunc: competitorsCountValidator
            };
        },
        computed: {
            size () {
                return this.$store.state.competition.stages[0].containers[0].size;
            },
            competitionEditLock () {
                return this.$store.state.competitionEditLock;
            }
        },
        methods: {
            onSizeChanged (value: number) {
                this.$store.dispatch('setCompetitionSize', value);
            },
            createNewCompetitiorsList (count: number) {
                const arr = [];

                for (let i = 0; i < count; i++) {
                    arr.push('');
                }

                this.competitorsList = arr;
            }
        },
        watch: {
            size (value: number) {
                this.createNewCompetitiorsList(value);
            }
        },
        mounted () {
            this.createNewCompetitiorsList(this.size);
        }
    };
</script>
<style lang="scss">
    #edit-group-container {
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
