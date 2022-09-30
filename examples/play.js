import Vue from 'vue';
import Element from 'main/index.js';
// import App from './play/index.vue';
import App from './play/input.vue';
// import App from './play/demo/index.vue';
import 'packages/theme-chalk/src/index.scss';

Vue.use(Element);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
