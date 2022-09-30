<template>
    <input type="text" :value="value" @input="handleInput">
</template>

<script>
    export default {
        props: {
            value: String
        },
        methods: {
            handleInput(e) {
                this.$emit('input',e.target.value)
            }
        }
    }
</script>