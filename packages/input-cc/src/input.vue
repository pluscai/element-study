<template>
  <div class="el-input" :class="[{
    'is-disabled': inputDisabled
  }]">
    <input
        type="text"
        class="el-input__inner"
        :disabled="inputDisabled"
    >
  </div>
</template>

<script>
export default {
  name: 'SxInput',
  componentName: 'SxInput',
  data() {
    return {
      // inputDisabled: true
    };
  },
  inject: {
    sxForm: {
      default: ''
    }
  },
  computed: {
    inputDisabled() {
      return this.disabled || (this.sxForm || {}).disabled;
    },
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== 'SxForm') {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    }
  }
};
</script>
