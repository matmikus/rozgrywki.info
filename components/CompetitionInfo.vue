<template>
    <div id="competition-info-container">
        <div class="data-row">
            <div class="data-row__label">
                Nazwa
            </div>
            <div class="data-row__value">
                {{ competition.name }}
            </div>
        </div>
        <div class="data-row">
            <div class="data-row__label">
                Link
            </div>
            <div class="data-row__value">
                {{ competition.fullRoute }}
            </div>
        </div>
        <div class="data-row">
            <div class="data-row__label">
                Opis
            </div>
            <div class="data-row__value">
                {{ competition.description }}
            </div>
        </div>
        <div class="inline-container">
            <div class="data-row">
                <div class="data-row__label">
                    Początek
                </div>
                <div class="data-row__value">
                    {{ competition.start }}
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Koniec
                </div>
                <div class="data-row__value">
                    {{ competition.end }}
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Rodzaj rozgrywek
                </div>
                <div class="data-row__value competition-type">
                    {{ getComplexCompetitionType(competition) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        computed: {
            competition () {
                return this.$store.state.competition;
            }
        },
        methods: {
            getComplexCompetitionType (competitionData: any) {
                let competitionTypeText = '';

                if (competitionData.stages.length === 1 && competitionData.stages[0].containers.length === 1) {
                    competitionTypeText = this.getContainerCompetitionType(competitionData.stages[0].containers[0]);
                } else if (competitionData.stages.length > 1) {
                    for (const stage of competitionData.stages) {
                        if (competitionData.stages.indexOf(stage) !== 0) {
                            competitionTypeText += ' + ';
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
                const typeNames: any = {
                    cup: 'puchar',
                    group: 'każdy z każdym',
                    doubleEliminationCup: 'puchar podwójnej eliminacji (brazylijski)'
                };
                const volumeNames: any = {
                    single: ' (1 mecz)',
                    double: ' (mecz i rewanż)'
                };

                if (containerData.isDoubleEliminationCup) {
                    containerTypeText += typeNames['doubleEliminationCup'];
                } else {
                    containerTypeText += typeNames[containerData.type];
                    containerTypeText += volumeNames[containerData.isDouble ? 'double' : 'single'];
                }

                return containerTypeText;
            }
        }
    };
</script>

<style lang="scss">
    #competition-info-container {
        display: inline-block;

        .data-row {
            background-color: var(--content-row-bg-color);
            padding: 4px 8px;
            flex: 1;
            margin: 2px;
        }

        .data-row__label {
            opacity: 0.5;
            font-size: 80%;
        }

        .inline-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            white-space: nowrap;
            padding: 0 1px;
            margin-top: -1px;
        }

        .inline-container > * {
            flex: 1 1 auto;
            margin: 1px;
        }

        .competition-type::first-letter {
            text-transform: uppercase;
        }

        @media (max-width: 1000px) {
            margin: 0 16px;
        }
    }
</style>
