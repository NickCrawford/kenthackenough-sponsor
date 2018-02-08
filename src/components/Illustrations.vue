<template>
  <vector src="@/assets/illustration.svg"></vector>
</template>

<script>
import {TweenMax, Power0, Power1, Back, TimelineLite} from "gsap";
import Vector from '@/components/Vector';

export default {

  name: 'Illustrations',
  components: { Vector },

  props: ['amount', 'tiers'],

  data () {
    return {
      allActiveElements: ['#Mentor'],
      allInactiveElements: [],
      animations: {
        ['#Mentor']: {
          activeDuration: 0.5,
          inactiveDuration: 0.5,
          inactiveStyle: { y: '-200%', ease: Power1.easeIn },
          activeStyle: { y: '0%', ease: Power1.easeIn },
        },
        ['#Table']: {
          activeDuration: 0.4,
          inactiveDuration: 0.4,
          inactiveStyle: { y: '-400%', ease: Power0.easeNone },
          activeStyle: { y: '0%', ease: Power0.easeNone },
        },
        ['#Water-Bottle']: {
          activeDuration: 0.4,
          inactiveDuration: 0.4,
          inactiveStyle: { y: '-580%', ease: Power1.easeIn },
          activeStyle: { y: '0%', ease: Power1.easeIn },
        },
        ['#Website']: {
          activeDuration: 0.75,
          inactiveDuration: 0.5,
          inactiveStyle: { x: '400%', ease: Back.easeIn.config(1.7) },
          activeStyle: { x: '0%', ease: Back.easeOut.config(1.7) },
        },
        ['#TShirt']: {
          activeDuration: 0.75,
          inactiveDuration: 0.5,
          inactiveStyle: { x: '-400%', ease: Back.easeIn.config(1.7) },
          activeStyle: { x: '0%', ease: Back.easeOut.config(1.7) },
        },
        ['#Bag']: {
          activeDuration: 0.5,
          inactiveDuration: 0.5,
          inactiveStyle: { y: '600%', ease: Power1.easeIn },
          activeStyle: { y: '0%', ease: Power1.easeOut },
        },
        ['#Recruiter']: {
          activeDuration: 0.5,
          inactiveDuration: 0.5,
          inactiveStyle: { y: '-200%', ease: Power1.easeIn },
          activeStyle: { y: '0%', ease: Power1.easeIn },
        },
        ['#Resume-Stack']: {
          activeDuration: 0.5,
          inactiveDuration: 0.5,
          inactiveStyle: { y: '-850px', ease: Power1.easeIn },
          activeStyle: { y: '0px', ease: Power1.easeIn },
        },
        ['#Projecter-Screen']: {
          activeDuration: 1,
          inactiveDuration: 0.75,
          inactiveStyle: { y: '-120%', ease: Power1.easeIn },
          activeStyle: { y: '0%', ease: Power1.easeOut },
        },
        ['#Spotlight']: {
          activeDuration: 0.5,
          inactiveDuration: 0.5,
          inactiveStyle: { y: '-850%', ease: Power1.easeIn },
          activeStyle: { y: '0%', ease: Power1.easeIn },
        },
        ['#Male-Hacker']: {
          activeDuration: 0.75,
          inactiveDuration: 0.5,
          inactiveStyle: { x: '-150%', ease: Back.easeIn.config(1.7) },
          activeStyle: { x: '0%', ease: Back.easeOut.config(1.7) },
        },
        ['#Female-Hacker']: {
          activeDuration: 0.75,
          inactiveDuration: 0.5,
          inactiveStyle: { x: '150%', ease: Back.easeIn.config(1.7) },
          activeStyle: { x: '0%', ease: Back.easeOut.config(1.7) },
        },
      }
    }
  },

  watch: {
    amount() {
      this.animate();
    }
  },

  mounted() {
    setTimeout(() => {
      // console.log('Animate');
      this.animate();
    }, 200);
    
  },

  methods: {

    animate() {
      // Copy the current version of the Active Elements Array
      let previousAllActiveElements = this.allActiveElements.slice();
      let previousAllInactiveElements = this.allInactiveElements.slice();

      this.allActiveElements = [];
      this.allInactiveElements = [];

      // Find out which elements are active at the current slider amount
      this.tiers.forEach((tier) => {
        if (this.amount >= tier.amount) {
  
          this.allActiveElements.push(...tier.activeElements);
        } else {
          this.allInactiveElements.push(...tier.activeElements);
        }
      });

      /* We only want to animate the elements that were newly added to the active array.
       * To do this, we take our copy of the old version of the list and compare it to our new version
       * We want to only keep the elements that were just added and animate those.
       * If we didn't do this, ALL of the active elements would arenimate each time the slider amount changes
      */

      const onlyAnimateActive = this.allActiveElements.filter(val => !previousAllActiveElements.includes(val));
      // console.log('Active', onlyAnimateActive);
      onlyAnimateActive.forEach((elementId) => {
        var svg = document.querySelector(elementId);
        // Special case for resume stack for more fun staggered animation :D
        if (elementId == '#Resume-Stack') {

          TweenMax.staggerTo("#Resume-Stack path", this.animations[elementId].activeDuration, this.animations[elementId].activeStyle, 0.1);

        } else {

          TweenMax.set(svg, this.animations[elementId].inactiveStyle);

          var tl = new TimelineMax({});

          tl.to(svg, this.animations[elementId].activeDuration, this.animations[elementId].activeStyle );
        }
      })

      /*
       * Now we do the same for the inactive elements
       */
      // console.log('this.allInactiveElements', this.allInactiveElements);
      // console.log('previous', previousAllInactiveElements);
      const onlyAnimateInactive = this.allInactiveElements.filter(val => !previousAllInactiveElements.includes(val));
      // console.log('onlyAnimateInactive', onlyAnimateInactive);
      onlyAnimateInactive.forEach((elementId) => {
        var svg = document.querySelector(elementId);
        // console.log("inactive", svg, this.animations[elementId])
        console.log('element', elementId, svg)
        // Special case for resume stack for more fun animation :D
        if (elementId == '#Resume-Stack') {

          TweenMax.to("#Resume-Stack path", this.animations[elementId].inactiveDuration, this.animations[elementId].inactiveStyle);
          return;
        }

          TweenMax.set(svg, this.animations[elementId].activeStyle);

          var tl = new TimelineMax({});

          tl.to(svg, this.animations[elementId].inactiveDuration, this.animations[elementId].inactiveStyle);
      })
    }
  }
}
</script>

