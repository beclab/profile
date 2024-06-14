<template>
	<q-dialog ref="dialogRef">
		<q-card class="avatar-choose-dialog">
			<div class="avatar-choose-header row justify-between items-center">
				<div class="avatar-choose-title">Avatar setting</div>
				<q-icon
					size="16px"
					name="sym_r_clear"
					color="ink-3"
					@click="onDialogCancel"
				/>
			</div>
			<div class="row justify-center">
				<div class="avatar-choose-view">
					<q-card-section style="padding: 0">
						<q-tabs
							v-model="tab"
							dense
							outside-arrows
							indicator-color="transparent"
							class="text-grey"
							align="justify"
							narrow-indicator
						>
							<div class="tab-title-background row items-center">
								<q-tab style="padding: 0" name="default">
									<template v-slot:default>
										<bt-tab-item
											:selected="tab === 'default'"
											label="Robot avatar"
										/>
									</template>
								</q-tab>

								<div class="tab-title-line" />

								<q-tab style="padding: 0" name="nft">
									<template v-slot:default>
										<bt-tab-item :selected="tab === 'nft'" label="NFT avatar" />
									</template>
								</q-tab>

								<div class="tab-title-line" />

								<q-tab style="padding: 0" name="upload">
									<template v-slot:default>
										<bt-tab-item
											:selected="tab === 'upload'"
											label="Custom avatar"
										/>
									</template>
								</q-tab>
							</div>
						</q-tabs>

						<q-tab-panels
							v-model="tab"
							animated
							style="width: 100%; height: 315px"
							keep-alive
						>
							<q-tab-panel name="default" style="width: 100%; height: 100%">
								<default-avatar v-model="selected" />
							</q-tab-panel>

							<q-tab-panel name="upload">
								<UploadAvatar v-model="selected" />
							</q-tab-panel>

							<q-tab-panel name="nft">
								<NFTAvatar v-model="selected" />
							</q-tab-panel>
						</q-tab-panels>
					</q-card-section>
				</div>
				<div class="avatar-crop-view row justify-center items-center">
					<ProfileAvatarBoard size="184px" :show-border="tab === 'nft'">
						<q-img class="avatar-preview" :src="selected.imageUrl" />
					</ProfileAvatarBoard>
				</div>
			</div>

			<div class="row justify-end items-center" style="margin-top: 32px">
				<bio-button
					:default-selected="false"
					:width="75"
					label="Cancel"
					@click="onDialogCancel"
					style="margin-right: 20px"
				/>
				<bio-button
					:width="75"
					label="Create"
					@click="onOKClick"
					style="margin-right: 20px"
				/>
			</div>
		</q-card>
	</q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';
import { ref, onMounted, onUnmounted } from 'vue';
import DefaultAvatar from './DefaultAvatar.vue';
import UploadAvatar from './UploadAvatar.vue';
import NFTAvatar from './NFTAvatar.vue';
import BioButton from 'components/base/BioButton.vue';
import { bus } from 'src/utils/bus';
import { useUserStore } from 'src/stores/user';
import { Encoder } from '@bytetrade/core';
import ProfileAvatarBoard from './ProfileAvatarBoard.vue';
import BtTabItem from '../base/BtTabItem.vue';

const userStore = useUserStore();
const selected = ref();
const tab = ref<string>('default');

const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent();

async function onOKClick() {
	if (selected.value.avatar != userStore.info.avatar) {
		userStore.info.avatar = selected.value.avatar;
	}
	onDialogOK(selected.value.avatar);
}

onMounted(async () => {
	bus.on('choice', (data: any) => {
		console.log(data);
		selected.value = data;
	});

	console.log(userStore.user?.avatarUrl);
	if (!userStore.user?.avatarUrl) {
		return;
	}

	if (userStore.user?.avatarUrl?.startsWith('http')) {
		selected.value = {
			imageUrl: userStore.user?.avatarUrl,
			avatar: userStore.user?.avatarUrl
		};
	} else {
		// const re = new RegExp('^[1-3][0-9]\\.png');
		// const re2 = new RegExp('^[0-9]\\.png');
		const re = new RegExp('^[1-3]?[0-9]\\.png');
		if (re.test(userStore.user?.avatarUrl)) {
			console.log('re true');
			selected.value = {
				imageUrl: userStore.user?.avatarUrl,
				avatar: userStore.user?.avatarUrl
			};
		} else {
			console.log('re false');
			try {
				const vp = JSON.parse(userStore.user?.avatarUrl);
				if (vp) {
					const vcstr = Encoder.bytesToString(
						Encoder.base64UrlToBytes(vp.verifiableCredential![0].split('.')[1])
					);
					console.log(vcstr);
					const vc = JSON.parse(vcstr);
					console.log(vc);
					console.log(vc.vc.credentialSubject.image);
					let imageUrl = vc.vc.credentialSubject.image;
					if (imageUrl.startsWith('ipfs://')) {
						imageUrl = imageUrl.replace(
							'ipfs://',
							'https://gateway.ipfs.io/ipfs/'
						);
					}

					console.log(imageUrl);
					selected.value = {
						imageUrl: imageUrl,
						avatar: userStore.user?.avatarUrl
					};
				}
			} catch (e) {
				console.log(e);
				selected.value = {
					imageUrl: userStore.user?.avatarUrl,
					avatar: userStore.user?.avatarUrl
				};
			}
		}
	}
	console.log(selected.value);
});

onUnmounted(() => {
	bus.off('choice');
});
</script>
<style lang="scss">
.avatar-choose-dialog {
	max-width: 800px;
	width: 800px;
	height: 500px;
	max-height: 500px;
	background: $background-1;
	padding: 0;
	position: relative;

	.avatar-choose-header {
		width: 100%;
		height: 32px;
		background: $background-3;
		padding-left: 12px;
		padding-right: 12px;

		.avatar-choose-title {
			font-family: Roboto;
			font-size: 12px;
			font-weight: 500;
			line-height: 16px;
			letter-spacing: 0;
			text-align: left;
			color: $ink-1;
		}
	}

	.avatar-choose-view {
		margin-top: 20px;
		border-radius: 8px;
		border: 1px solid $separator-2;
		height: 364px;
		width: 374px;
		margin-right: 6px;

		.tab-title-background {
			background: $background-3;
			margin-top: 16px;
			margin-left: 16px;
			border-radius: 4px;
			padding: 1px;
		}

		.tab-title-line {
			width: 1px;
			height: 14px;
			border-radius: 0.5px;
			background-color: $ink-3;
		}
	}

	.avatar-crop-view {
		margin-top: 20px;
		border-radius: 8px;
		border: 1px solid $separator-2;
		height: 364px;
		width: 374px;
		margin-left: 6px;
		background: $background-3;

		.avatar-preview {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.loading-view {
		width: 100%;
		height: 100%;
		position: absolute;
	}
}

.q-dialog__inner--minimized > div {
	max-width: 800px;
}
</style>
