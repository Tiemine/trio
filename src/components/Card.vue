<template>
  <div class="card">
		<span v-if="imgSrc !== ''" class="card__icon"><img :src="require('../assets/' + imgSrc + '.png')" aria-hidden="true"></span>
		<h3 class="card__title">{{ title }}</h3>
		<div class="card__slotted">
			<slot></slot>
		</div>
		<Select :selectId="title"/>
  </div>
</template>
<script>
import Select from './Select.vue'

export default {
  name: 'Card',
  components: {
    Select,
  },
	props: {
		imgSrc: {
			type: String,
			default: ""
		},
		title: String
	}
}
</script>
<style scoped lang="scss">
  .card{
		display: flex;
		flex-direction: column;
		align-items: center;
		border: solid 2px #DFE3EB;
		padding: 66px 33px;
		background: #FFF;
		text-align: center;
		&__icon{
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #D1DBE6;
			border-radius: 50%;
			width: 66px;
			height: 66px;
		}
		&__title{
			font-weight: 500;
			font-size: 18px;
			color: #374A5E;
			padding: 7px 14px;
			margin: 0;
		}
		&__slotted{
			font-size: 15px;
			color: #33475B;
		}
	}
</style>
