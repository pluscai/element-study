<script>
  export default {
    inject: ['sxForm', 'SxFormItem'],
    props: {
      isAutoWidth: Boolean,
      updateAll: Boolean
    },
    render() {
      const slots = this.$slots.default;
      if (this.isAutoWidth) {
        return (<div class="el-form-item__label-wrap">
          {slots}
        </div>);
      } else {
        return slots[0];
      }
    },
    methods: {
      getLabelWidth() {
        if (this.$el && this.$el.firstElementChild) {
          const computedWidth = window.getComputedStyle(this.$el.firstElementChild).width;
          return Math.ceil(parseFloat(computedWidth));
        } else {
          return 0;
        }
      },
      updateLabelWidth(action) {
        if (this.$slots.default && this.isAutoWidth && this.$el.firstElementChild) {
          if (action === 'update') {
            this.computedWidth = this.getLabelWidth();
          }
        }
      }
    },
    watch: {
      computedWidth(val, oldVal) {
        if (this.updateAll) {
          this.sxForm.registerLabelWidth(val, oldVal);
          this.sxForm.updateComputedLabelWidth(val);
        }
      }
    },
    mounted() {
      this.updateLabelWidth('update');
    },
    data() {
      return {
        computedWidth: 0
      };
    }
  };
</script>
