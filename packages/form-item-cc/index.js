import ElFormItem from '../form_cc/src/form-item';

/* istanbul ignore next */
ElFormItem.install = function(Vue) {
  Vue.component(ElFormItem.name, ElFormItem);
};

export default ElFormItem;
