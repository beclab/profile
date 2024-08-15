<template>
	<div class="title-component">
		<div class="primary-title">
			<div class="text-h5 text-ink-1 q-mt-xl">{{ primaryTitle }}</div>
			<div v-if="primaryDescription" class="text-body2 text-ink-3 q-mt-xs">
				{{ primaryDescription }}
			</div>
			<div v-if="primarySlot" class="q-mt-md">
				<slot name="primary" />
			</div>
		</div>
		<div
			v-for="(secondaryTitle, index) in secondaryTitles"
			:key="index"
			class="q-mt-lg"
		>
			<div v-if="secondaryTitle" class="text-subtitle1 text-ink-1">
				{{ secondaryTitle }}
			</div>
			<div
				v-if="secondaryDescription[index]"
				class="text-body2 text-ink-3 q-mt-xs"
			>
				{{ secondaryDescription[index] }}
			</div>
			<div :class="secondaryTitle ? 'q-mt-sm' : ''">
				<slot :name="'secondary-' + index" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

defineProps({
	primaryTitle: {
		type: String,
		required: true
	},
	primaryDescription: {
		type: String,
		default: ''
	},
	secondaryTitles: {
		type: Array,
		default: () => []
	},
	secondaryDescription: {
		type: Array,
		default: () => []
	}
});

const primarySlot = useSlots().primary;
</script>

<style lang="scss" scoped></style>
