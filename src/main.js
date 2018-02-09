// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from './App'
import Vector from '@/components/Vector'
import router from './router'
import money from 'v-money'

Vue.use(VueAnalytics, {
  id: 'UA-113812683-1',
  router
})

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
  },

  mounted() {
    window['_fs_debug'] = false;
    window['_fs_host'] = 'fullstory.com';
    window['_fs_org'] = 'AD8SW';
    window['_fs_namespace'] = 'FS';
    (function(m,n,e,t,l,o,g,y){
      if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
      g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
      o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
      y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
      g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
      y="rec";g.shutdown=function(i,v){g(y,!1)};g.restart=function(i,v){g(y,!0)};
      g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
      g.clearUserCookie=function(){};
    })(window,document,window['_fs_namespace'],'script','user');

    if (this.email) {
      FS.identify(this.email, {
        name: this.name,
        email: this.email,
        company: this.company,
      });
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