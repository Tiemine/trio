<template>
  <div class="sync-button">
		<button 
		class="sync-button__cta" 
		v-bind:class="{ 'sync-button__cta--rotate': firstSync, 'sync-button__cta--rotate-back' : secondSync }" 
		@click="syncClicked"></button>
		<span class="sync-button__text">{{ syncTxt }}</span>
  </div>
</template>
<script>
export default {
  name: 'SyncButton',
  data(){
	return{
		firstSync: false,
		secondSync: false
	}
  },
  props: {
	syncTxt: {
		type: String,
		default: "Sync Contacts"
		},
	},
	methods: {
		syncClicked: function() {
			this.$emit('syncButtonClicked');
			if(this.firstSync) {
				this.firstSync = false;
				this.secondSync = true;
			}
			else {
				this.firstSync = true;
				this.secondSync = false;
			}
		}
	}
}
</script>
<style scoped lang="scss">
	.sync-button{
		display: flex;
		flex-direction: column;
		&__cta{
			width: 132px;
			height: 132px;
			background: #fff;
			border-radius: 50%;
			background-image: url('../assets/arrows.png');
			background-repeat: no-repeat;
			background-position: center;
			border: 0;
			&:active,
			&:focus{
				outline: 2px solid #374A5E;
				outline-offset: 4px;
			}
			&:hover{
				cursor: pointer;
			}
			&--rotate{
				transform: rotate(180deg);
				transition: 0.3s;
			}
			&--rotate-back{
				transform: rotate(-180deg);
				transition: 0.3s;
			}
		}
		&__text{
			text-align: center;
			margin-top: 8px;
			font-weight: 400;
			font-size: 18px;
			color: #374A5E;
		}
	}
</style>
