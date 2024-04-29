<template>
	<transition name="fade">
		<div
			v-if="display"
			:class="
				selected
					? 'social-btn-background-selected'
					: 'social-btn-background-normal'
			"
			class="row justify-center items-center"
			@click="onButtonClick"
		>
			<q-icon
				size="24px"
				:name="
					selected
						? `img:/social/selected/${platform}.svg`
						: `img:/social/normal/${platform}.svg`
				"
			/>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SocialMap } from 'src/types/SocialProps';
import { useUserStore } from 'src/stores/user';
const userStore = useUserStore();

const props = defineProps({
	platform: {
		type: String,
		required: true
	},
	display: {
		type: Boolean,
		required: true
	}
});

const selected = computed(() => {
	if (!userStore.user || userStore.user?.socials.length < 0) {
		return false;
	}
	const index = userStore.user?.socials.findIndex(
		(social) => social.platform === props.platform
	);
	return index >= 0;
});

const onButtonClick = () => {
	if (userStore.user) {
		if (selected.value) {
			userStore.user.socials = userStore.user.socials.filter(
				(item) => item.platform !== props.platform
			);
		} else {
			userStore.user.socials.push(SocialMap[props.platform]);
		}
	}
};
</script>

<style scoped lang="scss">
.social-btn-background-normal {
	width: 40px;
	height: 40px;
	border-radius: 12px;
	border: 0.5px solid var(--border, #ebebeb);
	background: white;
	cursor: pointer;
	text-decoration: none;
}

.social-btn-background-selected {
	width: 40px;
	height: 40px;
	border-radius: 12px;
	border: 0.5px solid var(--border, #ebebeb);
	background: var(--grey-01, #f6f6f6);
	cursor: pointer;
	text-decoration: none;
}
</style>
