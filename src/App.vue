<template>
  <div class="wrapper" ref="wrapperDiv">
    <div class="column">
      <Card imgSrc="gmail" title="Gmail">These Gmail contacts will sync to MailChimp</Card>
    </div>
    <div class="column-small">
      <SyncButton/>
    </div>
    <div class="column">
      <div class="sync">
        <Card imgSrc="mailchimp" title="Mailchimp">These Mailchimp contacts will sync to Gmail</Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue'
import SyncButton from './components/SyncButton.vue'

export default {
  name: 'App',
  components: {
    Card,
    SyncButton
  },
  data() {
    return{
      cardSize: ''
    }
  },
  mounted(){
    this.cardSize = this.$refs.wrapperDiv.offsetHeight / 4 + 'px';
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
    }
  }
  @media screen and (max-width: 600px) {
    .column{
      width: 100%;
    }
  }
  @media screen and(min-width: 601px){
    .column{
      width: 284px;
    }
    .column-small{
      width: 189px;
    }
  }
}
</style>