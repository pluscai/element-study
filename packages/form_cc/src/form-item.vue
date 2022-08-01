<template>
  <div class="el-form-item" :class="[{
    'is-error': validateState === 'error'
  }]">
    <label-wrap
      :is-auto-width="labelStyle && labelStyle.width ==='auto'"
      :update-all="form.labelWidth == 'auto'"
    >
      <label class="el-form-item__label" v-if="label" :style="labelStyle">{{label}}</label>
    </label-wrap>
    <div class="el-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <slot
          v-if="validateState === 'error'"
          name="error"
          :error="validateMessage"
        >
          <div
              class="el-form-item__error"
           >
            {{validateMessage}}
          </div>
        </slot>

      </transition>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import LabelWrap from './label-wrap';
import emitter from 'element-ui/src/mixins/emitter';
import objectAssign from 'element-ui/src/utils/merge';
import { noop } from 'element-ui/src/utils/util';
// 从父组件form中拿 label-width属性，赋给label的width
export default {
  name: 'SxFormItem',
  components: {LabelWrap},
  componentName: 'SxFormItem',
  mixins: [emitter],
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    rules: [Object, Array],
    required: {
      type: Boolean,
      default: undefined
    }
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      isNested: false,
      computedLabelWidth: ''
    };
  },
  provide() {
    return {
      SxFormItem: this
    };
  },
  inject: ['sxForm'],
  computed: {
    labelStyle() {
      const ret = {};
      if (this.form.labelPosition === 'top') return ret;
      const labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.width = labelWidth;
      }
      return ret;
    },
    contentStyle() {
      const ret = {};
      if (this.form.labelPosition === 'top' || this.form.inline) return ret;
      if (!this.label && !this.labelWidth && this.isNested) return ret;
      const labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth === 'auto') {
        if (this.labelWidth === 'auto') {
          ret.marginLeft = this.computedLabelWidth;
        } else if (this.form.labelWidth === 'auto') {
          ret.marginLeft = this.sxForm.autoLabelWidth;
        }
      } else {
        ret.marginLeft = labelWidth;
      }
      return ret;
    },
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.compontName;
      if (parentName !== 'SxForm') {
        if (parentName === 'SxFormItem') {
          this.isNested = true;
        }
        parent = parent.$parent;
        parentName = parent.$options.compontName;
      }
      return this.$parent;
    },
    fieldValue() {
      const model = this.form.model;
      if (!model || !this.prop) {return;}

      // let path = this.prop;
      return model[this.prop];

    }
  },
  methods: {
    validate(trigger, callback = noop) {
      const rules = this.getFilteredRule(trigger); // 得到rules数组，里头是普通对象，可以进行修改。
      console.log('sxrules==', rules);

      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }

      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[this.prop] = this.fieldValue; // 这里如何拿到model里的值的呢？敬请期待。

      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';
      });

    },
    updateComputedLabelWidth(width) {
      this.computedLabelWidth = width;
    },

    getFilteredRule(trigger) {
      const rules = this.getRules();
      console.log('sx-getFilteredRule==', rules);
      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true;
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1;
        } else {
          return rule.trigger === trigger;
        }
      }).map(rule => objectAssign({}, rule));
    },
    getRules() {
      let formRules = this.form.rules;
      // const selfRules = this.rules;
      const requireRule = this.required !== undefined ? { required: !!this.required } : [];
      // !! 将null/undifined/0/""强转成 boolean值 false

      // 合并required
      formRules = formRules[this.prop];
      return [].concat(formRules).concat(requireRule);
    },
    dispatch2(componentName, eventName, params) {
      // $on $emit,普通用法是通过父组件监听事件，传入子组件，然后子组件触发
      // 这个 dispatch 方法的好处就是：
      //  1. 子组件中通过该方法可以触发上游组件监听的事件，不限于父组件(因为会存在form-item嵌套的情况)
      //  2. 无需手动传递事件
      console.log('this.$root==', this.$root);
      var parent = this.$parent || this.$root; // 优先parent，而后root
      var name = parent.$options.componentName;

      // 从parent开始向上找，一直找到 指定的名字为  componentName 的组件
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      this.validate('change');
    },
    addValidateEvents() {
      const rules = this.getRules();
      if (rules.length || this.required !== undefined) {
        this.$on('el.form.blur', this.onFieldBlur);
        this.$on('el.form.change', this.onFieldChange);
      }
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('SxForm', 'el.form.addField', [this]);

      this.addValidateEvents();
    }
  }
};
</script>
