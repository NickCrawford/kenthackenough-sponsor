<template>
  <main id="checkout">
    <h2>You're sponsoring:</h2>
    <h1 v-if="$root.donationAmount > 0">$ {{ $root.donationAmount }}</h1>
    <h1 v-if="$root.customInfo.prize.name">Custom Prize - {{ $root.customInfo.prize.name }}</h1>
    <h1 v-if="$root.customInfo.meal">{{ $root.customInfo.meal }}</h1>
    <h1 v-if="$root.customInfo.other">Custom Sponsorship</h1>


    <form>
      <label for="name">Your Name</label>
      <input id="name" type="text" name="name" v-model="$root.name" tabindex="1">
      <label for="company-email">Your Work Email</label>
      <input id="company-email" type="email" name="company-email" v-model="$root.email" tabindex="2">
      <label for="company-phone">Your Work Phone Number</label>
      <input id="company-phone" type="phone" name="company-phone" v-model="$root.phone" tabindex="3">
      <label for="company-name">Your Company's Name</label>
      <input id="company-name" type="organization" name="company-name" v-model="$root.companyName" tabindex="4">
      <label for="company-url">Your Company Website URL (optional)</label>
      <input id="company-url" type="url" name="company-url" v-model="$root.url" tabindex="5">
    </form>

    <button class="big" :disabled="!canFinish" @click="handleFinish()">Finish</button>
  </main>
</template>

<script>
export default {

  name: 'Checkout',

  data () {
    return {

    }
  },

  computed: {
    canFinish() {
      return this.$root.name && this.$root.email && this.$root.phone && this.$root.companyName;
    }
  },

  mounted() {
    if ( this.$root.donationAmount == 0 && !this.$root.customInfo.prize.name && !this.$root.customInfo.meal && !this.$root.customInfo.other ) {
      this.$router.push({ name: 'SponsorNow' });
    }
  },

  methods: {
    handleFinish() {
      //Update FullStory Tracking
      FS.setUserVars({
        name: this.$root.name,
        email: this.$root.email,
        company: this.$root.company,
      });

      this.$router.push({ name: 'ThankYou' });
    }
  }
}
</script>

<style lang="scss" scoped>
  #checkout {
    margin-bottom: 10em;
  }

  form {
    margin: 3em auto;

    label {
      width: 100%;
      display: block;
    }

    input {
      width: 100%;
      margin-bottom: 0.5em;
      border-radius: 3px;
      border: 1px solid #224889;
    }
  }

</style>