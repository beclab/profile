<template>
	<div class="profile-area column items-center">
		<bio-avatar />
		<span class="profile-label full-width q-mt-xl">
			{{ t('base.name') }}
		</span>
		<edit-view
			v-if="userStore.user"
			class="label-width"
			style="margin-top: 4px"
			:placeholder="t('profile.your_name')"
			v-model="userStore.user.terminusName"
		/>
		<span class="profile-label full-width q-mt-md">
			{{ t('profile.bio') }}
		</span>
		<edit-view
			v-if="userStore.user"
			height="96px"
			class="label-width"
			style="margin-top: 4px"
			:placeholder="t('profile.a_bit_about_you')"
			v-model="userStore.user.description"
		/>
	</div>
</template>

<script lang="ts" setup>
import EditView from 'components/base/EditView.vue';
import BioAvatar from 'components/base/BioAvatar.vue';
import { useUserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore();
const { t } = useI18n();
</script>
<style lang="scss">
.profile-area {
	width: 400px;
	height: 100%;
	padding-top: 32px;

	.profile-label {
		color: $ink-3;
		font-family: Roboto;
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0em;
		text-align: left;
	}
}
</style>
