<template>
	<profile-terminus-avatar
		class="profile-avatar"
		v-if="userStore.info"
		@mouseover="setHover(true)"
		@mouseleave="setHover(false)"
		:show-border="false"
		:info="userStore.info"
		size="96px"
	>
		<div
			v-if="hover"
			class="avatar-hover-background column justify-center items-center cursor-pointer"
			@click="openDialog"
		>
			<div class="avatar-hover-edit">Edit</div>
		</div>
	</profile-terminus-avatar>

	<div
		v-else
		class="profile-avatar-default column justify-center items-center"
		@click="openDialog"
	>
		<q-icon name="sym_r_account_circle" size="20px" />
		<span class="profile-avatar-desc"> avatar </span>
	</div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import ProfileTerminusAvatar from '../avatar/ProfileTerminusAvatar.vue';
import AvatarChooseDialog from '../avatar/AvatarChooseDialog.vue';
import { useUserStore } from 'src/stores/user';

const hover = ref(false);
const $q = useQuasar();
const userStore = useUserStore();

async function openDialog() {
	$q.dialog({
		component: AvatarChooseDialog
	})
		.onOk((data) => {
			if (!userStore.user) {
				return;
			}
			userStore.user.avatarUrl = data;
		})
		.onCancel(() => {
			console.log('Cancel');
		})
		.onDismiss(() => {
			console.log('Called on OK or Cancel');
		});
}

const setHover = (isHover: boolean) => {
	hover.value = isHover;
};
</script>

<style scoped lang="scss">
.profile-avatar {
	overflow: hidden;
	position: relative;

	.avatar-hover-background {
		background: linear-gradient(0deg, #1f1814 0%, rgba(31, 24, 20, 0) 100%);
		width: 96px;
		height: 32px;
		opacity: 0.8;
		position: absolute;
		bottom: 0;

		.avatar-hover-edit {
			font-family: Roboto;
			font-size: 12px;
			font-weight: 400;
			line-height: 16px;
			letter-spacing: 0em;
			text-align: center;
			color: var(--Basic-White, #fff);
		}
	}
}

.profile-avatar-default {
	@extend .profile-avatar;
	border: 1px solid var(--border, #ebebeb);
	color: var(--grey-05, #adadad);

	.profile-avatar-desc {
		font-family: Roboto;
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0em;
		text-align: center;
		margin-top: 6px;
	}
}
</style>
