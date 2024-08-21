<template>
	<div class="color-picker row justify-between items-center q-mt-md">
		<div class="text-body1 text-ink-3">{{ label }}</div>
		<div class="row justify-end">
			<div class="color-picker-input-background">
				<q-input
					borderless
					type="text"
					input-class="color-input"
					class="color-input"
					:model-value="modelValue"
					@update:model-value="inputColorUpdate"
				/>
			</div>
		</div>
		<div class="color-picker-selected" :style="{ background: modelValue }">
			<q-popup-proxy cover transition-show="scale" transition-hide="scale">
				<q-color
					v-model="selectedColor"
					no-header
					no-footer
					@update:model-value="selectedColorUpdate"
					default-view="palette"
				/>
			</q-popup-proxy>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { colors } from 'quasar';
import { colorsRgba } from 'quasar/dist/types/utils/colors';
import hexToRgb = colors.hexToRgb;
import rgbToHex = colors.rgbToHex;

const props = defineProps({
	label: {
		type: String,
		require: true
	},
	modelValue: {
		type: String,
		require: true
	}
});

const selectedColor = ref();
const opacityEdit = ref();
const opacityNumber = ref(100);
const emit = defineEmits(['update:hexColor']);

const selectedColorUpdate = () => {
	const rgba: colorsRgba = hexToRgb(selectedColor.value);
	rgba.a = opacityNumber.value;
	const hex = rgbToHex(rgba);
	emit('update:hexColor', hex);
};

const inputColorUpdate = (value: string) => {
	try {
		const rgba: colorsRgba = hexToRgb(value);
		console.log(rgba);
		opacityEdit.value.setHexColor(value);
		emit('update:hexColor', value);
	} catch (e) {
		console.log(e);
	}
};

onMounted(() => {
	selectedColor.value = props.modelValue;
});
</script>

<style scoped lang="scss">
.color-picker {
	width: 100%;
	height: auto;

	.color-picker-selected {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1px solid $separator;
	}

	.color-picker-input-background {
		width: 100px;
		height: 100%;
		border-radius: 8px;
		border: 1px solid $input-stroke;
		margin-left: 8px;
		margin-right: 8px;
		padding-bottom: -20px;
		position: relative;

		.color-input {
			margin-top: -13px;
			padding-left: 10px;
			padding-right: 10px;
			position: absolute;
			color: $ink-2 !important;
		}
	}
}
</style>
