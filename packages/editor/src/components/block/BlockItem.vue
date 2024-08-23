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
				@update:model-value="updateEnabled"
				color="light-green-default"
			/>
			<q-icon color="ink-2" size="20px" name="sym_r_more_horiz">
				<base-popup self="top right">
					<block-opt-item
						v-close-popup
						icon="sym_r_edit_square"
						:label="t('blocks.edit')"
						@click="edit"
					/>
					<block-opt-item
						v-close-popup
						icon="sym_r_content_copy"
						:label="t('blocks.copy')"
						@click="copy"
					/>
					<block-opt-item
						v-close-popup
						icon="sym_r_article_shortcut"
						:label="t('blocks.rename')"
					/>
					<block-opt-item
						v-close-popup
						icon="sym_r_delete"
						:label="t('blocks.delete')"
						@click="remove"
					/>
				</base-popup>
			</q-icon>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Block } from 'src/types/User';
import { useUserStore } from 'src/stores/user';
import BasePopup from 'src/components/base/BasePopup.vue';
import BlockOptItem from 'src/components/block/BlockOptItem.vue';
import { copyToClipboard, Notify } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const props = defineProps({
	block: {
		type: Object as PropType<Block>,
		required: true
	}
});
const userStore = useUserStore();
const { t } = useI18n();
const router = useRouter();

const updateEnabled = (status: boolean) => {
	if (userStore.user) {
		const block = userStore.user.block.data.find(
			(item) => item.id === props.block.id
		);
		if (block) {
			block.enabled = status;
		}
	}
};

const edit = () => {
	if (userStore.user) {
		const block = userStore.user.block.data.find(
			(item) => item.id === props.block.id
		);
		if (block) {
			router.push({
				name: 'blockEditor',
				params: {
					id: block.id
				}
			});
		}
	}
};

const copy = () => {
	if (userStore.user) {
		const block = userStore.user.block.data.find(
			(item) => item.id === props.block.id
		);
		if (block) {
			copyToClipboard(block.nickName)
				.then(() => {
					Notify.create(t('base.copy_success'));
				})
				.catch((e) => {
					Notify.create(e.message);
				});
		}
	}
};

const remove = () => {
	if (userStore.user) {
		const blocks = userStore.user.block.data.filter(
			(item) => item.id !== props.block.id
		);
		userStore.user.block.data = blocks;
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
