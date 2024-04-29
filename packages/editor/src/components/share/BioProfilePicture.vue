<template>
	<div
		:style="backgroundStyle"
		class="bio-profile-picture row justify-center items-center"
	>
		<div class="bio-profile-card column items-center">
			<!-- <q-avatar>
        <q-img
          class="bio-profile-avatar"
          alt="name"
          :src="userData.avatarUrl"
        />
      </q-avatar> -->
			<q-avatar :size="`96px`">
				<TerminusAvatar :info="userStore.info" :size="96" />
			</q-avatar>
			<div class="bio-profile-username">
				{{ name }}
			</div>
			<div class="bio-profile-url">
				{{ url }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from 'src/stores/user';
const userStore = useUserStore();

defineProps({
	name: String,
	url: String
});

const backgroundStyle = computed(() => {
	if (!userStore.user) {
		return {};
	}
	switch (userStore.user.background.style) {
		case 0:
			return { 'background-color': '#ffffff' };
		case 1:
			return {
				background: `url("${userStore.user.background.uploadImg}")`,
				'background-size': 'cover'
			};
		case 2:
			return { 'background-color': userStore.user.background.color };
		case 3:
			return { background: userStore.user.background.gradientColor };
		case 4:
		case 5:
			return {
				'background-image': `url("/api/public/background/${userStore.user.background.localImg}")`,
				'background-size': 'cover'
			};
		default:
			return {};
	}
});
</script>

<style scoped lang="scss">
.bio-profile-picture {
	width: 232px;
	position: relative;
	height: 360px;
	border-radius: 12px;
	backdrop-filter: blur(10px);

	.bio-profile-card {
		width: 192px;
		padding: 20px;
		border-radius: 8px;
		background: white;

		.bio-profile-avatar {
			width: 48px;
			height: 48px;
		}

		.bio-profile-username {
			font-family: Roboto;
			font-size: 14px;
			margin-top: 4px;
			font-weight: 500;
			line-height: 20px;
			letter-spacing: 0em;
			text-align: center;
			color: var(--Grey-10, #1f1814);
		}

		.bio-profile-url {
			font-family: Roboto;
			padding: 6px 8px;
			margin-top: 4px;
			font-size: 10px;
			font-weight: 400;
			line-height: 12px;
			letter-spacing: 0em;
			text-align: center;
			border: 1px solid var(--Grey-02, #ebebeb);
			border-radius: 8px;
			word-break: break-word;
		}
	}
}

.bio-profile-picture::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	backdrop-filter: blur(10px); /* 模糊效果的强度，可以根据需要调整 */
	border-radius: inherit;
	z-index: -1; /* 将伪元素置于底部，避免遮挡内容 */
}
</style>
