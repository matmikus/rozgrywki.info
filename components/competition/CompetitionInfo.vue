<template>
    <div id="competition-info-container">
        <div class="data-row">
            <div class="data-row__label">
                Nazwa
            </div>
            <div class="data-row__value">
                <template v-if="mode === 'edit'">
                    <edit-input-text :placeholder="'Nazwa'"
                                     :default-value="competition.name"
                                     :info="'3-60 znaków'"
                                     :validation-func="competitionNameValidatorFunc"></edit-input-text>
                </template>
                <template v-else>{{ competition.name }}</template>
            </div>
        </div>
        <div class="data-row">
            <div class="data-row__label">
                Link
            </div>
            <div class="data-row__value">
                <template v-if="mode === 'edit'">
                    <edit-input-text :placeholder="'Ścieżka'"
                                     :default-value="competition.routeName"
                                     :info="'5-40 znaków'"
                                     :prefix="'www.rozgrywki.info/'"
                                     :validation-func="competitionRouteNameValidatorFunc"></edit-input-text>
                </template>
                <template v-else>{{ competition.fullRoute }}</template>
            </div>
        </div>
        <div class="data-row">
            <div class="data-row__label">
                Opis
            </div>
            <div class="data-row__value">
                <template v-if="mode === 'edit'">
                    <edit-textarea :placeholder="'Opis'"
                                   :default-value="competition.description"
                                   :info="'0-1000 znaków'"
                                   :validation-func="competitionDescriptionValidatorFunc"></edit-textarea>
                </template>
                <template v-else>{{ competition.description }}</template>
            </div>
        </div>
        <div class="inline-container">
            <div class="data-row">
                <div class="data-row__label">
                    Początek
                </div>
                <div class="data-row__value">
                    <template v-if="mode === 'edit'">
                        <edit-data-picker :default-value="competition.start"
                                          :error-text="'Niepoprawny format daty'"></edit-data-picker>
                    </template>
                    <template v-else>{{ competition.start }}</template>
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Koniec
                </div>
                <div class="data-row__value">
                    <template v-if="mode === 'edit'">
                        <edit-data-picker :default-value="competition.end"
                                          :error-text="'Niepoprawny format daty'"></edit-data-picker>
                    </template>
                    <template v-else>{{ competition.end }}</template>
                </div>
            </div>
            <div class="data-row data-row-competition-type">
                <div class="data-row__label">
                    Rodzaj rozgrywek
                </div>

                <template v-if="mode === 'edit'">
                    <div class="data-row__value competition-type additional-bottom-space">
                        <edit-select :options="competitionTypes"
                                     :default-value="getCompetitionTypeValue(competition)"></edit-select>
                    </div>
                </template>
                <template v-else>
                    <div class="data-row__value competition-type"
                         v-html="getComplexCompetitionType(competition)">
                    </div>
                </template>

            </div>
        </div>
        <competition-edit-group v-if="mode === 'edit'"></competition-edit-group>
    </div>
</template>

