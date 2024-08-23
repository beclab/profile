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
				<div class="row justify-center items-center" style="height: 56px">
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
							<profile-editor />
						</q-tab-panel>

						<q-tab-panel :name="tabs[1].value">
							<social-editor />
						</q-tab-panel>

						<q-tab-panel :name="tabs[2].value">
							<block-editor />
						</q-tab-panel>

						<q-tab-panel :name="tabs[3].value">
							<appearance-editor />
						</q-tab-panel>
					</q-tab-panels>
				</div>
			</div>
			<div class="right-editor-view">
				<bio-share-header />
				<div class="preview-background row justify-center">
					<div class="preview">
						<bio-layout-component1 :user="userStore.user" :font-size="10.24" />
					</div>
				</div>
			</div>
		</div>
	</q-page>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import ProfileEditor from 'src/pages/edit/ProfileEditor.vue';
import SocialEditor from 'src/pages/edit/SocialEditor.vue';
import BlockEditor from 'src/pages/edit/BlockEditor.vue';
import AppearanceEditor from 'src/pages/edit/AppearanceEditor.vue';
import BioShareHeader from 'src/components/share/BioShareHeader.vue';
import BioLayoutComponent1 from 'src/components/layout/BioLayoutComponent1.vue';
import { useUserStore } from 'src/stores/user';
import { debounce } from 'quasar';
import axios from 'axios';
import { User } from '../types/User';
import { useI18n } from 'vue-i18n';

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
				margin-top: 32px;
				flex: 0 1 auto;
				position: relative;
				width: 240px;
				height: 520px;
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
</style>
