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
							<image-filter-component
								:use-em="true"
								:font-size="5.12"
								:image-url="userStore.user.appearance.theme.uploadImg"
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
							<image-filter-component
								:use-em="true"
								:font-size="5.12"
								:image-url="userStore.user.appearance.theme.uploadImg"
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
							<image-filter-component
								:use-em="true"
								:font-size="5.12"
								:image-url="userStore.user.appearance.theme.uploadImg"
							/>
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
				</grid-picker-group>
			</template>

			<template v-slot:secondary-1> </template>

			<template v-slot:secondary-2> </template>

			<template v-slot:secondary-3> </template>
			<template v-slot:secondary-4> </template>
		</structured-title>

		<structured-title
			:primary-title="t('appearance.block_style')"
			:secondary-items="blockSecondaryItems"
		>
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
						:label="t('base.circular')"
						:value="BLOCK_STYLE_TYPE.CIRCULAR"
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

				<switch-component
					class="q-mt-lg"
					:label="t('appearance.block_shadow')"
					v-model="userStore.user.appearance.block.shadow"
				/>

				<switch-component
					class="q-mt-lg"
					:label="t('appearance.block_outline')"
					v-model="userStore.user.appearance.block.outline"
				/>
			</template>

			<template v-slot:secondary-0>
				<slider-component
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
import BioEditContainer from 'src/components/edit/BioEditContainer.vue';
import StructuredTitle from 'src/components/base/StructuredTitle.vue';
import PickerComponent from 'src/components/base/PickerComponent.vue';
import GridPickerGroup from 'src/components/base/GridPickerGroup.vue';
import CheckBoxComponent from 'src/components/base/CheckBoxComponent.vue';
import ImageFilterComponent from 'src/components/layout/ImageFilterComponent.vue';
import SwitchComponent from 'src/components/base/SwitchComponent.vue';
import SliderComponent from 'src/components/base/SliderComponent.vue';
import BioButton from 'src/components/base/BioButton.vue';
import {
	THEME_TYPE,
	BLOCK_STYLE_TYPE,
	IMAGE_FILTER,
	FONT_ARRAY
} from 'src/types/User';
import { computed } from 'vue';
import { useUserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
import { useColor } from '@bytetrade/ui';

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

const blockSecondaryItems = computed(() => {
	if (!userStore.user) {
		return [];
	}

	const data = [
		{
			title: t('appearance.block_transparency'),
			visible: true
		}
	];
	console.log(data);
	return data;
});

const selectedColorUpdate = () => {
	if (!userStore.user) {
		return;
	}
	const gradientColor = `linear-gradient(180deg, ${userStore.user.appearance.theme.gradientTopColor} 0%, ${userStore.user.appearance.theme.gradientBottomColor} 100%)`;

	if (userStore.user) {
		userStore.user.appearance.theme.gradientColor = gradientColor;
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
