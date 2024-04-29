<template>
	<div
		class="row justify-center items-center"
		@click="itemOnClick"
		:class="
			index !== -1
				? selectedIndex === index
					? 'tab-item-root-selected'
					: 'tab-item-root'
				: selected
					? 'tab-item-root-selected'
					: 'tab-item-root'
		"
	>
		<q-icon style="margin-right: 10px" v-if="name" :name="name" size="20px" />
		<div class="tab-item-title">{{ title }}</div>
		<div class="tab-item-bottom" />
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const prop = defineProps({
	selected: {
		type: Boolean,
		default: false
	},
	selectedIndex: {
		type: Number,
		default: -1
	},
	index: {
		type: Number,
		default: -1
	},
	title: {
		type: String,
		default: '',
		require: false
	},
	name: {
		type: String,
		default: '',
		require: false
	}
});

const emit = defineEmits(['update:selectedIndex']);

const itemOnClick = () => {
	emit('update:selectedIndex', prop.index);
};
</script>

<style scoped lang="scss">
.tab-item-root {
	height: 56px;
	width: 94px;
	background-color: white;
	color: var(--grey-08, #5c5551);
	cursor: pointer;
	text-decoration: none;
	position: relative;

	&:hover {
		color: var(--light-green-06, #2ee58a);
	}

	&:active {
		color: var(--light-green-06, #2ee58a);
	}

	.material-symbols-rounded {
		font-variation-settings:
			'FILL' 0,
			'wght' 300,
			'GRAD' 0,
			'opsz' 24;
	}

	.tab-item-bottom {
		height: 2px;
		width: 100%;
		position: absolute;
		bottom: 0;
		background: white;
	}
}

.tab-item-root-selected {
	height: 56px;
	width: 94px;
	background-color: #ffffff;
	color: var(--light-green-06, #2ee58a);
	cursor: pointer;
	text-decoration: none;
	position: relative;

	&:active {
		color: var(--light-green-06, #2ee58a);
	}

	.material-symbols-rounded {
		font-variation-settings:
			'FILL' 1,
			'wght' 300,
			'GRAD' 0,
			'opsz' 24;
	}

	.tab-item-bottom {
		height: 2px;
		width: 100%;
		position: absolute;
		bottom: 0;
		background: var(
			--profile,
			linear-gradient(90deg, #8ce3ff -2.75%, #7fff93 102.75%)
		);
	}
}

.tab-item-title {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-family: Roboto;
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: 0em;
	text-align: left;
}
</style>
