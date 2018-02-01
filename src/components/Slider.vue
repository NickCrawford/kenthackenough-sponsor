<template>
  <div id="slider-container">
    <transition name="fade">
      <div class="scroll-down-indicator" v-if="showScrollIndicator">
        <p>Scroll down for more</p>
        <span></span>
      </div>
    </transition>

    <transition name="fade">
      <ul class="tier-info" v-if="!showScrollIndicator">
        <li v-for="perk in activePerks">
          <h3>{{ perk }}</h3>
        </li>
      </ul>
    </transition>

    <transition name="fade">
      <illustrations :amount="amount" :tiers="tiers" v-if="!showScrollIndicator"></illustrations>
    </transition>

    <transition name="fade">
      <div class="input-wrapper" v-if="!showScrollIndicator">
        <label class="house-label" for="range" id="label"><h2>Donate ${{ amount }}</h2></label>
        <input v-model="sliderVal" type="range" min="0" max="7" step="1" id="range">
      </div>
    </transition>
  </div>
</template>

<script>
import Illustrations from '@/components/Illustrations';
import { tiers } from '@/tiers';
export default {

  name: 'Slider',
  components: { Illustrations },
  data() {
    return {
      showScrollIndicator: true,
      sliderVal: 0,
      tiers,
    };
  },
  computed: {
    amount() {
      var amount = this.tiers[this.sliderVal].amount;
      this.$root.donationAmount = amount;
      return amount;
    },

    activePerks() {
      var allPerks = [];

      // Find out which perks and elements are active at the current slider amount
      this.tiers.forEach((tier) => {
        if (this.amount == tier.amount) {
          allPerks.push(...tier.perks);
        }
      });

      return allPerks;
    },
  },
  methods: {
    handleScroll () {
      this.showScrollIndicator = window.scrollY < 100;
    },
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style lang="scss" scoped>

  #slider-container {
    position: relative;
    width: 100%;
    height: 90vh;
    min-height: 600px;
    text-align: center;
    color: #333;
    overflow-x: hidden;

    .input-wrapper {
      width: 100%;
      position: absolute;
      bottom: 3em;
      text-align: center;

      label {
        display: block;
      }
    }
  }

  .tier-info {
    z-index: 10;
    position: absolute;
    top: 3.5em;
    left: 0;
    width: 100%;

    color: #192E50;
    text-align: center;

    list-style-type: none;
    padding: 1em 2em;

    display: flex;
    justify-content: center;

    h3 {
      display: inline-block;
      width: auto;
      margin: 2em;
      text-align: center;
    }
  }

  #illustration-container {

    width: auto;
    height: 80%;

    margin-left: 50%;
    transform: translateX(-50%);

    overflow: visible;

  }

  @media screen and (max-width: 1024px) {
    #slider-container {
      height: 90vh;
      margin-top: 2em;
      display: grid;
      grid-template-rows: 4em 1fr 6em;
      grid-template-columns: 100%;
      grid-template-areas: 
        "tier-info"
        "illustration"
        "slider";
      justify-items: center;
      align-items: center;
      overflow: visible;
    }

    .input-wrapper {
      grid-area: slider;
    }

    .tier-info {
      display: block;
      position: relative;
      top: 0;
      padding: 0;
      grid-area: tier-info;

      h3 {
        margin: 0.5em;
      }
    }

    #vector-wrapper {
      grid-area: illustration;
      width: 120%;
      height: auto;
    }


    #illustration-container {
      width: 100%;
      height: auto;
      overflow: hidden;
    }

  }

</style>