<script lang="ts">
    import CompetitionEditGroup from '@/components/competition/CompetitionEditGroup.vue';
    import EditInputText from '@/components/competition/EditInputText.vue';
    import EditDataPicker from '@/components/competition/EditDataPicker.vue';
    import EditTextarea from '@/components/competition/EditTextarea.vue';
    import EditSelect from '@/components/competition/EditSelect.vue';
    import {
        competitionNameValidator,
        competitionRouteNameValidator,
        competitionDescriptionValidator,
        competitionCompetitorNameValidator
    } from '@/scripts/competitionFormValidator';

    const COMPETITION_TYPE_NAMES: any = {
        cup: 'puchar',
        group: 'każdy z każdym',
        doubleEliminationCup: 'puchar podwójnej eliminacji (brazylijski)'
    };
    const COMPETITION_VOLUME_NAMES: any = {
        single: ' (1&nbsp;mecz)',
        double: ' (mecz&nbsp;i&nbsp;rewanż)'
    };
    const COMPETITION_TYPE_VALUES: any = {
        cupSingle: 1,
        cupDouble: 2,
        groupSingle: 3,
        groupDouble: 4,
        mixed: 5,
        doubleEliminationCup: 6
    };

    export default {
        props: ['mode'],
        components: {
            EditInputText, EditDataPicker, EditTextarea, EditSelect, CompetitionEditGroup
        },
        computed: {
            competition () {
                return this.$store.state.competition;
            }
        },
        data () {
            return {
                competitionNameValidatorFunc: competitionNameValidator,
                competitionRouteNameValidatorFunc: competitionRouteNameValidator,
                competitionDescriptionValidatorFunc: competitionDescriptionValidator,
                competitionCompetitorNameValidatorFunc: competitionCompetitorNameValidator,
                competitionTypes: [
                    {
                        value: COMPETITION_TYPE_VALUES['cupSingle'],
                        text: COMPETITION_TYPE_NAMES.cup + COMPETITION_VOLUME_NAMES.single
                    },
                    {
                        value: COMPETITION_TYPE_VALUES['cupDouble'],
                        text: COMPETITION_TYPE_NAMES.cup + COMPETITION_VOLUME_NAMES.double
                    },
                    {
                        value: COMPETITION_TYPE_VALUES['groupSingle'],
                        text: COMPETITION_TYPE_NAMES.group + COMPETITION_VOLUME_NAMES.single
                    },
                    {
                        value: COMPETITION_TYPE_VALUES['groupDouble'],
                        text: COMPETITION_TYPE_NAMES.group + COMPETITION_VOLUME_NAMES.double
                    },
                    {
                        value: COMPETITION_TYPE_VALUES['mixed'],
                        text: 'mieszane',
                        disabled: true
                    },
                    {
                        value: 'doubleEliminationCup',
                        text: COMPETITION_TYPE_NAMES.doubleEliminationCup,
                        disabled: true
                    }
                ]
            };
        },
        methods: {
            getComplexCompetitionType (competitionData: any) {
                let competitionTypeText = '';

                if (competitionData.stages.length === 1 && competitionData.stages[0].containers.length === 1) {
                    competitionTypeText = this.getContainerCompetitionType(competitionData.stages[0].containers[0]);
                } else if (competitionData.stages.length > 1) {
                    for (const stage of competitionData.stages) {
                        if (competitionData.stages.indexOf(stage) !== 0) {
                            competitionTypeText += ' +&nbsp;';
                        }

                        if (stage.containers[0].type === 'group' && stage.containers.length > 1) {
                            competitionTypeText += 'grupy ';
                        }

                        competitionTypeText += this.getContainerCompetitionType(stage.containers[0]);
                    }
                }

                return competitionTypeText;
            },
            getContainerCompetitionType (containerData: any) {
                let containerTypeText = '';

                if (containerData.isDoubleEliminationCup) {
                    containerTypeText += COMPETITION_TYPE_NAMES.doubleEliminationCup;
                } else {
                    containerTypeText += COMPETITION_TYPE_NAMES[containerData.type];
                    containerTypeText += COMPETITION_VOLUME_NAMES[containerData.isDouble ? 'double' : 'single'];
                }

                return containerTypeText;
            },
            getCompetitionTypeValue (competitionData: any) {
                if (competitionData.stages.length > 1) {
                    return COMPETITION_TYPE_VALUES['mixed'];
                }

                if (competitionData.stages[0].containers[0].type === 'group') {
                    return competitionData.stages[0].containers[0].isDoubleEliminationCup ? COMPETITION_TYPE_VALUES['groupDouble'] : COMPETITION_TYPE_VALUES['groupSingle'];
                }

                if (competitionData.stages[0].containers[0].type === 'cup') {
                    return competitionData.stages[0].containers[0].isDoubleEliminationCup ? COMPETITION_TYPE_VALUES['cupDouble'] : COMPETITION_TYPE_VALUES['cupSingle'];
                }
            }
        }
    };
</script>

<style lang="scss">
    #competition-info-container {
        display: inline-block;
        max-width: calc(100vw - 32px);

        .data-row {
            background-color: var(--bg1-color);
            padding: 4px 8px;
            flex: 1;
            margin: 2px;
            border-radius: $data-row-border-radius;
        }

        .data-row__label {
            opacity: 0.5;
            font-size: 80%;
        }

        .inline-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 0 1px;
            margin-top: -1px;
            margin-bottom: 1px;
        }

        .inline-container > * {
            flex: 1 1 auto;
            margin: 1px;
        }

        .data-row-competition-type {
            max-width: calc(100% - 18px);
        }

        .competition-type::first-letter {
            text-transform: uppercase;
        }

        .additional-bottom-space {
            margin-bottom: 4px;
        }

        @media (max-width: 1000px) {
            margin: 0 16px;
        }
    }
</style>
