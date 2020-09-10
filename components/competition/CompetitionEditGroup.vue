<template>
    <div id="edit-group-container">
        <div class="inline-container">
            <div class="data-row">
                <div class="data-row__label">
                    Remis
                </div>
                <div class="data-row__value">
                    <edit-input-check id="remis" label="Możliwy"></edit-input-check>
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Punkty za wygraną
                </div>
                <div class="data-row__value">
                    <edit-input-text :type="'number'"
                                     :default-value="0"
                                     :info="'Zakres 0-100'"
                                     :min="0"
                                     :max="100"
                                     :validation-func="pointsValidatorFunc"></edit-input-text>
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Punkty za przegraną
                </div>
                <div class="data-row__value">
                    <edit-input-text :type="'number'"
                                     :default-value="0"
                                     :info="'Zakres 0-100'"
                                     :min="0"
                                     :max="100"
                                     :validation-func="pointsValidatorFunc"></edit-input-text>
                </div>
            </div>
            <div class="data-row">
                <div class="data-row__label">
                    Punkty za remis
                </div>
                <div class="data-row__value">
                    <edit-input-text :type="'number'"
                                     :default-value="0"
                                     :info="'Zakres 0-100'"
                                     :min="0"
                                     :max="100"
                                     :validation-func="pointsValidatorFunc"></edit-input-text>
                </div>
            </div>
        </div>
        <div class="data-row">
            <div class="data-row__label">
                Kolejność elementów decydujących o miejscu (przeciągnij i upuść)
            </div>
            <div class="data-row__value">
                <div class="draggable-container">
                    <draggable v-model="orderArray"
                               group="people"
                               @start="drag=true"
                               @end="drag=false">
                        <div class="draggable-item"
                             v-for="element in orderArray"
                             :key="element.property">
                            <span>{{orderArray.indexOf(element) + 1}}. {{element.name}}</span>
                            <span>
                                <move-icon class="item-icon"></move-icon>
                            </span>
                        </div>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import draggable from 'vuedraggable';
    import MoveIcon from '@/assets/icons/move.svg';
    import editInputText from '@/components/competition/EditInputText.vue';
    import editInputCheck from '@/components/competition/EditInputCheck.vue';
    import {
        pointsValidator
    } from '@/scripts/competitionFormValidator';

    export default {
        components: {
            draggable, MoveIcon, editInputText, editInputCheck
        },
        data () {
            return {
                orderArray: [
                    { property: 'rankPointsOrder', name: 'Liczba punktów' },
                    {
                        property: 'rankGamesRatioOrder',
                        name: 'Stosunek meczy wygranych do przegranych'
                    },
                    { property: 'rankResultsRatioOrder', name: 'Stosunek wyników' },
                    { property: 'rankGamesAmountOrder', name: 'Liczba rozegranych meczy' },
                    { property: 'rankDirectGameOrder', name: 'Bezpośredni mecz' }
                ],
                pointsValidatorFunc: pointsValidator
            };
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

        .inline-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 0 1px;
            margin-top: -1px;
            margin-bottom: -1px !important;
        }

        .draggable-container {
            display: flex;
            margin-bottom: 4px;
        }

        .draggable-item {
            width: auto;
            cursor: move;
            background-color: var(--bg2-color);
            margin: 2px 0;
            padding: 4px 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .draggable-item > span {
            display: flex;
            align-items: center;
        }

        .item-icon {
            margin: 4px 0 4px 12px;
            fill: var(--content1-color);
            width: 18px;
            height: 18px;
        }

        .sortable-ghost {
            color: var(--main-color);
        }
    }
</style>
