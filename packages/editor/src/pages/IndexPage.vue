<template>
	<q-page class="row justify-evenly bg-background-1">
		<div v-if="!userStore.user" class="index-loading">
			<BtLoading
				:show="true"
				textColor="#ffffff"
				color="#ffffff"
				text="Loading"
				backgroundColor="rgba(0, 0, 0, 0.4)"
			/>
		</div>
		<div v-else class="index-editor">
			<div class="left-editor-view">
				<div class="row" style="margin-left: 20px">
					<tab-item
						:index="0"
						v-model:selected-index="selectedIndex"
						:title="t('base.profile')"
						name="sym_r_account_circle"
					/>

					<tab-item
						:index="1"
						v-model:selected-index="selectedIndex"
						:title="t('base.social')"
						name="sym_r_diversity_2"
					/>

					<tab-item
						:index="2"
						v-model:selected-index="selectedIndex"
						:title="t('base.blocks')"
						name="sym_r_grid_view"
					/>

					<tab-item
						:index="3"
						v-model:selected-index="selectedIndex"
						:title="t('base.design')"
						name="sym_r_draw"
					/>
				</div>
				<div class="editor-workspace row justify-center scroll">
					<bio-profile-setting
						v-if="selectedIndex === 0"
						v-model:userConfig="userStore.user"
					/>
					<bio-social-setting
						v-if="selectedIndex === 1"
						v-model:userConfig="userStore.user"
					/>
					<bio-block-setting v-if="selectedIndex === 2" />
					<bio-design-setting
						v-if="selectedIndex === 3"
						v-model:userConfig="userStore.user"
					/>
				</div>
			</div>
			<div class="right-editor-view">
				<bio-share-header />
				<div class="preview-background row justify-center">
					<div class="preview">
						<BioLayoutComponent1
							:user="userStore.user"
							@on-area-click="onAreaClick"
						/>
					</div>
				</div>
			</div>
		</div>
	</q-page>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import TabItem from 'components/base/TabItem.vue';
import BioProfileSetting from 'components/edit/BioProfileSetting.vue';
import BioSocialSetting from 'components/edit/BioSocialSetting.vue';
import BioBlockSetting from 'components/edit/BioBlockSetting.vue';
import BioDesignSetting from 'components/edit/BioDesignSetting.vue';
import BioShareHeader from 'components/share/BioShareHeader.vue';
import BioLayoutComponent1 from 'components/layout/BioLayoutComponent1.vue';
import { useUserStore } from 'src/stores/user';
import { debounce } from 'quasar';
import axios from 'axios';
import { User } from '../types/User';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore();
const { t } = useI18n();
const selectedIndex = ref<number>(0);

const updateUserInfo = debounce(async function (user: User) {
	axios.post('/api/user', user);
}, 500);

watch(
	() => userStore.user,
	(value: User | null) => {
		if (value) {
			console.log('update user');
			console.log(value);

			updateUserInfo(value);
		}
	},
	{
		deep: true
	}
);

const onAreaClick = (index: number) => {
	console.log(index);
	selectedIndex.value = index;
};
</script>

<style lang="scss">
.index-loading {
	width: 100vw;
	height: 100vh;
}

.index-editor {
	display: flex;
	width: 100vw;
	height: 100vh;

	.left-editor-view {
		height: 100vh;
		width: 56%;
		border-right: 1px solid $separator;

		.editor-workspace {
			height: calc(100% - 56px);
			width: 100%;
		}
	}

	.right-editor-view {
		width: 44%;
		height: 100vh;

		.preview-background {
			width: 100%;
			background-image: url('/public/preview_phone_background.png');
			background-size: cover;
			background-position: center;
			height: calc(100% - 4.67rem);

			.preview {
				margin-top: 2.67rem;
				flex: 0 1 auto;
				position: relative;
				width: 21rem;
				height: 40.3rem;
				border: 0.25rem solid #363636;
				border-radius: 2.4rem;
				background: #ffffff;
				box-shadow: inset 0 0.1rem 0.4rem rgba(0, 0, 0, 0.25);
				filter: drop-shadow(0 0.8rem 2.4rem rgba(0, 0, 0, 0.25));
			}
		}
	}
}
</style>
