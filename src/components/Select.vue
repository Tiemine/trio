<template>
  <div class="select">
	<div class="select__combo-wrap">
	<button 
		class="select__button"
		v-bind:class="{'select__button--opened': activeCombobox}"
		id="contacts" 
		role="combobox" 
		aria-controls="contacts" 
		aria-autocomplete="list" 
		aria-expanded="false"
		@click="activeCombobox = !activeCombobox"
		>
		Select contacts
	</button>
	<span aria-hidden="true" data-trigger="multiselect"></span>
	<ul
		class="select__listbox"
		v-bind:class="{'select__listbox--opened': activeCombobox}"
		id="contacts" 
		role="listbox" 
		aria-label="Select contacts to sync">
		<li class="select__list-item" 
		role="option" 
		data-opt="opt1">All contacts</li>
		<li 
		class="active select__list-item" 
		v-for="opt in options" 
		v-bind:key="opt">
			{{ opt }}
		</li>
	</ul>
	</div>
	</div>
</template>
<script>
export default {
  name: 'Select',
  props: {
		options: {
			type: Array,
			default: () => ['opt 1', 'opt 2', 'opt 3']
		}
	},
	data() {
		return {
			activeCombobox: false
		}
	},
	beforeMount() {
		console.log(this.activeCombobox)
	},
	mounted() {
		console.log(this.activeCombobox)
	}
}
</script>
<style scoped lang="scss">
	.select{
		margin-top: 24px;
		position: relative;
		&__combo-wrap{
			border: 1px solid #CBD6E2;
			background-color: #F5F8FA;
		}
		&__listbox{
			list-style-type: none;
			padding: 0;
			margin: 0;
			border: 0;
			max-height: 0;
			overflow: hidden;
			-webkit-transition: max-height 0.5s; 
			-moz-transition: max-height 0.5s; 
			-o-transition: max-height 0.5s; 
			transition: max-height 0.5s;  
			&--opened{
				overflow-y: scroll;
				max-height: 110px;
				margin: 0 5px 5px 0;
				&::-webkit-scrollbar {
					width: 3px;
				}
				&::-webkit-scrollbar-thumb {
					border-radius: 100px;
					border-left: 0;
					border-right: 0;
					background-color: #CBD6E2;
				}
			}
		}
		&__list-item,
		&__button{
			font-size: 16px;
			font-weight: 400;
			color: #33475B;
			font-family: 'Noto Sans', sans-serif;
			&:hover{
				cursor: pointer;
			}
		}
		&__list-item{
			padding: 6px 0;
			text-align: left;
			margin-left: 40px;
			position: relative;
			&::before{
				content: '';
				position: absolute;
				top: 10px;
				left: -25px;
				width: 14px;
				height: 14px;
				border: 1px solid #7C99B6;
				border-radius: 3px;

			}
		}
		&__label{
			width: 100%;
			position: absolute;
			left: -12px;
			top: 12px;
		}
		&__button{
			height: 40px;
			width: 216px;
			font-size: 16px;
			background-color: #F5F8FA;
			text-align: left;
			padding-left: 40px;
			border: 0;
			position: relative;
			&:active,
			&:focus{
				outline: transparent;
			}
			&:after{
				content: '';
				position: absolute;
				height: 10px;
				width: 14px;
				top: 15px;
				right: 15px;
				transform: rotate(0deg);
				transition: 0.4s;
				background-image: url('../assets/inputArrow.png');
				background-repeat: no-repeat;
			}
			&--opened{
				border-bottom: 0;
			&:after{
				transform: rotate(180deg);
				transition: 0.4s;
				}
			}
		}
	}
</style>
