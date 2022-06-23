<template>
  <div class="sync-button">
		<button class="sync-button__cta" @click="$emit('syncButtonClicked')"></button>
		<span class="sync-button__text">Sync</span>
  </div>
</template>
<script>
export default {
  name: 'SyncButton',
	props: {
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
