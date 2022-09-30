<template>
    <div>
        <Child v-model="aa"></Child>
        {{aa}}
    </div>
    
</template>

<script>
    import Child from './Child.vue'
    export default {
        data() {
            return {
                aa: 1
            }
        },
        components: {
            Child
        }
    }
</script>