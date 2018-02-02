<template>
  <div>
    <h2>Welcome{{ personName ? ` ${personName}` : '' }},</h2>
    <p class="big">We're really excited you're here! Sponsoring Kent Hack Enough is a great opportunity for {{ companyName || 'your company' }} 
    and our event wouldn't be possible without your help. Here are some things you can expect to get by supporting us:</p>
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