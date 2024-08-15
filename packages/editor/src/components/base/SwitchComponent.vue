<template>
	<div class="row full-width justify-between items-center">
		<div class="text-subtitle1 text-ink-1">{{ label }}</div>
		<q-toggle
			:model-value="modelValue"
			@update:model-value="updateModelValue"
			color="light-green-default"
		/>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	label: {
		type: String,
		require: true
	},
	modelValue: {
		type: Number,
		require: true
	}
});
const emit = defineEmits(['update:modelValue']);
const updateModelValue = (data: string) => {
	emit('update:modelValue', data);
};
</script>

<style scoped lang="scss"></style>
