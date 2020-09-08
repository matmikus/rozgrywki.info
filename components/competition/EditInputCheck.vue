<template>
    <div id="input-check-container">
        <input type="checkbox" :id="id"/>
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script lang="ts">
    export default {
        props: ['id', 'label'],
        data () {
            return {

            }
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
