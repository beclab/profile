<template>
	<div class="nft-background">
		<div v-if="userStore.cloud_login == CloudLoginState.YES">
			<div v-if="userStore.nfts?.length == 0">Please Bind NFT in Settings</div>
			<div v-else>
				<div class="default-avatar-grid row">
					<template v-for="item in userStore.nfts" :key="item">
						<bio-avatar-selector
							:src="item.imageUrl"
							:selected="modelValue.avatar === item.vp"
							@click="onItemClick(item)"
						/>
					</template>
				</div>
			</div>
		</div>
		<div v-else class="column justify-center items-center" style="height: 100%">
			<q-icon size="32px" name="sym_r_imagesmode" color="grey-5" />
			<div class="nft-image-title">
				You have not bound the blockchain address and cannot obtain the
				corresponding NFT image. Go to the settings to complete the binding and
				then come here to set the NFT avatar.
			</div>
			<div
				class="nft-bind-border row justify-center items-center cursor-pointer"
				@click="goBindCloude"
			>
				<q-icon size="16px" name="sym_r_add_photo_alternate" />
				<div class="nft-bind-label">Go to Binding</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { bus } from '../../utils/bus';
import { useUserStore, CloudLoginState } from '../../stores/user';
const userStore = useUserStore();
import BioAvatarSelector from 'components/base/BioAvatarSelector.vue';
const $q = useQuasar();

defineProps({
	modelValue: {
		type: Object,
		required: true
	}
});

const onItemClick = (nft: any) => {
	console.log(nft);
	bus.emit('choice', { imageUrl: nft.imageUrl, avatar: nft.vp });
};

const goBindCloude = () => {
	$q.notify('go bind');
};
</script>

<style scoped lang="scss">
.nft-background {
	width: 100%;
	height: 100%;

	.nft-image-title {
		width: 256px;
		font-family: Roboto;
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0em;
		text-align: center;
		color: var(--Grey-05, #adadad);
		margin-top: 8px;
	}

	.nft-bind-border {
		margin-top: 12px;
		border: 1px solid #2ee58a;
		padding: 8px 21px;
		border-radius: 8px;

		.nft-bind-label {
			margin-left: 8px;
			font-family: Roboto;
			font-size: 12px;
			font-weight: 400;
			line-height: 16px;
			letter-spacing: 0em;
			text-align: left;
			color: var(--Grey-10, #1f1814);
		}
	}
}
</style>
