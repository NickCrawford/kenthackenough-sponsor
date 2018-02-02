<template>
  <main id="sponsor-now">
    <router-link :to="{ name: 'Home' }">&lt; Go Back</router-link>
    <br><br>
    <h2>Let's do this.</h2>
    <p class="big">We're happy you're here. Select your donation amount or custom sponsorship options below. Then, hit the 'Next' button to select your payment method.</p>
    <br><br>
    <div class="form-wrapper">
      <div class="tier-info">
        <h3>Here's what you'll get:</h3>
        <br>
        <ul>
          <li v-for="perk in activePerks"><p>{{ perk }}</p></li>
        </ul>
        <ul>
          <li v-for="perk in inactivePerks"><p class="faded">{{ perk }}</p></li>
        </ul>
      </div>
      <form v-on:submit.prevent="handleSubmit()">
        <!-- Donation Amount -->
        <div class="fieldset">
          <div class="flex-row">
            <label for="donation"><h3>Donate</h3></label>
            <p class="big">$</p><money id="donation" name="donation" v-model="donationAmount" v-bind="money"></money>
          </div>
        </div>

        <!-- Meal -->
        <div class="fieldset">
          <div class="flex-row">
            <input id="meal" v-model="custom.meal" name="meal" type='checkbox' />
            <label for='meal'>
              <h3>Sponsor a Meal</h3>
              <span></span>
            </label>
          </div>
          <transition name="slideVert">
            <div class="hide" v-if="custom.meal">
              <p>Which meal would you like to sponsor?</p>
              <select v-model="mealSelected">
                <!-- inline object literal -->
                <option disabled value="">Please select one</option>
                <option v-for="mealOption in mealOptions">{{ mealOption }}</option>
              </select>
              <br><br>
              <p v-if="mealSelected">Thanks! Click <b>'Next'</b> below and we'll be in touch soon with more details</p>
            </div>
          </transition>
        </div>

        <!-- Prize -->
        <div class="fieldset">
          <div class="flex-row">
            <input id="prize" v-model="custom.prize" name="meal" type='checkbox' />
            <label for='prize'>
              <h3>Sponsor a Prize</h3>
              <span></span>
            </label>
          </div>
          <transition name="slideVert">
            <div class="hide" v-if="custom.prize">
              <p>Describe the prize you wish to sponsor.</p>
              <label for="prize-name">Prize Name</label>
              <input id="prize-name" type="text" name="prize-name" v-model="$root.customInfo.prize.name" placeholder="Best Hack Against Online Harassment"/>
              <label for="prize-item">Prize Item</label>
              <input id="prize-item" type="text" name="prize-item" v-model="$root.customInfo.prize.item" placeholder="1TB Hard Drives"/>
              <label for="prize-value">Prize Estimated Value</label>
              <money v-bind="moneySmall" id="prize-value" name="prize-value" v-model="$root.customInfo.prize.value"/>
              <label for="prize-criteria">Prize Criteria</label>
              <textarea id="prize-criteria" type="text" name="prize-criteria" v-model="$root.customInfo.prize.criteria" placeholder="Build a software solution that can help reduce the frequency and/or severity of online harassment."></textarea>
            </div>
          </transition>
        </div>

        <!-- Custom Other Option -->
        <div class="fieldset">
          <div class="flex-row">
            <input id="other" v-model="custom.other" name="other" type='checkbox' />
            <label for='other'>
              <h3>Sponsor something else</h3>
              <span></span>
            </label>
          </div>
          <transition name="slideVert">
            <div class="hide" v-if="custom.other">
              <p>How would you like to sponsor Kent Hack Enough?</p>
              <textarea name="custom" v-model="customInfo"/>
              <p v-if="customInfo.length > 10">Click <b>'Next'</b> below and we'll be in touch soon with more details.</p>
            </div>
          </transition>
        </div>

        <router-link :to="{ name: 'Checkout' }" tag="button" class="big" :disabled="isFinishedDisabled">Next</router-link>

      </form>
    </div>
  </main>
</template>

<script>
import { tiers } from '@/tiers';

