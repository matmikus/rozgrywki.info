<template>
    <div id="input-container">
        <template v-if="prefix">
            <div class="prefix-input-container">
                <div class="prefix">{{ prefix }}</div>
                <input class="input prefix-input" type="text" :placeholder="placeholder" v-model="inputValue"/>
            </div>
        </template>
        <template v-else>
            <input class="input" type="text" :placeholder="placeholder" v-model="inputValue"/>
        </template>
        <div class="info" :has-error="error">{{ info }}</div>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['placeholder', 'value', 'info', 'prefix', 'validation-func'],
        data () {
            return {
                inputValue: '',
                error: false
            };
        },
        mounted () {
            this.inputValue = this.value;
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
            background-color: var(--content-bg-color);
            border: 0;
            border-radius: 2px;
            width: 100%;
            box-sizing: border-box;
            padding: 8px;
            color: var(--content-txt-color);
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
        }

        .info[has-error] {
            color: #ff0000;
            opacity: 1;
        }

        .prefix-input-container {
            display: flex;
        }

        .prefix {
            background-color: var(--content-bg-color);
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
</style>
