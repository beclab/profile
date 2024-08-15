<template>
	<div
		v-if="user"
		:style="{ fontSize: `${fontSize}px` }"
		class="container-wrapper"
	>
		<div
			class="preview-container column items-center"
			:class="
				props.user.header.style === HEADER_STYLE_TYPE.PORTRAIT
					? ''
					: 'preview-container-padding'
			"
			:style="backgroundStyle"
		>
			<div
				v-if="props.user.header.style === HEADER_STYLE_TYPE.CLASSIC"
				class="justify-center items-center"
				:class="
					props.user.header.format
						? 'classic-header-format-' +
							props.user.header.format.toLowerCase() +
							' ' +
							props.user.header.format.toLowerCase()
						: 'classic-header-format-column column'
				"
			>
				<profile-terminus-avatar
					class="avatar-picture"
					:info="userStore.info"
					:show-border="props.user.header.profileOutline"
					:size="props.user.header.profileSize / 16 + 'em'"
					:radius="
						props.user.header.profileShape === PROFILE_SHAPE_TYPE.CIRCULAR
							? '50%'
							: '0.75em'
					"
				/>
				<div
					class="header-text column"
					:style="{ '--avatarSize': props.user.header.profileSize / 16 + 'em' }"
				>
					<div
						v-if="user.header.nickName"
						:class="
							props.user.header.textSize
								? 'nickname-' + props.user.header.textSize.toLowerCase()
								: 'nickname-medium'
						"
						:style="{ color: user.appearance.header.textColor }"
					>
						{{ user.header.nickName }}
					</div>
					<div
						v-if="user.header.description"
						:class="
							props.user.header.textSize
								? 'description-' + props.user.header.textSize.toLowerCase()
								: 'description-medium'
						"
						:style="{ color: user.appearance.header.textColor }"
					>
						{{ user.header.description }}
					</div>
				</div>
				<div class="simple-social-view">
					<template v-for="item in user.social.data" :key="item.url">
						<a
							target="_blank"
							class="bio-social"
							:style="{ color: user.appearance.header.textColor }"
							:href="getSocialUrl(item)"
						>
							<social-svg width="2em" height="2em" :platform="item.platform" />
						</a>
					</template>
				</div>
			</div>

			<div
				v-if="props.user.header.style === HEADER_STYLE_TYPE.PORTRAIT"
				class="portrait-header-format-column column justify-center items-center"
			>
				<profile-terminus-avatar
					class="avatar-picture"
					:info="userStore.info"
					:show-border="false"
					size="23.4375em"
					radius="0"
				>
					<div class="avatar-mask" />
				</profile-terminus-avatar>
				<div class="header-text column">
					<div
						v-if="user.header.nickName"
						:class="
							props.user.header.textSize
								? 'nickname-' + props.user.header.textSize.toLowerCase()
								: 'nickname-medium'
						"
						:style="{ color: user.appearance.header.textColor }"
					>
						{{ user.header.nickName }}
					</div>
					<div
						v-if="user.header.description"
						:class="
							props.user.header.textSize
								? 'description-' + props.user.header.textSize.toLowerCase()
								: 'description-medium'
						"
						:style="{ color: user.appearance.header.textColor }"
					>
						{{ user.header.description }}
					</div>
				</div>
				<div class="simple-social-view">
					<template v-for="item in user.social.data" :key="item.url">
						<a
							target="_blank"
							class="bio-social"
							:style="{ color: user.appearance.header.textColor }"
							:href="getSocialUrl(item)"
						>
							<social-svg width="2em" height="2em" :platform="item.platform" />
						</a>
					</template>
				</div>
			</div>

			<div
				v-if="props.user.header.style === HEADER_STYLE_TYPE.BANNER"
				class="banner-header-format-column column justify-center items-center"
			>
				<div class="avatar-banner" :style="bannerStyle" />

				<profile-terminus-avatar
					class="avatar-picture"
					:style="{
						'--avatarMarginTop':
							11.75 - 2.5 - props.user.header.profileSize / 16 / 2 + 'em'
					}"
					:info="userStore.info"
					:show-border="props.user.header.profileOutline"
					:size="props.user.header.profileSize / 16 + 'em'"
					:radius="
						props.user.header.profileShape === PROFILE_SHAPE_TYPE.CIRCULAR
							? '50%'
							: '0.75em'
					"
				/>
				<div class="header-text column">
					<div
						v-if="user.header.nickName"
						:class="
							props.user.header.textSize
								? 'nickname-' + props.user.header.textSize.toLowerCase()
								: 'nickname-medium'
						"
						:style="{ color: user.appearance.header.textColor }"
					>
						{{ user.header.nickName }}
					</div>
					<div
						v-if="user.header.description"
						:class="
							props.user.header.textSize
								? 'description-' + props.user.header.textSize.toLowerCase()
								: 'description-medium'
						"
						:style="{ color: user.appearance.header.textColor }"
					>
						{{ user.header.description }}
					</div>
				</div>
				<div class="simple-social-view">
					<template v-for="item in user.social.data" :key="item.url">
						<a
							target="_blank"
							class="bio-social"
							:style="{ color: user.appearance.header.textColor }"
							:href="getSocialUrl(item)"
						>
							<social-svg width="2em" height="2em" :platform="item.platform" />
						</a>
					</template>
				</div>
			</div>

			<div v-if="isDefault" class="default-view">
				<img src="/profile-pure.svg" alt="logo" />
				<div class="content">
					{{ t('base.let_people_own_their_data_again') }}
				</div>
			</div>
			<div class="links">
				<template v-for="item in enabledLinks" :key="item.url">
					<a
						v-if="item.type === BLOCK_TYPE.link"
						:style="{
							'border-color': user.appearance.link.textColor,
							'background-color': user.appearance.link.background,
							color: user.appearance.link.textColor
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
							'border-color': user.appearance.block.textColor,
							'background-color': user.appearance.block.background,
							color: user.appearance.block.textColor
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
								'border-color': user.appearance.block.textColor,
								'background-color': user.appearance.block.background,
								color: user.appearance.block.textColor
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
import {
	BLOCK_TYPE,
	Social,
	THEME_TYPE,
	User,
	HEADER_STYLE_TYPE,
	PROFILE_SHAPE_TYPE
} from 'src/types/User';
import SocialSvg from 'src/components/social/SocialSvg.vue';
import { useUserStore } from 'src/stores/user';
import ProfileTerminusAvatar from '../avatar/ProfileTerminusAvatar.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
	user: {
		type: Object as PropType<User>,
		required: true
	},
	fontSize: {
		type: Number,
		default: 16
	}
});

