// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vector from '@/components/Vector'
import router from './router'
import money from 'v-money'

// register directive v-money and component <money>
Vue.use(money, {precision: 4});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data() {
    return {
      name: '',
      companyName: '',
      email: '',
      url: '',
      phone: '',
      donationAmount: 0,
      customInfo: {
        meal: '',
        prize: {
          value: 0,
          item: '',
          name: '',
          criteria: ''
        },
        other: '',
      }
    }
  }
})

Vue.component('vector', Vector);

Vue.directive('focus', {
  inserted: function (el, binding, vnode) {
    Vue.nextTick(function() {
      el.focus();
    });
  },
});