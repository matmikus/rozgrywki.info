<template>
    <div id="input-container">
        <template v-if="prefix">
            <div class="prefix-input-container">
                <div class="prefix">{{ prefix }}</div>
                <input class="input prefix-input"
                       @change="$emit('value-changed', inputValue)"
                       :type="type ? type : 'text'"
                       :placeholder="placeholder"
                       :max="max"
                       :min="min"
                       :disabled="disabled"
                       v-model="inputValue"/>
            </div>
        </template>
        <template v-else>
            <input class="input"
                   @change="$emit('value-changed', inputValue)"
                   :type="type ? type : 'text'"
                   :max="max"
                   :min="min"
                   :disabled="disabled"
                   :placeholder="placeholder"
                   v-model="inputValue"/>
        </template>
        <div class="info" :has-error="error">{{ info }}</div>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['placeholder', 'defaultValue', 'info', 'prefix', 'validation-func', 'type', 'max', 'min', 'disabled'],
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
                if (this.type === 'number' && newValue !== null && newValue !== '') {
                    this.inputValue = parseInt(this.inputValue, 10);
                }

                if (newValue === '') {
                    this.inputValue = null;
                }

                this.error = this.validationFunc && !this.validationFunc(newValue);
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

        [disabled] {
            opacity: 0.5;
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
