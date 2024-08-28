<template>
	<div class="index-root row justify-center bg-background-1">
		<div v-if="!userStore.user" class="index-loading">
			<BtLoading
				:show="true"
				textColor="#ffffff"
				color="#ffffff"
				text="Loading"
				backgroundColor="rgba(0, 0, 0, 0.4)"
			/>
		</div>
		<div v-else class="index-layout row justify-center">
			<div class="left-editor column items-center">
				<div class="editor-title row justify-center">
					<q-tabs
						v-if="tab && tabs"
						:model-value="tab"
						@update:modelValue="onTabUpdate"
						dense
						inline-label
						narrow-indicator
						active-color="light-green-default"
						indicator-color="light-green-default"
						active-class="tab-item-title-selected"
					>
						<template v-for="item in tabs" :key="item.value">
							<q-tab :name="item.value" :label="item.label" :icon="item.icon" />
						</template>
					</q-tabs>
				</div>

				<div class="editor-workspace row justify-center scroll">
					<q-tab-panels v-model="tab" class="full-width" animated keep-alive>
						<q-tab-panel :name="tabs[0].value">
							<profile-page />
						</q-tab-panel>

						<q-tab-panel :name="tabs[1].value">
							<social-page />
						</q-tab-panel>

						<q-tab-panel :name="tabs[2].value">
							<block-page />
						</q-tab-panel>

						<q-tab-panel :name="tabs[3].value">
							<appearance-page />
						</q-tab-panel>
					</q-tab-panels>
				</div>
			</div>
			<div class="right-preview">
				<bio-share-header />
				<div class="preview-background row justify-center">
					<div class="preview">
						<preview-layout :user="userStore.user" :font-size="10.24" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import PreviewLayout from 'src/components/layout/PreviewLayout.vue';
import BioShareHeader from 'src/components/share/BioShareHeader.vue';
import AppearancePage from 'src/pages/edit/AppearancePage.vue';
import ProfilePage from 'src/pages/edit/ProfilePage.vue';
import SocialPage from 'src/pages/edit/SocialPage.vue';
import BlockPage from 'src/pages/edit/BlockPage.vue';
import { useUserStore } from 'src/stores/user';
import { User } from '../types/User';
import { useI18n } from 'vue-i18n';
import { debounce } from 'quasar';
import { ref, watch } from 'vue';
import axios from 'axios';

const userStore = useUserStore();
const { t } = useI18n();

const tabs = [
	{
		label: t('base.header'),
		value: 'Header',
		icon: 'sym_r_responsive_layout'
	},
	{
		label: t('base.social'),
		value: 'Social',
		icon: 'sym_r_diversity_2'
	},
	{
		label: t('base.blocks'),
		value: 'Blocks',
		icon: 'sym_r_note_stack'
	},
	{
		label: t('base.appearance'),
		value: 'Appearance',
		icon: 'sym_r_draw'
	}
];

const tab = ref(tabs[0].value);

const onTabUpdate = (value: string) => {
	tab.value = value;
};

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
</script>

<style lang="scss">
.index-root {
	width: 100vw;
	height: 100vh;

	.index-loading {
		width: 100vw;
		height: 100vh;
	}

	@media (max-width: 1280px) {
		.index-layout {
			width: 100%;
			min-width: 810px;
			height: 100vh;

			.left-editor {
				height: 100vh;
				width: 60%;
				max-width: 758px;
				min-width: 478px;
				border-right: 1px solid $separator;

				.editor-title {
					height: 56px;
					width: 440px;
				}

				.editor-workspace {
					height: calc(100% - 56px);
					width: 100%;
				}
			}

			.right-preview {
				width: 40%;
				height: 100vh;
				overflow: scroll;
				min-width: 322px;
				max-width: 522px;

				.preview-background {
					width: 100%;
					background-image: url('/public/preview_phone_background.png');
					background-size: cover;
					background-position: center;
					height: calc(100% - 4.67rem);

					@media (max-width: 1024px) {
						.preview {
							margin-top: 32px;
							flex: 0 1 auto;
							position: relative;
							width: 66%;
							height: 66%;
							min-height: 480px;
							border: 5.12px solid #000;
							border-radius: 20.48px;
							background: #fff;
							overflow: hidden;
							box-shadow: inset 0 0.1rem 0.4rem rgba(0, 0, 0, 0.25);
							filter: drop-shadow(0 0.8rem 2.4rem rgba(0, 0, 0, 0.25));
						}
					}

					@media (min-width: 1025px) and (max-width: 1280px) {
						.preview {
							margin-top: 32px;
							flex: 0 1 auto;
							position: relative;
							width: 66%;
							height: 66%;
							min-height: 600px;
							border: 5.12px solid #000;
							border-radius: 20.48px;
							background: #fff;
							overflow: hidden;
							box-shadow: inset 0 0.1rem 0.4rem rgba(0, 0, 0, 0.25);
							filter: drop-shadow(0 0.8rem 2.4rem rgba(0, 0, 0, 0.25));
						}
					}
				}
			}
		}
	}

	@media (min-width: 1281px) {
		.index-layout {
			width: 1280px;
			height: 100vh;

			.left-editor {
				height: 100vh;
				width: 59%;
				max-width: 758px;
				min-width: 478px;
				border-right: 1px solid $separator;

				.editor-title {
					height: 56px;
					width: 440px;
				}

				.editor-workspace {
					height: calc(100% - 56px);
					width: 100%;
				}
			}

			.right-preview {
				width: 40%;
				overflow: scroll;
				height: 100vh;
				min-width: 322px;
				max-width: 522px;

				.preview-background {
					width: 100%;
					background-image: url('/public/preview_phone_background.png');
					background-size: cover;
					background-position: center;
					height: calc(100% - 4.67rem);

					.preview {
						margin-top: 32px;
						flex: 0 1 auto;
						position: relative;
						width: 66%;
						height: 66%;
						min-height: 652px;
						border: 5.12px solid #000;
						border-radius: 20.48px;
						background: #fff;
						overflow: hidden;
						box-shadow: inset 0 0.1rem 0.4rem rgba(0, 0, 0, 0.25);
						filter: drop-shadow(0 0.8rem 2.4rem rgba(0, 0, 0, 0.25));
					}
				}
			}
		}
	}
}
</style>
