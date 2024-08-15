<template>
	<div
		class="bt-checkbox row justify-start items-center cursor-pointer q-mt-md"
		@click="emit('update:modelValue', !modelValue)"
	>
		<q-img
			class="bt-checkbox__img"
			:src="modelValue ? 'imgs/check_box.svg' : 'imgs/uncheck_box.svg'"
		/>
		<div
			v-if="label"
			class="bt-checkbox__label text-subtitle2 text-ink-1 q-ml-sm"
		>
			{{ label }}
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	label: {
		type: String,
		required: false
	}
});
const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.bt-checkbox {
	height: 20px;

	&__img {
		width: 20px;
		height: 20px;
	}

	&__label {
		max-width: 170px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
