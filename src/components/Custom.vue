<template>
   <div id="custom-container">
      <div>
        <h3>Sponsor a Meal</h3>
        <p>Our hackers need to eat, and you can help feed their hunger. Sponsor a specific meal or two for the event.</p>
      </div>
      <div>
        <h3>Sponsor a Prize</h3>
        <p>Does your company have a product that you want people to know about? You can give it away as a prize!</p>
      </div>
      <div>
        <h3>Something else?</h3>
        <p><a href="#contact">Get in contact</a> with us to set up a custom sponsorship deal. We're very open to new and innovative ideas.</p>
      </div>
    </div>
</template>

<script>
export default {

  name: 'Custom',

  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  #custom-container {
    display: flex;
    flex-wrap: nowrap;
    
    & > div {
      margin: 1em 1em 0;
      width: 33%;
      
      &:first-child {
        margin-left: 0;
      }
      
      &:last-child {
        margin-right: 0;
      }
    }

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;

      & > div {
        margin: 1em 0 0;
        width: 100%
      }
    }
  }
</style>