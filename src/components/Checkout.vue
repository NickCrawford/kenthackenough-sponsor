<template>
  <main>
    <h2>You're sponsoring:</h2>
    <h1 v-if="$root.donationAmount > 0">$ {{ $root.donationAmount }}</h1>
    <h1 v-if="$root.customInfo.prize.name">Custom Prize - {{ $root.customInfo.prize.name }}</h1>
    <h1 v-if="$root.customInfo.meal">{{ $root.customInfo.meal }}</h1>
    <h1 v-else>Custom Sponsorship</h1>


    <form>
      <label for="name">Your Name</label>
      <input id="name" type="text" name="name" v-model="$root.name" tabindex="1" v-focus>
      <label for="company-email">Your Work Email</label>
      <input id="company-email" type="email" name="company-email" v-model="$root.email" tabindex="2">
      <label for="company-phone">Your Work Phone Number</label>
      <input id="company-phone" type="phone" name="company-phone" v-model="$root.phone" tabindex="3">
      <label for="company-name">Your Company's Name</label>
      <input id="company-name" type="organization" name="company-name" v-model="$root.companyName" tabindex="4">
      <label for="company-url">Your Company Website</label>
      <input id="company-url" type="url" name="company-url" v-model="$root.url" tabindex="5">
    </form>

    <span v-if="$root.donationAmount > 0">
      <p class="big">Pay with:</p>
      <div class="flex-row">
        <div class="paycard" tabindex="6">
          <h3>Pay now with <h2>Paypal</h2></h3>
        </div>
        <div class="paycard" tabindex="7">
          <h3>Get an invoice and pay with <h2>check</h2></h3>
        </div>
      </div>
    </span>

    <router-link :to="{ name: 'ThankYou' }" tag="button" class="big">Finish</router-link>
  </main>
</template>

<script>
export default {

  name: 'Checkout',

  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

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

 .flex-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: baseline;

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
  }

  .paycard {
    background-color: #FFF;
    padding: 1em 2em;
    box-shadow: 0 3px 5px rgba(0,0,0,0.3);
    border-radius: 4px;
    width: 48%;
    margin: 1em 0;

    h3 {
      text-align: center;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
</style>