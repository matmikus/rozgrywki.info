<template>
    <div id="input-container">
        <template v-if="prefix">
            <div class="prefix-input-container">
                <div class="prefix">{{ prefix }}</div>
                <input class="input prefix-input"
                       :type="type ? type : 'text'"
                       :placeholder="placeholder"
                       :max="max"
                       :min="min"
                       v-model="inputValue"/>
            </div>
        </template>
        <template v-else>
            <input class="input" :type="type ? type : 'text'" :max="max" :min="min" :placeholder="placeholder" v-model="inputValue"/>
        </template>
        <div class="info" :has-error="error">{{ info }}</div>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['placeholder', 'defaultValue', 'info', 'prefix', 'validation-func', 'type', 'max', 'min'],
        data () {
            return {
                inputValue: '',
                error: false
            };
        },
        mounted () {
            this.inputValue = this.defaultValue;
        },
        watch: {
            inputValue (newValue: string) {
                this.error = !this.validationFunc(newValue);
            }
        }
    };
</script>

<style lang="scss">
    #input-container {
        .input {
            background-color: var(--bg2-color);
            border: 0;
            border-radius: 2px;
            width: 100%;
            box-sizing: border-box;
            padding: 8px;
            color: var(--content1-color);
            font-size: 16px;
            font-weight: 300;
            font-family: Roboto;
        }

        .input:focus {
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

        .info[has-error] {
            color: #ff0000;
            opacity: 1;
        }

        .prefix-input-container {
            display: flex;
        }

        .prefix {
            background-color: var(--bg2-color);
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
            display: flex;
            align-items: center;
            padding-left: 8px;
            cursor: default;
        }

        .prefix-input {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }

    .light-mode {
        #input-container {
            .input:focus {
                border: 1px solid black;
                padding: 7px;
            }
        }
    }
</style>
