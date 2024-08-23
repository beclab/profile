<template>
	<div class="column">
		<div class="block-edit-board row justify-start items-center">
			<q-img :src="`block/${type}.svg`" class="block-type q-ma-xs" />
			<div class="nick-edit-area row justify-start items-center">
				<q-input
					borderless
					type="text"
					class="username-input"
					@blur="isEdit = false"
					@focus="isEdit = true"
					input-class="platform-name"
					:model-value="text"
					@keyup.enter="onTextUpdate"
					@update:model-value="onTextUpdate"
				/>
			</div>
			<q-icon
				color="ink-2 q-ma-sm cursor-pointer"
				size="24px"
				name="sym_r_delete"
				@click="emit('update:text', '')"
			/>
		</div>
		<q-separator class="full-width q-mt-lg" color="separator" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
defineProps({
	type: {
		type: String,
		require: true
	},
	text: {
		type: String,
		require: true
	}
});

const isEdit = ref(false);

const emit = defineEmits(['update:text']);

const onTextUpdate = (value: string) => {
	emit('update:text', value);
};
</script>

<style scoped lang="scss">
.block-edit-board {
	width: 100%;
	height: 40px;
	background: $background-1;

	.block-type {
		width: 32px;
		height: 32px;
	}

	.nick-edit-area {
		height: 100%;
		border-radius: 8px;
		border: 1px solid $separator;
		width: calc(100% - 80px);

		.username-input {
			height: 100%;
			margin-top: 5px;
			margin-left: 8px;
			width: calc(100% - 20px);
		}
	}
}
</style>
