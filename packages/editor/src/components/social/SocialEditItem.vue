<template>
	<div
		:style="{ '--border': isEdit ? border : '' }"
		class="social-edit column justify-start"
	>
		<div class="social-edit-board row items-center">
			<q-icon color="ink0-3" size="20px" name="sym_r_drag_indicator" />
			<social-svg
				:platform="platform"
				width="20px"
				height="20px"
				class="q-ml-md"
			/>
			<div class="edit-area row justify-start items-center">
				<span class="platform-name">@</span>
				<q-input
					borderless
					type="text"
					class="username-input"
					@blur="isEdit = false"
					@focus="isEdit = true"
					input-class="platform-name"
					:model-value="userName"
					@keyup.enter="onUserNameChanged(userName)"
					@update:model-value="onUserNameChanged"
				/>
			</div>
			<q-icon
				color="grey-5"
				size="20px"
				name="sym_r_delete"
				@click="onDeleteClick"
			/>
		</div>
		<span class="display-url" @click="socialOpen">{{ displayUrl }}</span>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SocialSvg from 'components/social/SocialSvg.vue';

const props = defineProps({
	platform: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});
const { color: border } = useColor('input-stroke');
const emit = defineEmits(['update:userName']);
import { useUserStore } from 'src/stores/user';
import { useColor } from '@bytetrade/ui';

const userStore = useUserStore();
const isEdit = ref(false);
const displayUrl = ref();

const onDeleteClick = () => {
	if (userStore.user) {
		userStore.user.socials = userStore.user.socials.filter(
			(item) => item.platform !== props.platform
		);
	}
};

const onUserNameChanged = (value: string) => {
	formatUrl(value);
	emit('update:userName', value);
};

const formatUrl = (value: string) => {
	if (props.url) {
		try {
			if (value) {
				const itemUrl = props.url;
				displayUrl.value = itemUrl.replace('${username}', value);
			} else {
				displayUrl.value = props.url.replace('${username}', '');
			}
		} catch (e) {
			displayUrl.value = props.url;
		}
	} else {
		displayUrl.value = '';
	}
	console.log(displayUrl.value);
};

const socialOpen = () => {
	if (displayUrl.value) {
		window.open(displayUrl.value);
	}
};

onMounted(() => {
	formatUrl(props.userName);
});
</script>

<style scoped lang="scss">
.social-edit {
	width: 100%;
	height: auto;

	.social-edit-board {
		width: 100%;
		height: 44px;
		border-radius: 12px;
		border: 1px solid $input-stroke;
		background: $background-1;
		padding: 12px;

		.edit-area {
			padding-left: 8px;
			padding-right: 24px;
			height: 100%;
			width: calc(100% - 72px);

			.platform-name {
				font-family: Roboto;
				font-size: 12px;
				font-weight: 500;
				line-height: 16px;
				letter-spacing: 0em;
				text-align: left;
				color: $ink-1;
			}

			.username-input {
				height: 100%;
				margin-left: 3px;
				margin-top: -37px;
				width: calc(100% - 20px);
			}
		}
	}

	.display-url {
		margin-top: 4px;
		padding-left: 16px;
		padding-right: 16px;
		font-family: Roboto;
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		letter-spacing: 0em;
		text-align: left;
		cursor: pointer;
		text-decoration: none;
		color: $ink-3;
	}
}
</style>
