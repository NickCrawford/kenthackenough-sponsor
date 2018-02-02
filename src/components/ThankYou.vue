<template>
  <main id="thanks">
    <h1>Thank you!</h1>
    <h2>We'll be in touch soon with more details.</h2>
    <p>Once we've received your payment, we will include your logo on our website. Feel free to shoot us an email in the meantime if you have any questions or concerns:  <b>staff@khe.io</b></p>
    <br><br>
    <span>
      <p class="big" v-if="$root.donationAmount > 0">Pay now with:</p>
      <div class="flex-row">
        <div class="paycard" tabindex="6" v-if="$root.donationAmount > 0">
          <h3>Pay now with <h2>Paypal</h2></h3>
        </div>
        <div class="paycard" tabindex="7">
          <h3>View your <h2>invoice</h2></h3>
          <img src="@/assets/invoice.png" />
        </div>
      </div>
    </span>
  </main>
</template>

<script>
export default {

  name: 'ThankYou',

  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  #thanks {
    margin-bottom: 10em;
  }

 .flex-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;

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

    cursor: pointer;

    h3 {
      text-align: center;
    }

    img {
      width: 100%;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
</style>