const userStore = useUserStore();
// const emit = defineEmits(['onAreaClick']);
const { t } = useI18n();

const backgroundStyle = computed(() => {
	switch (props.user.appearance.theme.style) {
		case THEME_TYPE.SOLID:
			return { 'background-color': props.user.appearance.theme.color };
		case THEME_TYPE.GRADIENT:
			return { background: props.user.appearance.theme.gradientColor };
		case THEME_TYPE.UPLOAD:
			return {
				background: `url("${props.user.appearance.theme.uploadImg}")`,
				'background-size': 'cover'
			};
		case THEME_TYPE.IMAGE:
			return {
				'background-image': `url("/background/${props.user.appearance.theme.localImg}")`,
				'background-size': 'cover'
			};
		default:
			return {};
	}
});

const bannerStyle = computed(() => {
	if (props.user.header.banner) {
		return {
			background: `url("${props.user.header.banner}")`,
			'background-size': 'cover'
		};
	}
	return {
		'background-image': `url("/banner/banner_default.png")`,
		'background-size': 'cover'
	};
});

function getSocialUrl(item: Social): string {
	const itemUrl = item.url;
	return itemUrl.replace('${username}', item.username);
}

const enabledLinks = computed(() => {
	return props.user.block.data.filter((item) => item.enabled);
});

const isDefault = computed(() => {
	return !(props.user.block && props.user.block.data.length > 0);
});
</script>
<style lang="scss">
::-webkit-scrollbar {
	/*隐藏滚轮*/
	display: none;
}

