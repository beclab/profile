<template>
	<bio-edit-container v-if="userStore.user">
		<structured-title
			:primary-title="t('appearance.theme')"
			:secondary-items="themeSecondaryItems"
		>
			<template v-slot:primary>
				<grid-picker-group v-model="userStore.user.appearance.theme.style">
					<picker-component :value="THEME_TYPE.SOLID">
						<template v-slot:default="{ color, selected }">
							<div
								:style="{ color: selected ? color : link1.color.value }"
								class="row q-py-md"
							>
								<q-icon name="sym_r_palette" size="20px" />
								<div class="q-ml-sm text-subtitle2">
									{{ t('appearance.solid') }}
								</div>
							</div>
						</template>
					</picker-component>

					<picker-component :value="THEME_TYPE.GRADIENT">
						<template v-slot:default="{ color, selected }">
							<div
								:style="{ color: selected ? color : link1.color.value }"
								class="row q-py-md"
							>
								<q-icon name="sym_r_gradient" size="20px" />
								<div class="q-ml-sm text-subtitle2">
									{{ t('appearance.gradient') }}
								</div>
							</div>
						</template>
					</picker-component>

					<picker-component :value="THEME_TYPE.IMAGE">
						<template v-slot:default="{ color, selected }">
							<div
								:style="{ color: selected ? color : link1.color.value }"
								class="row q-py-md"
							>
								<q-icon name="sym_r_imagesmode" size="20px" />
								<div class="q-ml-sm text-subtitle2">
									{{ t('base.image') }}
								</div>
							</div>
						</template>
					</picker-component>
				</grid-picker-group>
				<bio-button
					v-if="userStore.user.appearance.theme.style === THEME_TYPE.IMAGE"
					class="q-mt-lg text-body1"
					size="24px"
					:label="t('appearance.upload_an_image')"
					icon="sym_r_add"
				/>
			</template>

			<template v-slot:secondary-0>
				<grid-picker-group
					column-gap="28px"
					v-model="userStore.user.appearance.theme.filter"
				>
					<picker-component
						width="120px"
						height="216px"
						:value="IMAGE_FILTER.NONE"
						:label="t('base.none')"
						:border="true"
					>
						<template v-slot:default>
							<background-preset-component
								:use-em="true"
								:font-size="5.12"
								:theme="userStore.user.appearance.theme"
							/>
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
					<picker-component
						width="120px"
						height="216px"
						:value="IMAGE_FILTER.DARK"
						:label="t('appearance.dark')"
						:border="true"
					>
						<template v-slot:default>
							<background-preset-component
								:use-em="true"
								:font-size="5.12"
								:theme="userStore.user.appearance.theme"
							/>
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
					<picker-component
						width="120px"
						height="216px"
						:label="t('appearance.light')"
						:value="IMAGE_FILTER.Light"
						:border="true"
					>
						<template v-slot:default>
							<background-preset-component
								:use-em="true"
								:font-size="5.12"
								:theme="userStore.user.appearance.theme"
							/>
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
				</grid-picker-group>
			</template>

			<template v-slot:secondary-1>
				<grid-picker-group
					:columns="4"
					column-gap="12px"
					row-gap="12px"
					v-if="userStore.user.appearance.theme.style === THEME_TYPE.SOLID"
					:model-value="userStore.user.appearance.theme.preset"
				>
					<template v-for="item in BACKGROUND_COLOR_PRESET" :key="item.preset">
						<picker-component
							width="92px"
							height="160px"
							:value="item.preset"
							@on-selected="onThemeSelected(item)"
							:border="true"
						>
							<template v-slot:default>
								<background-preset-component
									:use-em="true"
									:font-size="5.12"
									:theme="item"
								/>
							</template>
						</picker-component>
					</template>
				</grid-picker-group>

				<grid-picker-group
					:columns="4"
					column-gap="12px"
					row-gap="12px"
					v-if="userStore.user.appearance.theme.style === THEME_TYPE.GRADIENT"
					:model-value="userStore.user.appearance.theme.preset"
				>
					<template
						v-for="item in BACKGROUND_GRADIENT_PRESET"
						:key="item.preset"
					>
						<picker-component
							width="92px"
							height="160px"
							:value="item.preset"
							@on-selected="onThemeSelected(item)"
							:border="true"
						>
							<template v-slot:default>
								<background-preset-component
									:use-em="true"
									:font-size="5.12"
									:theme="item"
								/>
							</template>
						</picker-component>
					</template>
				</grid-picker-group>
			</template>

			<template v-slot:secondary-2>
				<div class="full-width column">
					<color-picker-v2
						v-if="userStore.user.appearance.theme.style === THEME_TYPE.SOLID"
						:label="t('appearance.background')"
						v-model="userStore.user.appearance.theme.background"
					/>
					<color-picker-v2
						v-if="userStore.user.appearance.theme.style === THEME_TYPE.GRADIENT"
						:label="t('appearance.background_color_1')"
						v-model="userStore.user.appearance.theme.gradientTopColor"
					/>
					<color-picker-v2
						v-if="userStore.user.appearance.theme.style === THEME_TYPE.GRADIENT"
						:label="t('appearance.background_color_2')"
						v-model="userStore.user.appearance.theme.gradientBottomColor"
					/>
					<color-picker-v2
						:label="t('appearance.header_text_icons')"
						v-model="userStore.user.appearance.theme.header.textColor"
					/>
				</div>
			</template>

			<template v-slot:secondary-3>
				<div class="full-width column">
					<color-picker-v2
						:label="t('appearance.background')"
						v-model="userStore.user.appearance.theme.link.background"
					/>
					<color-picker-v2
						:label="t('appearance.text')"
						v-model="userStore.user.appearance.theme.link.textColor"
					/>
				</div>
			</template>
			<template v-slot:secondary-4>
				<div class="full-width column">
					<color-picker-v2
						:label="t('appearance.background')"
						v-model="userStore.user.appearance.theme.block.background"
					/>
					<color-picker-v2
						:label="t('appearance.text')"
						v-model="userStore.user.appearance.theme.block.textColor"
					/>
				</div>
			</template>
		</structured-title>

		<structured-title :primary-title="t('appearance.block_style')">
			<template v-slot:primary>
				<grid-picker-group v-model="userStore.user.appearance.block.style">
					<picker-component
						:label="t('base.square')"
						:value="BLOCK_STYLE_TYPE.SQUARE"
					>
						<template v-slot:default="{ color }">
							<div :style="{ background: color }" class="shape_square" />
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
					<picker-component
						:label="t('base.round')"
						:value="BLOCK_STYLE_TYPE.ROUND"
					>
						<template v-slot:default="{ color }">
							<div :style="{ background: color }" class="shape_round" />
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
					<picker-component
						:label="t('base.custom')"
						:value="BLOCK_STYLE_TYPE.CUSTOM"
					>
						<template v-slot:default="{ color }">
							<div :style="{ background: color }" class="shape_square" />
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
				</grid-picker-group>

				<slider-component
					v-if="
						userStore.user.appearance.block.style === BLOCK_STYLE_TYPE.CUSTOM
					"
					:label="t('appearance.corner_radius')"
					v-model="userStore.user.appearance.block.cornerRadius"
					:min="4"
					:max="20"
					unit="px"
				/>

				<switch-component
					:label="t('appearance.block_shadow')"
					v-model="userStore.user.appearance.block.shadow"
				/>

				<switch-component
					:label="t('appearance.block_outline')"
					v-model="userStore.user.appearance.block.outline"
				/>

				<slider-component
					:label="t('appearance.block_transparency')"
					v-model="userStore.user.appearance.block.transparency"
					:min="0"
					:max="100"
					unit="%"
				/>
			</template>
		</structured-title>

		<structured-title :primary-title="t('appearance.font')">
			<template v-slot:primary>
				<grid-picker-group v-model="userStore.user.appearance.font">
					<template v-for="item in FONT_ARRAY" :key="item">
						<picker-component :value="item">
							<template v-slot:default="{ color, selected }">
								<div
									class="q-py-md text-font"
									:style="{
										color: selected ? color : link1.color.value,
										fontFamily: item
									}"
								>
									{{ item }}
								</div>
							</template>
						</picker-component>
					</template>
				</grid-picker-group>
			</template>
		</structured-title>
	</bio-edit-container>
