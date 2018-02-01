import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SponsorNow from '@/components/SponsorNow'
import Checkout from '@/components/Checkout'
import ThankYou from '@/components/ThankYou'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld,
      props: (route) => ({ name: route.query.name, companyName: route.query.companyName })
    },
    {
      path: '/lets-do-this',
      name: 'SponsorNow',
      component: SponsorNow,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/thanks',
      name: 'ThankYou',
      component: ThankYou,
    },
  ]
})
