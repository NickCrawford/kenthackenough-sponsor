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
          <form v-if="$root.donationAmount > 0" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" class="paypal" name="cmd" value="_s-xclick">
            <input type="hidden" name="hosted_button_id" value="FHFGGFNLMM8YY">
            <input type="image" 
              class="paypal" 
              src="../../static/paypal.png" 
              border="0" 
              name="submit"
              id="paypalImg" 
              alt="PayPal - The safer, easier way to pay online!">
            <img 
              alt="" 
              style="display:none;"
              class="paypal" 
              border="0" 
              src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" 
              width="1" 
              height="1">
          </form>
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

  #paypalImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 4em;
    object-fit: contain;
  }

  .paypal {
    cursor: pointer;
    height: 100%;
    padding: 1em 2em;
    width: 48%;
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
    position: relative;
    background-color: #FFF;
    padding: 1em 2em;
    box-shadow: 0 3px 5px rgba(0,0,0,0.3);
    border-radius: 4px;
    width: 45%;
    margin: 1em 0;
    text-align: center;

    cursor: pointer;

    h3 {
      text-align: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      margin: 0 auto;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      height: 13em;

      img {
        height: 70%;
        width: auto;
      }
    }
  }
</style>