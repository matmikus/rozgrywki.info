<template>
    <div id="input-check-container">
        <input type="checkbox" :id="id" @change="$emit('value-changed', inputValue)" v-model="inputValue"/>
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['id', 'label', 'default-value'],
        data () {
            return {
                inputValue: undefined
            }
        },
        mounted () {
            this.inputValue = this.defaultValue;
        }
    }
</script>

<style lang="scss">
    #input-check-container {
        height: 36px;
        display: flex;
        align-items: center;

        input {
            margin-right: 8px;
        }
    }
</style>
