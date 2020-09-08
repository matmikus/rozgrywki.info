<template>
    <div id="textarea-container">
        <textarea class="textarea" :placeholder="placeholder" v-model="textareaValue"></textarea>
        <div class="info" :has-error="error">{{ info }}</div>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['placeholder', 'defaultValue', 'info', 'validation-func'],
        data () {
            return {
                textareaValue: '',
                error: false
            };
        },
        mounted () {
            this.textareaValue = this.defaultValue;
        },
        watch: {
            textareaValue (newValue: string) {
                this.error = !this.validationFunc(newValue);
            }
        }
    };
</script>

<style lang="scss">
    #textarea-container {
        .textarea {
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

        .textarea:focus {
            background-color: white;
            color: black;
        }

        .info {
            font-size: 12px;
            padding: 0 8px;
            opacity: 0.5;
            line-height: 1;
            margin-top: 0;
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
        #textarea-container {
            .textarea:focus {
                border: 1px solid black;
                padding: 7px;
            }
        }
    }
</style>
