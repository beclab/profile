<template>
	<div
		v-if="user"
		:class="useEm ? 'container-wrapper-em' : 'container-wrapper'"
	>
		<div
			:class="useEm ? 'bio-preview-container-em' : 'bio-preview-container'"
			:style="backgroundStyle"
			@click="emit('onAreaClick', 3)"
		>
			<div class="header-avatar" @click.stop="emit('onAreaClick', 0)">
				<profile-terminus-avatar
					class="avatar-picture"
					:size="useEm ? '7em' : '7rem'"
					:info="userStore.info"
				/>
			</div>
			<div
				class="username"
				:style="{ color: user.appearance.nameColor }"
				@click.stop="emit('onAreaClick', 0)"
			>
				{{ user.terminusName }}
			</div>
			<div
				class="description"
				v-if="user.description"
				:style="{ color: user.appearance.bioColor }"
				@click.stop="emit('onAreaClick', 0)"
			>
				{{ user.description }}
			</div>
			<div v-if="isDefault" class="default-view">
				<img src="/profile-pure.svg" alt="logo" />
				<div class="content">Let people own their data again</div>
			</div>
			<div class="simple-social-view" @click.stop="emit('onAreaClick', 1)">
				<template v-for="item in user.socials" :key="item.url">
					<a
						target="_blank"
						class="bio-social"
						:style="{ color: user.appearance.socialColor }"
						:href="getSocialUrl(item)"
					>
						<social-svg
							:width="`1.6${useEm ? 'em' : 'rem'}`"
							:height="`1.6${useEm ? 'em' : 'rem'}`"
							:platform="item.platform"
						/>
					</a>
				</template>
			</div>
			<div class="links" @click.stop="emit('onAreaClick', 2)">
				<template v-for="item in enabledLinks" :key="item.url">
					<a
						v-if="item.type === BLOCK_TYPE.link"
						:style="{
							'border-color': user.appearance.buttonBorderColor,
							'background-color': user.appearance.buttonColor,
							color: user.appearance.buttonFontColor
						}"
					>
						<img
							class="link-img"
							v-if="item.img && item.img !== ''"
							:src="item.img"
						/>
						{{ item.title }}</a
					>
					<a
						v-if="item.type === BLOCK_TYPE.text"
						:style="{
							'border-color': user.appearance.buttonBorderColor,
							'background-color': user.appearance.buttonColor,
							color: user.appearance.buttonFontColor
						}"
					>
						{{ item.title }}</a
					>
					<div class="image-parent" v-if="item.type === BLOCK_TYPE.image">
						<img
							class="image-background"
							:src="item.img ? item.img : '/block_image_default.svg'"
						/>
						<a
							class="image-title"
							:style="{
								'border-color': user.appearance.buttonBorderColor,
								'background-color': user.appearance.buttonColor,
								color: user.appearance.buttonFontColor
							}"
						>
							{{ item.title }}
						</a>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { User, BLOCK_TYPE, Social } from 'src/types/User';
import SocialSvg from 'components/social/SocialSvg.vue';
import { useUserStore } from 'src/stores/user';
import ProfileTerminusAvatar from '../avatar/ProfileTerminusAvatar.vue';

const props = defineProps({
	user: {
		type: Object as PropType<User>,
		required: true
	},
	useEm: {
		type: Boolean,
		default: false
	}
});

const userStore = useUserStore();
const emit = defineEmits(['onAreaClick']);

const backgroundStyle = computed(() => {
	switch (props.user.background.style) {
		case 0:
			return { 'background-color': '#ffffff' };
		case 1:
			return {
				background: `url("${props.user.background.uploadImg}")`,
				'background-size': 'cover'
			};
		case 2:
			return { 'background-color': props.user.background.color };
		case 3:
			return { background: props.user.background.gradientColor };
		case 4:
		case 5:
			return {
				'background-image': `url("/background/${props.user.background.localImg}")`,
				'background-size': 'cover'
			};
		default:
			return {};
	}
});

function getSocialUrl(item: Social): string {
	const itemUrl = item.url;
	return itemUrl.replace('${username}', item.username);
}

const enabledLinks = computed(() => {
	return props.user.links;
});

const isDefault = computed(() => {
	return shouldSetDefault(props.user);
});

const shouldSetDefault = (user: User): boolean => {
	// 判断 links 是否为空
	if (user.links && user.links.length > 0) {
		return false;
	}
	if (user.socials && user.socials.length > 0) {
		return false;
	}
	return true;
};
</script>
<style lang="scss">
::-webkit-scrollbar {
	/*隐藏滚轮*/
	display: none;
}

