<template>
  <div class="wrapper" ref="wrapperDiv">
    <div class="column">
      <Card imgSrc="gmail" title="gmail" :options="gmailLabels">These Gmail contacts will sync to MailChimp</Card>
    </div>
    <div class="column-small">
      <SyncButton @syncButtonClicked="syncContacts" :syncTxt="syncBtnText"/>
    </div>
    <div class="column">
      <div class="sync">
        <Card imgSrc="mailchimp" title="mailchimp" :options="mailChimpLabels">These Mailchimp contacts will sync to Gmail</Card>
      </div>
    </div>
  </div>
  <div v-if="errorMessage" class="error">
    <p>You need to select at least one contact!</p>
  </div>
</template>

<script>
import Card from './components/Card.vue'
import SyncButton from './components/SyncButton.vue'
import axios from 'axios';
import { updateOptionsStore } from "./store/updateOptions"

export default {
  name: 'App',
  components: {
    Card,
    SyncButton
  },
  data(){
    return{
      cardSize: '',
      mailChimpLabels: {},
      gmailLabels: {},
      labelsPayload: {},
      syncBtnText: "Sync Contacts",
      errorMessage: false,
      awsUrl: 'https://tiemine-trio-project.s3.us-east-2.amazonaws.com/'
    }
  },
   created(){
    this.getMailChimpContacts();
    this.getGmailContacts();
  }, 
  mounted(){
    this.cardSize = this.$refs.wrapperDiv.offsetHeight / 4 + 'px';
  },
  methods: {
    getMailChimpContacts: async function() {
      try {
        const result = await axios.get(`${this.awsUrl}mailchimplLabelList.json`);
        if (result.status !== 200){
          alert("Error while trying to fetch data from service API, try again later");
        }
        this.mailChimpLabels = result.data
      } catch(error) {
          alert("Error while trying to fetch data from service API, try again later");
      }
    },
    getGmailContacts: async function() {
      try {
        const result = await axios.get(`${this.awsUrl}gmailLabelList.json`)
        if (result.status !== 200){
          alert("Error while trying to fetch data from service API, try again later");
        }
        this.gmailLabels = result.data
      } catch(error) {
        alert("Error while trying to fetch data from service API, try again later");
      }
    },
    syncContacts: function() {
      const store = updateOptionsStore();
      const gmailStoreLabels = Object.values({...store.gmailSelected});
      const mailchimpStoreLabels = Object.values({...store.mailchimpSelected});

      const selectedLabels = Array.from(new Set([...gmailStoreLabels, ...mailchimpStoreLabels]));

      let mergedContacts = {}
      selectedLabels.forEach(label => {
        let gmailContacts = (gmailStoreLabels.includes(label) ? this.gmailLabels[label] : []).map(el => el);
        let mailchimpContacts = (mailchimpStoreLabels.includes(label) ? this.mailChimpLabels[label] : []).map(el => el);
        let mergedContactsArray = Array.from(new Set([...gmailContacts, ...mailchimpContacts]));
        
        mergedContacts[label] = mergedContactsArray;
      });

      this.labelsPayload = mergedContacts;
      this.showFeedbackMsg(Object.keys(this.labelsPayload));
    },    
    showFeedbackMsg: function(payload){
      if (payload.length !== 0) {
        this.syncBtnText === "All Done!" ? this.syncBtnText = "Updated!" : this.syncBtnText = "All Done!";
        this.errorMessage = false;
        console.log({...this.labelsPayload});
      }
      else {
        this.errorMessage = true;        
      }
    },
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  font-family: 'Noto Sans', sans-serif;
  background-image: url('./assets/Blob.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  margin-top: 88px;
  .wrapper{
    display: flex;
    justify-content: center;
    padding-top: 76px;
    .column-small{
      display: flex;
      align-items: flex-start;
      justify-content: center;
      margin-top: v-bind(cardSize);
      width: 189px;
    }
    .column {
      width: 284px
    }
  }
  .error{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f35632;
    font-size: 18px;
    font-family: 'Noto Sans', sans-serif;
    }
}
  @media (max-width: 750px) {
    #app .wrapper{
      flex-direction: column;
      align-items: center;
      margin-bottom: 100px;
      .column{
        width: 100%;
      }
      .column-small{
        margin: v-bind(cardSize) 0;
      }
    }
  }
</style>