.container-wrapper {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;

	.preview-container-padding {
		padding: 2.5em 1.25em;
	}

	.preview-container {
		width: 100%;
		height: 100%;
		overflow-y: auto;

		.classic-header-format-column {
			width: 100%;

			.avatar-picture {
				margin-top: 1.5em;
				margin-bottom: 1.25em;
			}

			.header-text {
				width: 100%;

				.nickname {
					max-width: 100%;
					overflow: hidden;
					text-align: center;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}

				.nickname-small {
					@extend .nickname;
					font-size: 1.125em;
					font-style: normal;
					font-weight: 700;
					line-height: 1.625em;
				}

				.nickname-medium {
					@extend .nickname;
					font-size: 1.25em;
					font-style: normal;
					font-weight: 700;
					line-height: 1.75em;
				}

				.nickname-larger {
					@extend .nickname;
					font-size: 1.5em;
					font-style: normal;
					font-weight: 700;
					line-height: 2em;
				}

				.description {
					max-width: 100%;
					overflow: hidden;
					text-align: center;
				}

				.description-small {
					@extend .description;
					font-size: 0.875em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.25em;
				}

				.description-medium {
					@extend .description;
					font-size: 1em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.5em;
				}

				.description-larger {
					@extend .description;
					font-size: 1.125em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.625em;
				}
			}

			.simple-social-view {
				width: 100%;
				margin-top: 2em;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.bio-social {
					margin: 0 0.375em;
				}
			}
		}

		.classic-header-format-row {
			width: 100%;

			.header-text {
				width: calc(100% - 0.75em - var(--avatarSize));
				margin-left: 0.75em;

				.nickname {
					max-width: 100%;
					overflow: hidden;
					text-align: left;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}

				.nickname-small {
					@extend .nickname;
					font-size: 1.125em;
					font-style: normal;
					font-weight: 700;
					line-height: 1.625em;
				}

				.nickname-medium {
					@extend .nickname;
					font-size: 1.25em;
					font-style: normal;
					font-weight: 700;
					line-height: 1.75em;
				}

				.nickname-larger {
					@extend .nickname;
					font-size: 1.5em;
					font-style: normal;
					font-weight: 700;
					line-height: 2em;
				}

				.description {
					max-width: 100%;
					overflow: hidden;
					text-align: left;
				}

				.description-small {
					@extend .description;
					font-size: 0.875em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.25em;
				}

				.description-medium {
					@extend .description;
					font-size: 1em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.5em;
				}

				.description-larger {
					@extend .description;
					font-size: 1.125em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.625em;
				}
			}

			.simple-social-view {
				width: 100%;
				margin-top: 0.75em;
				display: flex;
				justify-content: left;
				flex-wrap: wrap;

				.bio-social {
					margin: 0 0.375em;
				}
			}
		}

		.portrait-header-format-column {
			width: 100%;

			.avatar-picture {
				margin-bottom: 1.25em;

				.avatar-mask {
					width: 100%;
					height: 9.375em;
					background: linear-gradient(
						180deg,
						rgba(255, 255, 255, 0) 0%,
						#fff 100%
					);
					position: absolute;
					bottom: 0;
				}
			}

			.header-text {
				width: 100%;

				.nickname {
					max-width: 100%;
					overflow: hidden;
					text-align: center;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}

				.nickname-small {
					@extend .nickname;
					font-size: 1.125em;
					font-style: normal;
					font-weight: 700;
					line-height: 1.625em;
				}

				.nickname-medium {
					@extend .nickname;
					font-size: 1.25em;
					font-style: normal;
					font-weight: 700;
					line-height: 1.75em;
				}

				.nickname-larger {
					@extend .nickname;
					font-size: 1.5em;
					font-style: normal;
					font-weight: 700;
					line-height: 2em;
				}

				.description {
					max-width: 100%;
					overflow: hidden;
					text-align: center;
				}

				.description-small {
					@extend .description;
					font-size: 0.875em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.25em;
				}

				.description-medium {
					@extend .description;
					font-size: 1em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.5em;
				}

				.description-larger {
					@extend .description;
					font-size: 1.125em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.625em;
				}
			}

			.simple-social-view {
				width: 100%;
				margin-top: 2em;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.bio-social {
					margin: 0 0.375em;
				}
			}
		}

		.banner-header-format-column {
			width: 100%;

			.avatar-banner {
				top: 0;
				position: absolute;
				width: 100%;
				height: 11.75em;
			}

			.avatar-picture {
				margin-top: var(--avatarMarginTop);
				margin-bottom: 1.25em;
			}

			.header-text {
				width: 100%;

				.nickname {
					max-width: 100%;
					overflow: hidden;
					text-align: center;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}

				.nickname-small {
					@extend .nickname;
					font-size: 1.125em;
					font-style: normal;
					font-weight: 700;
					line-height: 1.625em;
				}

				.nickname-medium {
					@extend .nickname;
					font-size: 1.25em;
					font-style: normal;
					font-weight: 700;
					line-height: 1.75em;
				}

				.nickname-larger {
					@extend .nickname;
					font-size: 1.5em;
					font-style: normal;
					font-weight: 700;
					line-height: 2em;
				}

				.description {
					max-width: 100%;
					overflow: hidden;
					text-align: center;
				}

				.description-small {
					@extend .description;
					font-size: 0.875em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.25em;
				}

				.description-medium {
					@extend .description;
					font-size: 1em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.5em;
				}

				.description-larger {
					@extend .description;
					font-size: 1.125em;
					font-style: normal;
					font-weight: 400;
					line-height: 1.625em;
				}
			}

			.simple-social-view {
				width: 100%;
				margin-top: 2em;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.bio-social {
					margin: 0 0.375em;
				}
			}
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
			margin: auto auto 1.2em;
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
</style>
