import ElSubmenu from '../menu-2/src/submenu';

/* istanbul ignore next */
ElSubmenu.install = function(Vue) {
  Vue.component(ElSubmenu.name, ElSubmenu);
};

export default ElSubmenu;
