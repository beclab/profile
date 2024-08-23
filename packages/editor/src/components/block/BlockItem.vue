<template>
	<div class="block-item row justify-between items-center q-pa-sm q-mt-lg">
		<div class="row justify-start items-center">
			<q-icon color="ink-2" size="20px" name="sym_r_drag_indicator" />
			<q-img :src="`block/${block.type}.svg`" class="block-type q-ml-md" />
			<div class="text-body1 text-ink-1 q-ml-md">{{ block.nickName }}</div>
		</div>
		<div class="row justify-end items-center">
			<q-toggle
				size="xs"
				:model-value="block.enabled"
				@update:model-value="updateModelValue"
				color="light-green-default"
			/>
			<q-icon color="ink-2" size="20px" name="sym_r_more_horiz" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Block } from 'src/types/User';
import { useUserStore } from 'src/stores/user';

const props = defineProps({
	block: {
		type: Object as PropType<Block>,
		required: true
	}
});
const userStore = useUserStore();

// const onDeleteClick = () => {
// 	if (userStore.user) {
// 		userStore.user.social.data = userStore.user.social.data.filter(
// 			(item) => item.platform !== props.platform
// 		);
// 	}
// };

const updateModelValue = (status: boolean) => {
	if (userStore.user) {
		const block = userStore.user.block.data.find(
			(item) => item.id === props.block.id
		);
		if (block) {
			block.enabled = status;
		}
	}
};
</script>

<style scoped lang="scss">
.block-item {
	width: 100%;
	height: auto;
	border-radius: 8px;
	border: 1px solid $input-stroke;

	.block-type {
		width: 24px;
		height: 24px;
	}
}
</style>