export default {

  name: 'SponsorNow',

  data () {
    return {
      donationAmount: 0,
      mealSelected: '',
      mealOptions: [
        'Friday Dinner',
        'Friday Midnight Snack',
        'Saturday Breakfast',
        'Saturday Lunch',
        'Saturday Dinner',
        'Saturday Midnight Snack',
        'Sunday Breakfast',
        'Sunday Lunch'
      ],
      customInfo: '',
      custom: {
        meal: false,
        prize: false,
        other: false,
      },
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false
      },
      moneySmall: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },

  computed: {
    activePerks() {
      var allPerks = [];

      // Find out which perks and elements are active at the current donation amount
      tiers.forEach((tier) => {
        if (this.donationAmount >= tier.amount) {
          allPerks.push(...tier.perks);
        }
      });

      // Find out which perks and elements are active based on custom sponsorship
      tiers.forEach((tier) => {
        if (tier.perks.includes('Logo on Website') && this.mealSelected && this.custom.meal) {

          if (!allPerks.includes('Logo on Website')) allPerks.push('Logo on Website');
        }

        if (tier.perks.includes('Logo on T-Shirt')  && this.mealSelected  && this.custom.meal) {
          if (!allPerks.includes('Logo on T-Shirt')) allPerks.push('Logo on T-Shirt');
        }

        if (tier.perks.includes('Judge Final Hacks')  && this.custom.prize) {
          if (!allPerks.includes('Judge Final Hacks')) allPerks.push('Judge Final Hacks');
        }
      
      });

      return allPerks;
    },
    inactivePerks() {
      var inactivePerks = [];
      tiers.forEach((tier) => {
        
        inactivePerks.push(...tier.perks.filter((n) => !this.activePerks.includes(n)));

      });
      return inactivePerks;
    },

    isFinishedDisabled() {
      if (this.mealSelected && this.custom.meal) return false;
      if (this.custom.prize) return false;
      if (this.custom.other && this.customInfo) return false;
      if (this.donationAmount == 0) return true;
    }
  },

  watch: {
    donationAmount(amount) {
      this.$root.donationAmount = amount;
    },

    mealSelected(meal) {
      this.$root.customInfo.meal = meal;
    },

    customInfo(info) {
      this.$root.customInfo.other = info;
    },

    custom: {
      handler (custom) {
        if (!custom.meal) {
          this.mealSelected = '';
        }

        if (!custom.prize) {
          this.$root.customInfo.prize.name = '';
        }

        if (!custom.other) {
          this.customInfo = '';
        }
      },
      deep: true,
    }
  },

  mounted() {
    this.donationAmount = this.$root.donationAmount;
    setTimeout(() => {
      var el = document.querySelector('.v-money');
      el.focus();
            el.select();
    }, 200);
    setTimeout(() => {
      var el = document.querySelector('.v-money');
      el.select();
    }, 400);


    // Init checkboxes
    if (this.$root.customInfo.prize.name) {
      this.custom.prize = true;
    }

    if (this.$root.customInfo.meal) {
      this.custom.meal = true;
      this.mealSelected = this.$root.customInfo.meal;
    }

    if (this.$root.customInfo.other) {
      this.custom.other = true;
      this.customInfo = this.$root.customInfo.other;
    }
  },

  methods: {
    handleSubmit() {
      alert('sumbit');
    }
  }
}
</script>

<style lang="scss" scoped>
  #sponsor-now {
    margin-bottom: 10em;
  }

  .form-wrapper {
    display: flex;
    flex-wrap: wrap;

    margin-bottom: 4em;
  }

  .faded {
    opacity: 0.2;
  }

  .tier-info {
    width: 50%;

    ul {
      li {
        margin-left: 1.5em;
      }
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      order: 1;

      margin: 2em 0;
    }

  }

  form {
    width: 50%;
    background-color: #FFF;
    padding: 1em 2em;
    box-shadow: 0 3px 5px rgba(0,0,0,0.3);
    border-radius: 3px;

    @media screen and (max-width: 768px) {
      width: 100%;
      order: 0;
    }
  }

  .fieldset {
    width: 100%;
    border: none;
    border-bottom: 1px solid #224889;
  }

  .flex-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: baseline;

    label {
      width: 100%;
      flex-grow: 1;
    }
  }

  .hide {
    input, textarea {
      display: block;
      width: 100%;
      font-family: 'Merriweather', sans-serif;
      border: 1px solid #224889;
      border-radius: 4px;
      background-color: #FAFAFA;
      margin-bottom: 1em;
      font-size: 16px;

      &.v-money {
        text-align: left;
        padding: 0.5em;
      }
    } 

    p {
      margin-bottom: 1em;
    }
  }

  input.v-money {
    flex-shrink: 2;
    text-align: right;
    padding: 0.5em 0;
  }

textarea {
  width: 100%;
  max-width: 100%;
  min-height: 6em;
  height: 100%;
  margin-top: 1em;
  font-size: 16px;
  padding: 0.5em;
}

input[type='checkbox']{ height: 0; width: 0; opacity: 0; }

input[type='checkbox'] + label{
  position: relative;
  display: flex;
  margin: 1em 0;
  align-items: center;
  color: #9e9e9e;
  transition: color 250ms cubic-bezier(.4,.0,.23,1);
}

input[type='checkbox'] + label > span{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1em;
  width: 1em;
  height: 1em;
  background: transparent;
  border: 2px solid #9E9E9E;
  border-radius: 2px;
  cursor: pointer;  
  transition: all 250ms cubic-bezier(.4,.0,.23,1);
}

input[type='checkbox'] + label > h3{
  width: 100%;
}

input[type='checkbox'] + label:hover, input[type='checkbox']:focus + label{
  color: #fff;
}
input[type='checkbox'] + label:hover > span, input[type='checkbox']:focus + label > span{
  background: rgba(255,255,255,.1);
}

input[type='checkbox']:checked + label > span{
  border: .5em solid #FFEB3B;
  animation: shrink-bounce 200ms cubic-bezier(.4,.0,.23,1);
}
input[type='checkbox']:checked + label > span:before{
  content: "";
  position: absolute;
  top: 0.6em;

  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  transform: rotate(45deg);
  transform-origin: 0% 100%;
  animation: checkbox-check 125ms 250ms cubic-bezier(.4,.0,.23,1) forwards;
}

@keyframes checkbox-check{
  0%{
    width: 0;
    height: 0;
    border-color: #212121;
    transform: translate3d(0,0,0) rotate(45deg);
  }
  33%{
    width: .2em;
    height: 0;
    transform: translate3d(0,0,0) rotate(45deg);
  }
  100%{    
    width: .2em;
    height: .5em;    
    border-color: #212121;
    transform: translate3d(0,-.5em,0) rotate(45deg);
  }
}

.slideVert-enter-active, .slideVert-leave-active {
  transition: all .5s ease;
  transform-origin: top;
  opacity: 1;
}
.slideVert-enter, .slideVert-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scaleY(0);
  opacity: 0;
}
</style>