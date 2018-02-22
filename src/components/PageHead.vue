<template>
  <header :class="{ stuck: hasScrolled }" id="header">
    <router-link :to="{ name: 'Home' }" tag="h1" v-if="$route.name != 'Home'">Kent Hack Enough</router-link>
    <h1 v-else><a href="https://khe.io">Kent Hack Enough</a></h1>
    <transition name="fade">
      <h2 v-if="!hasScrolled">Sponsorship Information</h2>
    </transition>
    <transition name="fade">
      <router-link :to="{ name: 'SponsorNow' }" tag="button" v-if="hasScrolled && !($route.name == 'SponsorNow' || $route.name == 'Checkout'|| $route.name == 'ThankYou')">Sponsor Now</router-link>
    </transition>
  </header>
</template>

<script>
export default {

  name: 'PageHead',
  props: ['name', 'companyName'],
  data() {
    return {
      hasScrolled: false,
    }
  },
  methods: {
    handleScroll () {
      this.hasScrolled = window.scrollY > 0;
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.handleScroll();
  }
}
</script>

<style scoped>
  h1 a {
    text-decoration: none;
    color: #224889;
  }
</style>