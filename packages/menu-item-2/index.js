import ElMenuItem from '../menu-2/src/menu-item';

/* istanbul ignore next */
ElMenuItem.install = function(Vue) {
  Vue.component(ElMenuItem.name, ElMenuItem);
};

export default ElMenuItem;
