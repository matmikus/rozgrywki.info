<template>
    <div id="select-container">
        <select @change="changeValue($event)" v-model="selected">
            <option v-for="option in options"
                    :value="option.value"
                    :key="option.value"
                    :disabled="option.disabled"
                    v-html="option.text">
            </option>
        </select>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['options', 'defaultValue'],
        data () {
            return {
                selected: undefined
            };
        },
        mounted () {
            this.selected = this.defaultValue;
        },
        methods: {
            changeValue (event: any) {
                this.selected = parseInt(event.target.options[event.target.options.selectedIndex].value);
            }
        }
    };
</script>

<style lang="scss">
    #select-container {
        select {
            background-color: var(--content-bg-color);
            border: 0;
            border-radius: 2px;
            width: 100%;
            box-sizing: border-box;
            padding: 8px;
            color: var(--content-txt-color);
            font-family: Roboto;
            font-size: 16px;
            font-weight: 300;
        }
    }
</style>
