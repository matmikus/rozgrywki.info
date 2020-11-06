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
                <div v-for="(item, index) in competitorsList" class="competitor">
                    <edit-input-text :validation-func="competitorNameValidatorFunc"
                                     :default-value="item.name"
                                     :info="'3-40 znaków i nie może się powtarzać'"
                                     ref="competitorName"
                                     v-on:value-changed="onCompetitorNameChanged(index, $event)"></edit-input-text>
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
                competitorsCountValidatorFunc: competitorsCountValidator
            };
        },
        computed: {
            size () {
                return this.$store.state.competition.stages[0].containers[0].size;
            },
            competitionEditLock () {
                return this.$store.state.competitionEditLock;
            },
            competitorsList () {
                return this.$store.state.competition.stages[0].containers[0].competitors;
            }
        },
        methods: {
            onSizeChanged (value: number) {
                this.$store.dispatch('setCompetitionSize', value);

                this.$refs.competitorName.forEach((el: any) => {
                    el.inputValue = '';
                    setTimeout(() => {
                        el.error = false;
                    }, 1);
                });
            },
            onCompetitorNameChanged (index: number, value: string) {
                this.$store.dispatch('setCompetitorName', { index: index, name: value });
            },
            competitorNameValidatorFunc (name: string) {
                this.checkDuplicates();

                return competitorNameValidator(name);
            },
            checkDuplicates () {
                this.$refs.competitorName.forEach((el: any) => {
                    if (el.inputValue != undefined && el.inputValue.length > 2) {
                        el.error = false;
                    }
                });

                for (let nameInput of this.$refs.competitorName) {
                    if (nameInput.inputValue == undefined || nameInput.inputValue.length === 0) {
                        continue;
                    }

                    if (this.$refs.competitorName.filter((el: any) => el.inputValue === nameInput.inputValue).length > 1) {
                        this.$refs.competitorName.filter((el: any) => el.inputValue === nameInput.inputValue).forEach((el: any) => {
                            el.error = true;
                        });
                    }
                }

            }
        }
    };
</script>
<style lang="scss">
    #edit-competitors {
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

        .competitor {
            margin-bottom: 8px;
        }

        .competitor:last-child {
            margin-bottom: -16px;
        }
    }
</style>
