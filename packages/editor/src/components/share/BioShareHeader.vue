<template>
	<div class="preview-share-container row items-center justify-between">
		<div class="preview-share-edit row justify-between">
			<div class="preview-share-url text-body3 text-ink-2">
				{{ url }}
			</div>
			<div class="row justify-end items-center">
				<q-icon
					name="sym_r_content_copy"
					color="ink-3"
					class="cursor-pointer"
					size="16px"
					@click="copyUrl"
				/>
				<q-icon
					name="sym_r_share_windows"
					color="ink-3"
					class="q-ml-xs cursor-pointer"
					size="16px"
					@click="open"
				/>
			</div>
		</div>
		<bio-button class="text-body3" :label="t('base.share')" icon="sym_r_share">
			<bio-share-popup :url="url" :name="name" />
		</bio-button>
	</div>
</template>

<script lang="ts" setup>
import BioButton from 'components/base/BioButton.vue';
import { watch, ref } from 'vue';
import { copyToClipboard } from 'quasar';
import BioSharePopup from 'components/share/BioSharePopup.vue';
import { useUserStore } from 'src/stores/user';
import { TerminusInfo } from '@bytetrade/core';
import { useI18n } from 'vue-i18n';
import { BtNotify, NotifyDefinedType } from '@bytetrade/ui';

const { t } = useI18n();
const url = ref();
const zone = ref<string>('');
const name = ref<string>('');
const userStore = useUserStore();

const copyUrl = () => {
	copyToClipboard(url.value)
		.then(() => {
			BtNotify.show({
				type: NotifyDefinedType.SUCCESS,
				message: 'Copied URL to clipboard'
			});
		})
		.catch((e) => {
			BtNotify.show({
				type: NotifyDefinedType.FAILED,
				message: 'Copied failure ' + e.message
			});
		});
};

const open = () => {
	window.open(url.value);
};

watch(
	() => userStore.info,
	(value: TerminusInfo | null) => {
		console.log(value);

		if (value) {
			zone.value = value.terminusName
				? value?.terminusName?.replace('@', '.')
				: '';
			name.value = value.terminusName ? value?.terminusName?.split('@')[0] : '';
			url.value = `https://${zone.value}`;
		}
	},
	{
		immediate: true
	}
);
</script>
<style lang="scss">
.preview-share-container {
	height: 56px;
	width: 100%;
	padding-left: 20px;
	padding-right: 20px;

	.preview-share-edit {
		width: calc(100% - 100px);
		min-width: 200px;
		height: 32px;
		border-radius: 8px;
		border: 1px solid $input-stroke;
		overflow: hidden;
		padding: 6px 8px 6px 12px;

		.preview-share-url {
			width: calc(100% - 36px);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
