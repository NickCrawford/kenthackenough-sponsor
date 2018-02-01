<template>
  <vector src="@/assets/illustration.svg"></vector>
</template>

<script>
import lunar from 'lunar.js/dist/lunar.min.js';

export default {

  name: 'Illustrations',

  props: ['amount', 'tiers'],

  data () {
    return {
      
    }
  },

  watch: {
    amount() {
      this.animate();
    }
  },

  mounted() {
    setTimeout(() => {
      console.log('timeout called');
      this.animate();
    }, 300);
  },

  methods: {
    animate() {
      var allActiveElements = [];
      var inactiveElements = [];
      var allPerks = [];

      // Find out which perks and elements are active at the current slider amount
      this.tiers.forEach((tier) => {
        if (this.amount >= tier.amount) {
          allPerks.push(...tier.perks);
          allActiveElements.push(...tier.activeElements);
        } else {
          inactiveElements.push(...tier.activeElements);
        }
      });

      // console.log('animating', this.amount, allActiveElements, inactiveElements);

      // Add the 'active' class to each active element
      allActiveElements.forEach((elementId) => {
        var svg = document.querySelector(elementId);
        lunar.addClass(svg, 'active');
      })

      // Remove the 'active' class from each active element
      inactiveElements.forEach((elementId) => {
        var svg = document.querySelector(elementId);
        lunar.removeClass(svg, 'active');
      })
    }
  }
}
</script>

<style lang="scss">


#Mentor, #Table2, #Recruiter {
  transform: translateY(-115%);
  transition: transform 0.5s cubic-bezier(.6,.02,.9,.81);

  &.active {
    transform: translateY(0);
  }
}

#Water-Bottle {
  transform: translateY(-110%);
  transition: transform 0.5s cubic-bezier(.6,.02,.9,.81);
  transition-delay: 0s;

  &.active {
    transform: translateY(0);
    transition-delay: 0.3s;
  }
}

#Website, #Female-Hacker {
  transform: translateX(50%);
  transition: transform 1s cubic-bezier(.55,-0.57,.82,.19);

  &.active {
    transform: translateX(0);
    transition: transform 1s cubic-bezier(.36,1.67,.59,1.01);
  }
}

#TShirt, #Male-Hacker {
  transform: translateX(-50%);
  transition: transform 1s cubic-bezier(.55,-0.57,.82,.19);

  &.active {
    transform: translateX(0);
    transition: transform 1s cubic-bezier(.36,1.67,.59,1.01);
  }
}

#Bag {
  transform: translateY(110%);
  transition: transform 1s ease-out;

  &.active {
    transform: translateY(0);
    transition: transform 1s ease-out;
  }
}

#Resume-Stack {

  path {
    transform: translateY(-90%);
    transition: transform 0.5s cubic-bezier(.6,.02,.9,.81);
  }

  path:nth-child(11), path:nth-child(12) {
    opacity: 0;
    transition: opacity 0.3s ease 0s;
  }

  &.active {
    path {
      transform: translateY(0);
      transition: transform 0.5s cubic-bezier(.6,.02,.9,.81);

      @for $i from 10 to 1 {
        &:nth-child(#{$i}) { transition-delay: #{$i * 100}ms }
      }
    }

    path:nth-child(11), path:nth-child(12) {
      opacity: 1;
      transition: opacity 0.3s ease 2s;
    }
  }
}

#Projecter-Screen {
  transform: translateY(-100%);
  transition: transform 1s cubic-bezier(.46,.19,.73,.43);

  &.active {
    transform: translateY(0);
    transition: transform 1.5s cubic-bezier(.4,.71,.43,.91);
  }
}

#Spotlight {
  opacity: 0;

  &.active {
      animation-name: flicker;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-direction: backwards;
      opacity: 1;
  }
}

@keyframes flicker {
  0% {
    opacity: 0;
  }
  9% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  19% {
    opacity: 1;
  }
  20% {
    opacity: 0;
  }
  39% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  49% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>