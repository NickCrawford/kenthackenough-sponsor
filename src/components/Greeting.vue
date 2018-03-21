<template>
  <div>
    <h2>Welcome{{ personName ? ` ${personName}` : '' }},</h2>
    <p class="big">We're really excited you're here! Sponsoring Kent Hack Enough is a great opportunity for {{ companyName || 'your company' }} 
    and our event wouldn't be possible without your help. <br><br>See the benefits you'll receive as a sponsor by clicking the button below.</p>
  </div>
</template>

<script>
export default {

  name: 'Greeting',

  props: ['personName', 'companyName'],

  data () {
    return {

    }
  }
}
</script>

<style lang="scss">

</style>