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
                    Ostatnia aktualizacja
                </div>
                <div class="data-row__value">
                    {{ getFormattedDatetime(competition.updatedAt) }}
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
            getFormattedDatetime (data: any) {
                return this.$dayjs(data).format('YYYY-MM-DD HH:mm');
            }
        }
    }
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
            display:flex;
            flex-direction:row;
            flex-wrap: wrap;
            white-space: nowrap;
            padding: 0 1px;
            margin-top: -1px;
        }

        .inline-container > * {
            flex: 1 1 auto;
            margin: 1px;
        }
    }
</style>
