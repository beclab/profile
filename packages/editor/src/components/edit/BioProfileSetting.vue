<template>
	<bio-edit-container v-if="userStore.user">
		<structured-title
			:primary-title="t('profile.header_style')"
			:secondary-items="headerStyleSecondaryItems"
		>
			<template v-slot:primary>
				<grid-picker-group
					column-gap="28px"
					v-model="userStore.user.header.style"
				>
					<picker-component
						width="120px"
						height="216px"
						:value="HEADER_STYLE_TYPE.CLASSIC"
						:label="t('profile.classic')"
						:border="true"
					>
						<template v-slot:default>
							<bio-layout-component1
								:use-em="true"
								:font-size="5.12"
								:user="classicUser"
							/>
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
					<picker-component
						width="120px"
						height="216px"
						:value="HEADER_STYLE_TYPE.PORTRAIT"
						:label="t('profile.portrait')"
						:border="true"
					>
						<template v-slot:default>
							<bio-layout-component1
								:use-em="true"
								:font-size="5.12"
								:user="portraitUser"
							/>
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
					<picker-component
						width="120px"
						height="216px"
						:label="t('profile.banner')"
						:value="HEADER_STYLE_TYPE.BANNER"
						:border="true"
					>
						<template v-slot:default>
							<bio-layout-component1
								:use-em="true"
								:font-size="5.12"
								:user="bannerUser"
							/>
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
				</grid-picker-group>
			</template>

			<template v-slot:secondary-0>
				<upload-component
					v-model:img-url="userStore.user.header.banner"
					width="440px"
					height="220px"
				/>
			</template>
		</structured-title>

		<structured-title
			:primary-title="t('profile.profile_picture')"
			:primary-description="t('profile.upload_avatar_desc')"
			:secondary-items="pictureSecondaryItems"
		>
			<template v-slot:primary>
				<bio-avatar :size="100" :icon-size="32" />
			</template>

			<template v-slot:secondary-0>
				<grid-picker-group v-model="userStore.user.header.profileShape">
					<picker-component
						:label="t('base.circular')"
						:value="PROFILE_SHAPE_TYPE.CIRCULAR"
					>
						<template v-slot:default="{ color }">
							<div :style="{ background: color }" class="shape_circle" />
						</template>
						<template v-slot:label="{ selected, label }">
							<check-box-component :model-value="selected" :label="label" />
						</template>
					</picker-component>
					<picker-component
						:label="t('base.square')"
						:value="PROFILE_SHAPE_TYPE.SQUARE"
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
					v-if="userStore.user.header.style !== HEADER_STYLE_TYPE.PORTRAIT"
					:label="t('profile.profile_picture_size')"
					v-model="userStore.user.header.profileSize"
					:min="64"
					:max="200"
					unit="px"
				/>

				<switch-component
					v-if="userStore.user.header.style !== HEADER_STYLE_TYPE.PORTRAIT"
					:label="t('profile.profile_picture_outline')"
					v-model="userStore.user.header.profileOutline"
				/>
			</template>
		</structured-title>

		<structured-title
			:primary-title="t('profile.header_text')"
			:secondary-items="[{ title: t('base.size'), visible: true }]"
		>
			<template v-slot:primary>
				<div class="column">
					<span class="profile-label full-width">
						{{ t('base.name') }}
					</span>
					<edit-view
						v-if="userStore.user"
						class="label-width q-mt-xs"
						:placeholder="t('profile.your_name')"
						v-model="userStore.user.header.nickName"
					/>
					<span class="profile-label full-width q-mt-md">
						{{ t('profile.bio') }}
					</span>
					<edit-view
						v-if="userStore.user"
						height="96px"
						class="label-width q-mt-xs"
						:placeholder="t('profile.a_bit_about_you')"
						v-model="userStore.user.header.description"
					/>
				</div>
			</template>

			<template v-slot:secondary-0>
				<grid-picker-group
					:grid="false"
					v-model="userStore.user.header.textSize"
				>
					<picker-component text="S" :value="SIZE_TYPE.SMALL" />
					<picker-component
						class="q-ml-md"
						text="M"
						:value="SIZE_TYPE.MEDIUM"
					/>
					<picker-component
						class="q-ml-md"
						text="L"
						:value="SIZE_TYPE.LARGER"
					/>
				</grid-picker-group>
			</template>
		</structured-title>

		<structured-title
			v-if="userStore.user.header.style === HEADER_STYLE_TYPE.CLASSIC"
			:primary-title="t('profile.header_format')"
		>
			<template v-slot:primary>
				<grid-picker-group columns="2" v-model="userStore.user.header.format">
					<picker-component
						width="210px"
						height="100px"
						:value="HEADER_FORMAT_TYPE.COLUMN"
					>
						<template v-slot:default="{ color }">
							<format-svg :color="color" :column="true" />
						</template>
					</picker-component>
					<picker-component
						width="210px"
						height="100px"
						:value="HEADER_FORMAT_TYPE.ROW"
					>
						<template v-slot:default="{ color }">
							<format-svg :color="color" :column="false" />
						</template>
					</picker-component>
				</grid-picker-group>
			</template>
		</structured-title>
	</bio-edit-container>
