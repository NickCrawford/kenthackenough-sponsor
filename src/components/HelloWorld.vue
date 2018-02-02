<template>
<div>
  <main>
    <greeting :personName="name" :companyName="company"></greeting>
  </main>
  <br><br><br><br>
  <slider></slider>
  <main>
    <br><br>
    <h2>Don't see something you like?</h2>
    <custom></custom>
    <br><br>
    <router-link :to="{ name: 'SponsorNow'}" tag="button" class="big">Sponsor Now</router-link>
  </main>
  <br><br><br><br>
  <sponsor-modal></sponsor-modal>
</div>
</template>

<script>
import Greeting from '@/components/Greeting';
import Slider from '@/components/Slider';
import Custom from '@/components/Custom';
import SponsorModal from '@/components/SponsorModal';

export default {
  name: 'HelloWorld',
  components: { Greeting, Slider, Custom, SponsorModal},
  props: ['name', 'company', 'email'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    console.log(this.$route.params);
    this.$root.name = this.name;
    this.$root.companyName = this.company;
    this.$root.email = this.email;

    if (this.name || this.companyName) {
      window.history.replaceState({} , null, `/`)
    }
  }
}
</script>
