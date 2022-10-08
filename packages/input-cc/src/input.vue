<template>
  <div class="el-input" :class="[{
    'is-disabled': inputDisabled,
    'el-input--suffix': clearable
  }]"
  @mouseenter="hovering = true"
  @mouseleave="hovering = false"
  >
    <input
        ref="input"
        type="text"
        class="el-input__inner"
        v-bind="$attrs"
        :disabled="inputDisabled"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
    >
    <!-- 后置内容 -->
    <span
    class="el-input__suffix"
    >
      <span class="el-input__suffix-inner">
        <i
            v-if="showClear"
            class="el-input__icon el-icon-circle-close el-input__clear"
            @mousedown.prevent
            @click="clear"
            ></i>
      </span>
    </span>
   
  </div>
</template>

<script>
export default {
  name: 'SxInput',
  componentName: 'SxInput',
  props: {
    value: [String, Number],
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    console.log("this==",this)
  },
  data() {
    return {
      // inputDisabled: true
      focused: false,
      hovering: false
    };
  },
  inject: {
    sxForm: {
      default: ''
    }
  },
  watch: {
    nativeInputValue() {
      this.setNativeInputValue();
    }
  },
  computed: {
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    showClear() {
      return this.clearable && this.nativeInputValue && (this.focused || this.hovering)
    },
    inputDisabled() {
      return this.disabled;
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
  },
  methods: {
    clear() {
      this.$emit('input', '');
    },
    handleFocus(event) {
      this.focused = true
    },
    handleBlur(event) {
      this.focused = false
    },
    handleInput(event) {
      this.$emit('input',event.target.value)
    },
    setNativeInputValue() {
      const input = this.getInput();
      if(!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    getInput() {
      return this.$refs.input
    }
    // handleChange(event) {
    //     this.$emit('change', event.target.value);
    //   },
  }
};
</script>