</template>

<script lang="ts" setup>
import BioLayoutComponent1 from 'src/components/layout/BioLayoutComponent1.vue';
import CheckBoxComponent from 'src/components/base/CheckBoxComponent.vue';
import BioEditContainer from 'src/components/edit/BioEditContainer.vue';
import GridPickerGroup from 'src/components/base/GridPickerGroup.vue';
import PickerComponent from 'src/components/base/PickerComponent.vue';
import StructuredTitle from 'src/components/base/StructuredTitle.vue';
import SliderComponent from 'src/components/base/SliderComponent.vue';
import SwitchComponent from 'src/components/base/SwitchComponent.vue';
import UploadComponent from 'src/components/base/UploadComponent.vue';
import FormatSvg from 'src/components/base/FormatSvg.vue';
import EditView from 'src/components/base/EditView.vue';
import BioAvatar from 'src/components/base/BioAvatar.vue';
import {
	HEADER_STYLE_TYPE,
	PROFILE_SHAPE_TYPE,
	SIZE_TYPE,
	HEADER_FORMAT_TYPE
} from 'src/types/User';
import { useUserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
import { computed, ref, watch } from 'vue';

const userStore = useUserStore();
const { t } = useI18n();
const classicUser = ref();
const portraitUser = ref();
const bannerUser = ref();
import _ from 'lodash';

watch(
	() => userStore.user,
	(newValue) => {
		const deepClonedUser = _.cloneDeep(newValue); // 深拷贝

		classicUser.value = {
			...deepClonedUser,
			header: {
				...deepClonedUser.header,
				style: HEADER_STYLE_TYPE.CLASSIC
			}
		};

		portraitUser.value = {
			...deepClonedUser,
			header: {
				...deepClonedUser.header,
				style: HEADER_STYLE_TYPE.PORTRAIT
			}
		};

		bannerUser.value = {
			...deepClonedUser,
			header: {
				...deepClonedUser.header,
				style: HEADER_STYLE_TYPE.BANNER
			}
		};
	},
	{
		deep: true,
		immediate: true
	}
);

const headerStyleSecondaryItems = computed(() => {
	if (!userStore.user) {
		return [];
	}

	const data = [
		{
			title: t('profile.banner'),
			description: t('profile.upload_avatar_desc'),
			visible: userStore.user.header.style === HEADER_STYLE_TYPE.BANNER
		}
	];
	console.log(data);
	return data;
});

const pictureSecondaryItems = computed(() => {
	if (!userStore.user) {
		return [];
	}
	return [
		{
			title: t('profile.profile_picture_shape'),
			visible: userStore.user.header.style !== HEADER_STYLE_TYPE.PORTRAIT
		}
	];
});
</script>
<style scoped lang="scss">
.shape_circle {
	margin: 20px 40px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
}

.shape_square {
	@extend .shape_circle;
	border-radius: 8px;
}

.format-row-image {
	width: 148px;
	height: 60px;
}
</style>
