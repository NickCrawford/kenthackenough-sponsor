<template>
  <header :class="{ stuck: hasScrolled }" id="header">
    <router-link :to="{ name: 'Home' }" tag="h1">Kent Hack Enough</router-link>
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