<style lang="scss">


// #Mentor, #Table2, #Recruiter {
//   transform: translateY(-115%);
//   transition: transform 0.5s cubic-bezier(.6,.02,.9,.81);

//   &.active {
//     transform: translateY(0);
//   }
// }

// #Water-Bottle {
//   transform: translateY(-110%);
//   transition: transform 0.5s cubic-bezier(.6,.02,.9,.81);
//   transition-delay: 0s;

//   &.active {
//     transform: translateY(0);
//     transition-delay: 0.3s;
//   }
// }

// #Website, #Female-Hacker {
//   transform: translateX(50%);
//   transition: transform 1s cubic-bezier(.55,-0.57,.82,.19);

//   &.active {
//     transform: translateX(0);
//     transition: transform 1s cubic-bezier(.36,1.67,.59,1.01);
//   }
// }

// #TShirt, #Male-Hacker {
//   transform: translateX(-50%);
//   transition: transform 1s cubic-bezier(.55,-0.57,.82,.19);

//   &.active {
//     transform: translateX(0);
//     transition: transform 1s cubic-bezier(.36,1.67,.59,1.01);
//   }
// }

// #Bag {
//   transform: translateY(110%);
//   transition: transform 1s ease-out;

//   &.active {
//     transform: translateY(0);
//     transition: transform 1s ease-out;
//   }
// }

// #Resume-Stack {

//   path {
//     transform: translateY(-90%);
//     transition: transform 0.5s cubic-bezier(.6,.02,.9,.81);
//   }

//   path:nth-child(11), path:nth-child(12) {
//     opacity: 0;
//     transition: opacity 0.3s ease 0s;
//   }

//   &.active {
//     path {
//       transform: translateY(0);
//       transition: transform 0.5s cubic-bezier(.6,.02,.9,.81);

//       @for $i from 10 to 1 {
//         &:nth-child(#{$i}) { transition-delay: #{$i * 100}ms }
//       }
//     }

//     path:nth-child(11), path:nth-child(12) {
//       opacity: 1;
//       transition: opacity 0.3s ease 2s;
//     }
//   }
// }

// #Projecter-Screen {
//   transform: translateY(-100%);
//   transition: transform 1s cubic-bezier(.46,.19,.73,.43);

//   &.active {
//     transform: translateY(0);
//     transition: transform 1.5s cubic-bezier(.4,.71,.43,.91);
//   }
// }

// #Spotlight {
//   opacity: 0;

//   &.active {
//       animation-name: flicker;
//       animation-duration: 1s;
//       animation-timing-function: linear;
//       animation-delay: 0s;
//       animation-direction: backwards;
//       opacity: 1;
//   }
// }

// @keyframes flicker {
//   0% {
//     opacity: 0;
//   }
//   9% {
//     opacity: 0;
//   }
//   10% {
//     opacity: 1;
//   }
//   19% {
//     opacity: 1;
//   }
//   20% {
//     opacity: 0;
//   }
//   39% {
//     opacity: 0;
//   }
//   40% {
//     opacity: 1;
//   }
//   49% {
//     opacity: 1;
//   }
//   50% {
//     opacity: 0;
//   }
//   99% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// }
</style>