<template>
  <main id="checkout">
    <h2>You're sponsoring:</h2>
    <h1 v-if="$root.donationAmount > 0">$ {{ $root.donationAmount }}</h1>
    <h1 v-if="$root.customInfo.prize.name">Custom Prize - {{ $root.customInfo.prize.name }}</h1>
    <h1 v-if="$root.customInfo.meal">{{ $root.customInfo.meal }}</h1>
    <h1 v-if="$root.customInfo.other">Custom Sponsorship</h1>


    <form>
      <label for="name">Your Name</label>
      <input id="name" type="text" name="name" v-model="$root.name" tabindex="1">
      <label for="company-email">Your Work Email</label>
      <input id="company-email" type="email" name="company-email" v-model="$root.email" tabindex="2">
      <label for="company-phone">Your Work Phone Number</label>
      <input id="company-phone" type="phone" name="company-phone" v-model="$root.phone" tabindex="3">
      <label for="company-name">Your Company's Name</label>
      <input id="company-name" type="organization" name="company-name" v-model="$root.companyName" tabindex="4">
      <label for="company-url">Your Company Website URL (optional)</label>
      <input id="company-url" type="url" name="company-url" v-model="$root.url" tabindex="5">
    </form>

    <button class="big" :disabled="!canFinish" @click="handleFinish()">Finish</button>
  </main>
</template>

<script>
import axios from 'axios';

const API_BASE = 'https://api.khe.io/v1.0';

export default {

  name: 'Checkout',

  data () {
    return {

    }
  },

  computed: {
    canFinish() {
      return this.$root.name && this.$root.email && this.$root.phone && this.$root.companyName;
    }
  },

  mounted() {
    if ( this.$root.donationAmount == 0 && !this.$root.customInfo.prize.name && !this.$root.customInfo.meal && !this.$root.customInfo.other ) {
      this.$router.push({ name: 'SponsorNow' });
    }
  },

  methods: {
    handleFinish() {
      //Update FullStory Tracking
      FS.setUserVars({
        name: this.$root.name,
        email: this.$root.email,
        company: this.$root.companyName,
      });

      var credentials, drive_service, folder_id, http, template_id;
      credentials = get_credentials();
      http = credentials.authorize(new httplib2.Http());
      drive_service = discovery.build("drive", "v3", {"http": http});
      folder_id = get_folder(drive_service, "DriveInvoicing")["id"];
      template_id = get_content(drive_service, "Template", folder_id)["id"];

      var ticket = {
        subject: `${this.$root.companyName} is sponsoring Kent Hack Enough!`,
        name: this.$root.name,
        replyTo: this.$root.email,
        body: `
          Hi Kent Hack Enough team,

          My name is ${this.$root.name} and I work at ${this.$root.companyName}. You can reach me at my email (${this.$root.email}) and phone (${this.$root.phone}). Our company's website is ${this.$root.url || 'not defined'}. *** *** ***
          I'm interested in sponsoring Kent Hack Enough with the following:
          - Donation: ${this.$root.donationAmount || 'none'},  *  
          - Custom Meal: ${this.$root.customInfo.meal || 'none'},   *   
          - Custom Prize: ${this.$root.customInfo.prize.name || 'n/a'}, $${this.$root.customInfo.prize.value || 'n/a'}, ${this.$root.customInfo.prize.item || 'n/a'}, ${this.$root.customInfo.prize.criteria || 'n/a'},   *   
          - Other Info: ${this.$root.customInfo.other || 'n/a'}

          `
      }

      return axios.post(`${API_BASE}/tickets`, ticket)
      .then((response) => {
        console.log('Ticket sent', response);
        this.$router.push({ name: 'ThankYou' });
      })
      .catch((error) => {
        alert('We weren\'t able to complete your form submission. Make sure all the form fields are filled out correctly and that you\'re connected to the internet. Then try again in a bit.');
        // Handle error...
        console.log(error);
        
        console.log('API responded with:', error.response.data);
        throw error;
      });
      
    }
  }
}
</script>

<style lang="scss" scoped>
  #checkout {
    margin-bottom: 10em;
  }

  form {
    margin: 3em auto;

    label {
      width: 100%;
      display: block;
    }

    input {
      width: 100%;
      margin-bottom: 0.5em;
      border-radius: 3px;
      border: 1px solid #224889;
    }
  }

</style>