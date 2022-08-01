<template>
  <form class="el-form" :class="[
      labelPosition ? 'el-form--label-' + labelPosition : '',
      {'el-form--inline': inline}
  ]">
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: 'SxForm',
    componentName: 'SxForm',
    provide() {
      return {
        sxForm: this
      };
    },
    props: {
      model: Object,
      rules: Object,
      labelWidth: String,
      labelPosition: String,
      disabled: Boolean,
      inline: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fields: [],
        potentialLabelWidthArr: [] // use this array to calculate auto width
      };
    },
    watch: {
      rules() {
        // remove then add event listeners on form-item after form rules change
      }
    },
    created() {
      this.$on('el.form.addField', (field) => {
        if (field) {
          this.fields.push(field);
        }
      });
    },
    computed: {
      autoLabelWidth() {
        // 从potentialLabelWidthArr取
        if (!this.potentialLabelWidthArr.length) return 0;
        const max = Math.max(this.potentialLabelWidthArr);
        return max ? `${max}px` : '';
      }
    },
    methods: {
      registerLabelWidth(val, oldVal) {
        this.potentialLabelWidthArr.push(val);
      },
      validate(callback) { // callback是校验完成后的回调
        // 进行验证喽
        if (!this.model) {
          console.warn('[Element Warn][Form]model is required for validate to work!');
          return;
        }

        // if no callback, return promise
        let promise;
        if (typeof callback !== 'function' && window.Promise) {
          promise = new window.Promise((resolve, reject) => {
            callback = function(valid, invalidFields) {
              valid ? resolve(valid) : reject(invalidFields);
            };
          });
        }

        // 如果需要验证的fields为空，调用验证时立刻返回callback
        if (this.fields.length === 0 && callback) {
          callback(true);
        }

        this.fields.forEach(field => {
          // ....
          console.log('field==my==', field);
          field.validate();
        });

        // callback(true);
        if (promise) {
          return promise;
        }
      }
    }

  };
</script>
