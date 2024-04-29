<template>
	<bio-edit-container>
		<bio-picker-group v-model:active-index="selectedTab">
			<bio-button width="126" :label="t('design.layout')" icon="sym_r_browse" />
			<bio-button
				width="125"
				:label="t('design.backdrop')"
				icon="sym_r_vr180_create2d"
			/>
			<bio-button
				width="125"
				:label="t('design.colors')"
				icon="sym_r_palette"
			/>
		</bio-picker-group>
		<div v-if="selectedTab === 0 && userStore.user" class="row">
			<bio-picker-group v-model:active-index="userStore.user.layoutStyle">
				<background-picker>
					<bio-layout-component1 :use-em="true" :user="userStore.user" />
				</background-picker>
			</bio-picker-group>
		</div>
		<div v-if="selectedTab === 1 && userStore.user" class="row">
			<bio-picker-group v-model:active-index="userStore.user.background.style">
				<background-picker icon="sym_r_vr180_create2d_off" />
				<background-picker
					icon="sym_r_imagesmode"
					:label="t('design.upload_image')"
				>
					<BtUploader
						height="232"
						width="116"
						:size="5"
						fileName="image"
						accept="image/*"
						action="/images/upload/v1"
						@ok="ok"
						@fail="fail"
					>
						<q-img
							v-if="userStore.user.background.uploadImg"
							fit="cover"
							class="background-image"
							:src="userStore.user.background.uploadImg"
						/>
					</BtUploader>
				</background-picker>
				<background-picker
					icon="sym_r_colors"
					:label="t('design.choose_the_color')"
					@onIconClick="colorPicker = true"
					@onLabelClick="colorPicker = true"
				>
					<div
						class="color-background column"
						:style="{ background: userStore.user.background.color }"
					>
						<q-popup-proxy
							transition-show="scale"
							transition-hide="scale"
							v-model="colorPicker"
						>
							<q-color
								v-model="userStore.user.background.color"
								no-header
								no-footer
								default-view="palette"
							/>
						</q-popup-proxy>
					</div>
				</background-picker>
				<background-picker
					icon="sym_r_opacity"
					:label="t('design.set_gradient')"
					@onIconClick="gradientTopPicker = true"
					@onLabelClick="gradientBottomPicker = true"
				>
					<div class="gradient-background column">
						<div
							class="gradient-half-top"
							:style="{
								background: userStore.user.background.gradientTopColor
							}"
						>
							<q-popup-proxy
								transition-show="scale"
								transition-hide="scale"
								v-model="gradientTopPicker"
							>
								<q-color
									v-model="userStore.user.background.gradientTopColor"
									no-header
									no-footer
									@update:model-value="selectedColorUpdate"
									default-view="palette"
								/>
							</q-popup-proxy>
						</div>
						<div
							class="gradient-half-bottom"
							:style="{
								background: userStore.user.background.gradientBottomColor
							}"
						>
							<q-popup-proxy
								transition-show="scale"
								transition-hide="scale"
								v-model="gradientBottomPicker"
							>
								<q-color
									v-model="userStore.user.background.gradientBottomColor"
									no-header
									no-footer
									@update:model-value="selectedColorUpdate"
									default-view="palette"
								/>
							</q-popup-proxy>
						</div>
					</div>
				</background-picker>
				<background-picker
					@on-selected="imgPickerUpdate('design_background_first.png')"
				>
					<q-img
						fit="cover"
						class="background-image"
						src="background/design_background_first.png"
					/>
				</background-picker>
				<background-picker
					@on-selected="imgPickerUpdate('design_background_second.png')"
				>
					<q-img
						fit="cover"
						class="background-image"
						src="background/design_background_second.png"
					/>
				</background-picker>
			</bio-picker-group>
		</div>
		<div
			v-if="selectedTab === 2 && userStore.user"
			class="column"
			style="margin-top: 8px"
		>
			<color-picker-container :title="t('base.name')">
				<color-picker v-model:hex-color="userStore.user.appearance.nameColor" />
			</color-picker-container>
			<color-picker-container :title="t('profile.bio')">
				<color-picker v-model:hex-color="userStore.user.appearance.bioColor" />
			</color-picker-container>
			<color-picker-container :title="t('base.social')">
				<color-picker
					v-model:hex-color="userStore.user.appearance.socialColor"
				/>
			</color-picker-container>
			<color-picker-container :title="t('base.blocks')">
				<color-picker
					:title="t('design.border')"
					v-model:hex-color="userStore.user.appearance.buttonBorderColor"
				/>
				<color-picker
					:title="t('design.block')"
					v-model:hex-color="userStore.user.appearance.buttonColor"
				/>
				<color-picker
					:title="t('design.text')"
					v-model:hex-color="userStore.user.appearance.buttonFontColor"
				/>
			</color-picker-container>
		</div>
	</bio-edit-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BioButton from 'components/base/BioButton.vue';
import BioEditContainer from 'components/edit/BioEditContainer.vue';
import ColorPickerContainer from 'components/design/ColorPickerContainer.vue';
import ColorPicker from 'components/design/ColorPicker.vue';
import BioPickerGroup from 'components/base/BioPickerGroup.vue';
import BackgroundPicker from 'components/design/BackgroundPicker.vue';
import BioLayoutComponent1 from 'components/layout/BioLayoutComponent1.vue';

import { useUserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
const userStore = useUserStore();
const { t } = useI18n();
const selectedTab = ref(0);
const colorPicker = ref(false);
const gradientTopPicker = ref(false);
const gradientBottomPicker = ref(false);
const selectedColorUpdate = () => {
	if (!userStore.user) {
		return;
	}
	const gradientColor = `linear-gradient(180deg, ${userStore.user.background.gradientTopColor} 0%, ${userStore.user.background.gradientBottomColor} 100%)`;

	if (userStore.user) {
		userStore.user.background.gradientColor = gradientColor;
	}
};

const imgPickerUpdate = (imgName: string) => {
	if (userStore.user) {
		userStore.user.background.localImg = imgName;
	}
};

const ok = (response: { success: string; path: string }) => {
	if (userStore.user) {
		userStore.user.background.uploadImg = response.path;
	}
};

const fail = (response: unknown) => {
	console.log('fail', response);
};
</script>
<style lang="scss">
.color-background {
	width: 100%;
	height: 100%;
	border-radius: 12px;
}

.gradient-background {
	width: 100%;
	height: 100%;

	.gradient-half-top {
		width: 100%;
		height: 50%;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}

	.gradient-half-bottom {
		width: 100%;
		height: 50%;
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
	}
}

.background-image {
	border-radius: 12px;
	height: 232px;
	width: 116px;
}
</style>
