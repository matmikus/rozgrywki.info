<template>
    <div id="select-container">
        <select @change="changeValue($event)">
            <option value="" selected disabled>Wybierz</option>
            <option v-for="option in options"
                    :value="option.value"
                    :key="option.value"
                    v-html="option.text">
            </option>
        </select>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['options'],
        data () {
            return {
                selected: undefined
            };
        },
        methods: {
            changeValue (event: any) {
                this.selected = event.target.options[event.target.options.selectedIndex].value;
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