.container-wrapper-em {
	width: 100%;
	height: 100%;
	border-radius: 1.4em;
	overflow: hidden;

	.bio-preview-container-em {
		width: 100%;
		height: 100%;
		border-radius: 1.4em;
		overflow-y: auto;

		//.header-share {
		//  position: absolute;
		//  width: 1.6em;
		//  height: 1.6em;
		//  top: 1.6em;
		//  right: 1.6em;
		//  border: 0.0666667em solid #4D4D4D;
		//  background: rgba(255, 255, 255);
		//  display: flex;
		//  border-radius: 50%;
		//  justify-content: center;
		//  align-items: center;
		//  cursor: pointer;
		//  z-index: 100;
		//}
		//
		//.header-share img {
		//  width: 0.8em;
		//  height: 0.8em;
		//  cursor: pointer;
		//}

		.header-avatar {
			width: 100%;
			position: relative;
			display: flex;
			justify-content: center;
			order: -1;
			overflow-x: hidden;
		}

		.avatar-picture {
			margin-top: 4.1em;
			margin-bottom: 0.8em;
		}

		.username {
			margin: 0 auto 0.8em;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 500;
			font-size: 1.2em;
			line-height: 1.6em;
			text-align: center;
			color: #242424;
		}

		.simple-social-view {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}

		.bio-social {
			margin: 0 0.6em;
		}

		.link-img {
			width: 1.6em;
			height: 1.6em;
			margin-right: 0.8em;
			border-radius: 0.5em;
		}

		.image-parent {
			width: 16.6em;
			height: 11.52em;
			position: relative;
			display: block;
			margin: auto;
			margin-bottom: 1.2em;
			display: flex;
		}

		.image-background {
			width: 16.6em;
			height: 11.52em;
			border-radius: 0.5em;
			justify-content: center;
			align-items: center;
			object-fit: cover;
		}

		.image-title {
			position: absolute;
			bottom: 0;
			justify-content: center;
			align-items: center;
			width: 16.6em !important;
			border-top-right-radius: 0 !important;
			border-top-left-radius: 0 !important;
			margin-bottom: 0 !important;
		}

		.links {
			margin-top: 2em;
			text-align: center;
		}

		.links a {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: pre-line;
			border-radius: 0.5em;
			border-width: 1px;
			border-style: solid;
			max-width: 16.6em;
			height: auto;
			min-height: 2.8em;
			display: block;
			margin: auto;
			margin-bottom: 1.2em;
			display: flex;
			// flex-direction: column;
			justify-content: center;
			align-items: center;
			text-decoration: none;
			color: inherit;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			font-size: 1em;
			line-height: 1.6em;
			text-align: center;
		}

		.description {
			text-align: center;
			margin-bottom: 0.8rem;
			font-family: 'Roboto';
			font-style: normal;
			font-size: 0.9em;
			color: rgb(61, 61, 61);
			padding: 0 2em;
			white-space: pre-line;
			text-decoration: none;
		}

		.default-view {
			margin-top: 10em;
			text-align: center;
		}

		.default-view img {
			width: 2.5em;
			height: 2.5em;
			margin-bottom: 0.8em;
		}

		.default-view .content {
			margin: auto;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			font-size: 0.9em;
			line-height: 20px;
			color: #7e7e7e;
			text-align: center;
		}
	}
}

.container-wrapper {
	width: 100%;
	height: 100%;
	border-radius: 1.4em;
	overflow: hidden;

	.bio-preview-container {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		border-radius: 2.2rem;

		//.header-share {
		//  position: absolute;
		//  width: 1.6rem;
		//  height: 1.6rem;
		//  top: 1.6rem;
		//  right: 1.6rem;
		//  border: 0.0666667em solid #4D4D4D;
		//  background: rgba(255, 255, 255);
		//  display: flex;
		//  border-radius: 50%;
		//  justify-content: center;
		//  align-items: center;
		//  cursor: pointer;
		//  z-index: 100;
		//}
		//
		//.header-share img {
		//  width: 0.8rem;
		//  height: 0.8rem;
		//  cursor: pointer;
		//}

		.header-avatar {
			width: 100%;
			position: relative;
			display: flex;
			justify-content: center;
			order: -1;
			overflow-x: hidden;
		}

		.avatar-picture {
			margin-top: 4.1rem;
			margin-bottom: 0.8rem;
		}

		.username {
			margin-bottom: 0.8em;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 500;
			font-size: 1.2rem;
			line-height: 1.6rem;
			text-align: center;
			color: #242424;
		}

		.simple-social-view {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}

		.bio-social {
			margin: 0 0.6rem;
		}

		.link-img {
			width: 1.6rem;
			height: 1.6rem;
			margin-right: 0.8rem;
			border-radius: 0.5rem;
		}

		.image-parent {
			width: 16.6rem;
			height: 11.52rem;
			position: relative;
			display: block;
			margin: auto;
			margin-bottom: 1.2rem;
			display: flex;
		}

		.image-background {
			width: 16.6rem;
			height: 11.52rem;
			border-radius: 0.5rem;
			justify-content: center;
			align-items: center;
			object-fit: cover;
		}

		.image-title {
			position: absolute;
			bottom: 0;
			justify-content: center;
			align-items: center;
			width: 16.6rem !important;
			border-top-right-radius: 0 !important;
			border-top-left-radius: 0 !important;
			margin-bottom: 0 !important;
		}

		.links {
			margin-top: 2rem;
			text-align: center;
		}

		.links a {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: pre-line;
			border-radius: 0.5rem;
			border-width: 1px;
			border-style: solid;
			max-width: 16.6rem;
			height: auto;
			min-height: 2.8rem;
			display: block;
			margin: auto;
			margin-bottom: 1.2rem;
			display: flex;
			// flex-direction: column;
			justify-content: center;
			align-items: center;
			text-decoration: none;
			color: inherit;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			font-size: 1rem;
			line-height: 1.6rem;
			text-align: center;
		}

		.description {
			text-align: center;
			margin-bottom: 0.8rem;
			font-family: 'Roboto';
			font-style: normal;
			font-size: 0.9rem;
			color: rgb(61, 61, 61);
			padding: 0 2rem;
			white-space: pre-line;
			text-decoration: none;
		}

		.default-view {
			margin-top: 10rem;
			text-align: center;
		}

		.default-view img {
			width: 2.5rem;
			height: 2.5rem;
			margin-bottom: 0.8rem;
		}

		.default-view .content {
			margin: auto;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			font-size: 0.9rem;
			line-height: 20px;
			color: #7e7e7e;
			text-align: center;
		}
	}
}
</style>
