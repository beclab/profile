<template>
	<div
		ref="buttonRef"
		class="row items-center"
		:class="selected ? 'bio-selected-button' : 'bio-button'"
		:style="{ '--width': `${width}px` }"
		@click="handleClick"
	>
		<slot />
		<q-icon
			v-if="icon"
			size="16px"
			:color="selected ? 'ink-on-brand-black' : 'ink-2'"
			:name="icon"
			class="q-mr-sm"
		/>
		<span
			:class="selected ? 'bio-selected-button__label' : 'bio-button__label'"
		>
			{{ label }}
		</span>
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, inject, onMounted, ref } from 'vue';

const props = defineProps({
	icon: {
		type: String
	},
	label: {
		type: String,
		required: true
	},
	width: {
		type: Number,
		required: false
	},
	defaultSelected: {
		type: Boolean,
		default: true
	}
});

const addChildComponent = inject('addChildComponent');
const handleItemClick = inject('handleItemClick');
const selected = ref(true);
const selfRef = ref(getCurrentInstance());

onMounted(() => {
	selected.value = props.defaultSelected;
});

const setSelected = (isSelected: boolean) => {
	selected.value = isSelected;
};

defineExpose({ setSelected });

const handleClick = () => {
	if (handleItemClick) {
		handleItemClick(selfRef);
	}
};

onMounted(() => {
	if (addChildComponent) {
		addChildComponent(selfRef);
	}
});
</script>

<style scoped lang="scss">
.bio-button {
	background: $background-1;
	border: 1px solid $btn-stroke;
	height: 32px;
	width: var(--width, 100%);
	padding-left: 12px;
	padding-right: 12px;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	cursor: pointer;
	text-decoration: none;

	&:hover {
		background: var(
			--profile,
			linear-gradient(90deg, #8ce3ff -2.75%, #7fff93 102.75%)
		);
	}

	&:active {
		background: var(
			--profile,
			linear-gradient(90deg, #8ce3ff -2.75%, #7fff93 102.75%)
		);
		filter: brightness(0.9);
		//transform: scale(0.98);
	}

	&__label {
		font-family: Roboto;
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0em;
		text-align: center;
		overflow: hidden;
		color: $ink-2;
		text-overflow: ellipsis;
	}
}

.bio-selected-button {
	background: var(
		--profile,
		linear-gradient(90deg, #8ce3ff -2.75%, #7fff93 102.75%)
	);
	height: 32px;
	width: var(--width, 100%);
	padding-left: 12px;
	padding-right: 12px;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	cursor: pointer;
	text-decoration: none;

	&:hover {
		background: var(
			--profile,
			linear-gradient(90deg, #8ce3ff -2.75%, #7fff93 102.75%)
		);
	}

	&:active {
		background: var(
			--profile,
			linear-gradient(90deg, #8ce3ff -2.75%, #7fff93 102.75%)
		);
		filter: brightness(0.9);
		//transform: scale(0.98);
	}

	&__label {
		font-family: Roboto;
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0em;
		text-align: center;
		overflow: hidden;
		color: $ink-on-brand-black;
		text-overflow: ellipsis;
	}
}
</style>
