<template>
  <div id="slider-container">
    <transition name="fade">
      <div class="scroll-down-indicator" v-if="showScrollIndicator" @click="scrollToIllustration()">
        <p>Scroll down for more</p>
        <span ></span>
      </div>
    </transition>

    <transition name="fade">
      <ul class="tier-info" v-if="!showScrollIndicator">
        <li v-for="perk in activePerks">
          <h3>{{ perk }}</h3>
        </li>
      </ul>
    </transition>

    <illustrations :amount="amount" :tiers="tiers"></illustrations>

    <transition name="fade">
      <div class="input-wrapper" v-show="!showScrollIndicator">
        <label class="house-label" for="range" id="label"><div class="tooltip" v-if="!hasDragged">
          <p>Psst! Try dragging this slider</p>
        </div><h2>Donate ${{ amount }}</h2></label>
        <input v-model="sliderVal" type="range" min="0" max="7" step="1" id="range">
      </div>
    </transition>
  </div>
</template>

<script>
import Illustrations from '@/components/Illustrations';
import { tiers } from '@/tiers';
import {TweenMax, Power1, TimelineLite} from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

export default {

  name: 'Slider',
  components: { Illustrations },
  data() {
    return {
      hasDragged: false,
      showScrollIndicator: true,
      sliderVal: 0,
      tiers,
    };
  },

  watch: {
    sliderVal() {
      if (!this.hasDragged) {
        this.scrollToIllustration();
      }

      this.hasDragged = true;
    },

    showScrollIndicator(showing) {
      this.updateOpacity();
    }
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

  mounted () {
    this.updateOpacity();
    var tooltip = document.querySelector('.tooltip');
    TweenMax.to(tooltip, 1, { x: -20, yoyo: true, repeat: -1, ease: Power1.easeInOut });
  },

  methods: {
    handleScroll () {
      this.showScrollIndicator = window.scrollY < 100;
    },
    updateOpacity () {
      if (!this.showScrollIndicator) {
        TweenMax.to('#vector-wrapper', 0.5, { opacity: 1 });
      } else {
        TweenMax.to('#vector-wrapper', 0.5, { opacity: 0 });
      }
    },
    scrollToIllustration () {
      var header = document.querySelector('#header');
      TweenMax.to(window, 0.3, {scrollTo: { y: '#slider-container', offsetY: header.offsetHeight } });
    }
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
$color-primary: #224889;
$color-ledge: #79AAFF;

#slider-container {
  display: grid;
  grid-template-rows: 2em 1fr 6em;
  grid-template-columns: 100%;
  grid-template-areas: 
  "tier-info"
  "illustration"
  "slider";
  justify-items: center;
  align-items: end;
  overflow: hidden;

  position: relative;
  width: 100%;
  height: auto;
  min-height: 80vh;
  text-align: center;
  color: #333;
  overflow-x: hidden;

  .input-wrapper {
    grid-area: slider;
    position: relative;
    text-align: center;
    margin: 0 auto;
    label {
      margin-bottom: -1em;
      display: block;
    }
  }
}

.tier-info {
  grid-area: tier-info;
  z-index: 10;
  position: absolute;
  top: 0;
  //top: calc(5vw - 1.5em);
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
    background-color: white;
    padding: 0.5em 1em;
    border-radius: 2em;
    box-shadow: 0 3px 5px rgba(24,24,24,0.2);
    color: $color-primary;
  }
}

#vector-wrapper {
  position: relative;
  grid-area: illustration;
  align-self: end;
  justify-self: center;

  width: 100%;
  max-height: calc(90vh - 8em);
  object-fit: contain;


  // height: 100%;
  // max-height: calc(95vh - 8em); Added as inline styles
  margin: 0 auto;
}


@media screen and (max-width: 1024px) {
  #slider-container {
    min-height: 80vh;
    margin-top: 2em;

  }

  .tier-info {
    display: block;
    position: absolute;
    top: 0;
    padding: 0;

    h3 {
      margin: 0.5em;
    }
  }
}

.tooltip {
  display: block;
  position: absolute;
  top: 28%;
  right: 105%;
  width: 250px;
  padding: 0.5em 1em;
  background-color: #39475E;
  border-radius: 8px;
  border: 2px solid #192E50;
  color: white;
  z-index: 10;

  &:before {
    content: '';
      position: absolute;
      right: calc(-0.5em - 2px);
      top: calc(50% - 0.5em - 2px);
      background-color: #39475E;
      border-top: 2px solid #192E50;
      border-right: 2px solid #192E50;
      width: 1em;
      height: 1em;
      transform: rotate( 45deg );
      z-index: 9;
    }

    @media screen and (max-width: 1024px) {
    display: none;
  }
}


// Styling input ranges is painful

// Styling Cross-Browser Compatible Range Inputs with Sass
// Github: https://github.com/darlanrod/input-range-sass
// Author: Darlan Rod https://github.com/darlanrod
// Version 1.4.1
// MIT License

$track-color: linear-gradient(to bottom, $color-ledge, $color-ledge 49.9%, darken($color-ledge, 5%) 50%, darken($color-ledge, 5%) 100%) !default;
$thumb-color: $color-primary !default;

$thumb-radius: 20px !default;
$thumb-height: 40px !default;
$thumb-width: 40px !default;

$track-width: 330px !default;
$track-height: 25px !default;
$track-shadow-color: rgba(0, 0, 0, .2) !default;
$track-border-width: 5px !default;
$track-border-color: $color-primary !default;

$track-radius: 25px !default;

@mixin track {
cursor: pointer;
height: $track-height;
transition: all .2s ease;
width: $track-width;
}

@mixin thumb {
background: $thumb-color;
border-radius: $thumb-radius;
cursor: pointer;
height: $thumb-height;
width: $thumb-width;
}

[type='range'] {
  -webkit-appearance: none;
  margin: $thumb-height / 2 0;
  width: $track-width;
  background: transparent;
  &:focus {
    outline: 0;

    &::-webkit-slider-runnable-track {
      background: $track-color;
    }

    &::-ms-fill-lower {
      background: $track-color;
    }

    &::-ms-fill-upper {
      background: $track-color;
    }
  }

  &::-webkit-slider-runnable-track {
    @include track;
    background: $track-color;
    border-radius: $track-radius;
  }

  &::-webkit-slider-thumb {
    @include thumb;
    -webkit-appearance: none;
    margin-top: ((-$track-border-width * 2 + $track-height + 9) / 2) - ($thumb-height / 2);
  }

  &::-moz-range-track {
    @include track;
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &::-ms-track {
    @include track;
    background: transparent;
    border-color: transparent;
    border-width: ($thumb-height / 2) 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius * 2;
  }

  &::-ms-fill-upper {
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius * 2;
  }

  &::-ms-thumb {
    @include thumb;
    margin-top: 0;
  }
}

</style>