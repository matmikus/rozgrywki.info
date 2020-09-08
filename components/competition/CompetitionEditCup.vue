<template>
    <div id="edit-cup">
        <div class="data-row">
            <div class="data-row__label">
                Przy równych wynikach
            </div>
            <div class="data-row__value">
                <edit-input-check id="wyjazd-podwojnie" label="Zdobycz na wyjeździe liczy się podwójnie"></edit-input-check>
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
        data () {
            return {};
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
