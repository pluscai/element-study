<template>
    <div
    class="el-select"
    >
   
        <div  class="el-select__tags">
            tag
        </div>
        <el-input>
            <template slot="prefix" v-if="$slots.prefix">
                <slot name="prefix"></slot>
            </template>
            <template slot="suffix">
                <i  :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
                <!-- <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i> -->
            </template>
        </el-input>
    </div>
</template>

<script>
    export default {
        name: 'SxSelect',

        componentName: 'SxSelect',

        computed: {
            iconClass() {
                return 'arrow-up'
            }
        }
    }
</script>