</template>

<script lang="ts" setup>
import BackgroundPresetComponent from 'src/components/layout/BackgroundPresetComponent.vue';
import CheckBoxComponent from 'src/components/base/CheckBoxComponent.vue';
import BioEditContainer from 'src/components/edit/BioEditContainer.vue';
import StructuredTitle from 'src/components/base/StructuredTitle.vue';
import PickerComponent from 'src/components/base/PickerComponent.vue';
import GridPickerGroup from 'src/components/base/GridPickerGroup.vue';
import SwitchComponent from 'src/components/base/SwitchComponent.vue';
import SliderComponent from 'src/components/base/SliderComponent.vue';
import ColorPickerV2 from 'src/components/design/ColorPickerV2.vue';
import BioButton from 'src/components/base/BioButton.vue';
import {
	THEME_TYPE,
	BLOCK_STYLE_TYPE,
	IMAGE_FILTER,
	AppearanceTheme
} from 'src/types/User';
import {
	FONT_ARRAY,
	BACKGROUND_COLOR_PRESET,
	BACKGROUND_GRADIENT_PRESET
} from 'src/types/Preset';
import { computed } from 'vue';
import { useUserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
import { useColor } from '@bytetrade/ui';
import _ from 'lodash';

const userStore = useUserStore();
const { t } = useI18n();

const link1 = useColor('link-1');

const themeSecondaryItems = computed(() => {
	if (!userStore.user) {
		return [];
	}

	let backgroundTitle = '';

	switch (userStore.user.appearance.theme.style) {
		case THEME_TYPE.SOLID:
			backgroundTitle = t('appearance.solid_color_theme');
			break;
		case THEME_TYPE.GRADIENT:
			backgroundTitle = t('appearance.gradient_theme');
			break;
		case THEME_TYPE.IMAGE:
			backgroundTitle = t('appearance.image_theme');
			break;
	}

	const data = [
		{
			title: t('appearance.filter'),
			visible: userStore.user.appearance.theme.style === THEME_TYPE.IMAGE
		},
		{
			title: backgroundTitle,
			visible: true
		},
		{
			title: t('appearance.page'),
			visible: true
		},
		{
			title: t('appearance.link_block'),
			visible: true
		},
		{
			title: t('appearance.block'),
			visible: true
		}
	];
	console.log(data);
	return data;
});

const onThemeSelected = (item: AppearanceTheme) => {
	if (userStore.user && item) {
		userStore.user.appearance.theme = _.cloneDeep(item);
	}
};

const imgPickerUpdate = (imgName: string) => {
	if (userStore.user) {
		userStore.user.appearance.theme.localImg = imgName;
	}
};

const ok = (response: { success: string; path: string }) => {
	if (userStore.user) {
		userStore.user.appearance.theme.uploadImg = response.path;
	}
};

const fail = (response: unknown) => {
	console.log('fail', response);
};
</script>
<style lang="scss">
.shape_square {
	margin: 24px 16px;
	width: 100px;
	height: 40px;
}

.shape_round {
	@extend .shape_square;
	border-radius: 32px;
}

.text-font {
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: 24px;
}

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
