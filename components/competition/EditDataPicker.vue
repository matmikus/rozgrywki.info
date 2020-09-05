<template>
    <div id="datepicker-container">
        <input type="date"
               v-model="newValue">
        <div class="date-error" v-if="error">{{ errorText }}</div>
        <div class="spacer" v-else></div>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['defaultValue', 'errorText'],
        data () {
            return {
                newValue: undefined,
                error: false
            };
        },
        mounted () {
            this.newValue = this.defaultValue;
        }
    };
</script>

<style lang="scss">
    #datepicker-container {
        input {
            background-color: var(--bg2-color);
            border: 0;
            border-radius: 2px;
            width: 100%;
            box-sizing: border-box;
            padding: 8px;
            color: var(--content1-color);
            font-family: Roboto;
            font-size: 16px;
            font-weight: 300;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: 0.8;
            cursor: pointer;
        }

        input:focus {
            background-color: white;
            color: black;
        }

        .date-error {
            font-size: 12px;
            padding: 0 8px;
            color: #ff0000;
        }

        .spacer {
            height: 4px;
        }
    }

    .dark-mode {
        input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: 0.7;
            filter: invert(100%);
        }

        input:focus[type="date"]::-webkit-calendar-picker-indicator {
            opacity: 0.8;
            filter: unset;
        }
    }
</style>
