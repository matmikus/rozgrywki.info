<template>
    <div id="datepicker-container">
        <input type="date"
               @change="$emit('value-changed', newValue)"
               v-model="newValue">
        <div class="info">{{ info }}</div>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['defaultValue', 'info'],
        data () {
            return {
                newValue: undefined
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

        .info {
            font-size: 12px;
            padding: 0 8px;
            opacity: 0.5;
            line-height: 1;
            margin-top: 6px;
        }
    }

    .light-mode {
        #datepicker-container {
            input:focus {
                border: 1px solid black;
                padding: 7px;
            }
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
