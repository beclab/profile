<template>
	<div
		v-if="user"
		:style="{ fontSize: `${fontSize}px`, fontFamily: user.appearance.font }"
		class="container-wrapper"
	>
		<q-scroll-area class="full-width full-height">
			<div
				class="preview-container column items-center"
				:class="
					user.header.style === HEADER_STYLE_TYPE.PORTRAIT
						? ''
						: 'preview-container-padding'
				"
				:style="backgroundStyle"
			>
				<div
					v-if="props.user.appearance.theme.style === THEME_TYPE.IMAGE"
					class="overlay"
					:style="backgroundOverlay"
				/>
				<div
					v-if="user.header.style === HEADER_STYLE_TYPE.CLASSIC"
					class="justify-center items-center"
					:class="
						user.header.format
							? 'classic-header-format-' +
								user.header.format.toLowerCase() +
								' ' +
								user.header.format.toLowerCase()
							: 'classic-header-format-column column'
					"
				>
					<profile-terminus-avatar
						class="avatar-picture"
						:info="userStore.info"
						:show-border="user.header.profileOutline"
						:size="user.header.profileSize / 16 + 'em'"
						:radius="
							user.header.profileShape === PROFILE_SHAPE_TYPE.CIRCULAR
								? '50%'
								: '0.75em'
						"
					/>
					<div
						class="header-text column"
						:style="{
							'--avatarSize': user.header.profileSize / 16 + 'em'
						}"
					>
						<div
							v-if="user.header.nickName"
							:class="
								user.header.textSize
									? 'nickname-' + user.header.textSize.toLowerCase()
									: 'nickname-medium'
							"
							:style="{ color: user.appearance.theme.header.textColor }"
						>
							{{ user.header.nickName }}
						</div>
						<div
							v-if="user.header.description"
							:class="
								user.header.textSize
									? 'description-' + user.header.textSize.toLowerCase()
									: 'description-medium'
							"
							:style="{ color: user.appearance.theme.header.textColor }"
						>
							{{ user.header.description }}
						</div>
					</div>
					<div class="simple-social-view">
						<template v-for="item in user.social.data" :key="item.url">
							<a
								target="_blank"
								class="bio-social"
								:style="{ color: user.appearance.theme.header.textColor }"
								:href="getSocialUrl(item)"
							>
								<social-svg
									:width="socialSize"
									:height="socialSize"
									:platform="item.platform"
								/>
							</a>
						</template>
					</div>
				</div>

				<div
					v-if="user.header.style === HEADER_STYLE_TYPE.PORTRAIT"
					class="portrait-header-format-column column justify-center items-center"
				>
					<profile-terminus-avatar
						class="avatar-picture"
						:info="userStore.info"
						:show-border="false"
						:mask="true"
						radius="0"
					/>
					<div class="header-text column">
						<div
							v-if="user.header.nickName"
							:class="
								user.header.textSize
									? 'nickname-' + user.header.textSize.toLowerCase()
									: 'nickname-medium'
							"
							:style="{ color: user.appearance.theme.header.textColor }"
						>
							{{ user.header.nickName }}
						</div>
						<div
							v-if="user.header.description"
							:class="
								user.header.textSize
									? 'description-' + user.header.textSize.toLowerCase()
									: 'description-medium'
							"
							:style="{ color: user.appearance.theme.header.textColor }"
						>
							{{ user.header.description }}
						</div>
					</div>
					<div class="simple-social-view">
						<template v-for="item in user.social.data" :key="item.url">
							<a
								target="_blank"
								class="bio-social"
								:style="{ color: user.appearance.theme.header.textColor }"
								:href="getSocialUrl(item)"
							>
								<social-svg
									width="2em"
									height="2em"
									:platform="item.platform"
								/>
							</a>
						</template>
					</div>
				</div>

				<div
					v-if="user.header.style === HEADER_STYLE_TYPE.BANNER"
					class="banner-header-format-column column justify-center items-center"
				>
					<div class="avatar-banner" :style="bannerStyle" />

					<profile-terminus-avatar
						class="avatar-picture"
						:style="{
							'--avatarMarginTop':
								11.75 - 2.5 - user.header.profileSize / 16 / 2 + 'em'
						}"
						:info="userStore.info"
						:show-border="user.header.profileOutline"
						:size="user.header.profileSize / 16 + 'em'"
						:radius="
							user.header.profileShape === PROFILE_SHAPE_TYPE.CIRCULAR
								? '50%'
								: '0.75em'
						"
					/>
					<div class="header-text column">
						<div
							v-if="user.header.nickName"
							:class="
								user.header.textSize
									? 'nickname-' + user.header.textSize.toLowerCase()
									: 'nickname-medium'
							"
							:style="{ color: user.appearance.theme.header.textColor }"
						>
							{{ user.header.nickName }}
						</div>
						<div
							v-if="user.header.description"
							:class="
								user.header.textSize
									? 'description-' + user.header.textSize.toLowerCase()
									: 'description-medium'
							"
							:style="{ color: user.appearance.theme.header.textColor }"
						>
							{{ user.header.description }}
						</div>
					</div>
					<div class="simple-social-view">
						<template v-for="item in user.social.data" :key="item.url">
							<a
								target="_blank"
								class="bio-social"
								:style="{ color: user.appearance.theme.header.textColor }"
								:href="getSocialUrl(item)"
							>
								<social-svg
									width="2em"
									height="2em"
									:platform="item.platform"
								/>
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
				<div
					class="blocks-margin full-width"
					:style="{
						paddingLeft:
							user.header.style === HEADER_STYLE_TYPE.PORTRAIT ? '1.25em' : '',
						paddingRight:
							user.header.style === HEADER_STYLE_TYPE.PORTRAIT ? '1.25em' : ''
					}"
				>
					<template v-for="item in enabledLinks" :key="item.url">
						<div
							class="blocks-div row items-center"
							v-if="item.type === BLOCK_TYPE.LINK"
							@click="onOpenWindow(item.url)"
							:style="{
								boxShadow: item.shadow
									? '0px 8px 0px 0px rgba(0, 0, 0, 0.20)'
									: '',
								border: item.outline ? `2px solid ${ink1.color.value}` : '',
								borderRadius: blockRadius,
								background: blockBackground,
								color: user.appearance.theme.link.textColor
							}"
						>
							<q-img
								class="link-img"
								v-if="item.img && item.img !== ''"
								:src="item.img"
							/>
							<div
								class="link-text column"
								:style="{
									width: item.img ? 'calc(100% - 4em)' : '100%',
									textAlign:
										item.textAlignment === ALIGNMENT_TYPE.LEFT
											? 'left'
											: item.textAlignment === ALIGNMENT_TYPE.RIGHT
												? 'right'
												: 'center'
								}"
							>
								<div
									:class="
										item.size === SIZE_TYPE.SMALL
											? 'link-title-small'
											: 'link-title-larger'
									"
								>
									{{ item.title }}
								</div>
								<div
									:class="
										item.size === SIZE_TYPE.SMALL
											? 'link-sub-title-small'
											: 'link-sub-title-larger'
									"
								>
									{{ item.subTitle }}
								</div>
							</div>
						</div>
						<div
							v-if="item.type === BLOCK_TYPE.TEXT"
							class="blocks-div column"
							:style="{
								boxShadow: user.appearance.block.shadow
									? '0px 8px 0px 0px rgba(0, 0, 0, 0.20)'
									: '',
								border: user.appearance.block.outline
									? `2px solid ${ink1.color.value}`
									: '',
								borderRadius: blockRadius,
								background: blockBackground,
								color: user.appearance.theme.block.textColor
							}"
						>
							<div class="text-title">
								{{ item.title }}
							</div>
							<div class="text-description">
								{{ item.description }}
							</div>
						</div>
						<div class="image-parent" v-if="item.type === BLOCK_TYPE.IMAGE">
							<img
								class="image-background"
								:src="item.img ? item.img : '/block_image_default.svg'"
							/>
							<a
								class="image-title"
								:style="{
									boxShadow: user.appearance.block.shadow
										? '0px 8px 0px 0px rgba(0, 0, 0, 0.20)'
										: '',
									border: user.appearance.block.outline
										? `2px solid ${ink1.color.value}`
										: '',
									borderRadius: blockRadius,
									background: blockBackground,
									color: user.appearance.theme.block.textColor
								}"
							>
								{{ item.title }}
							</a>
						</div>
					</template>
				</div>
			</div>
		</q-scroll-area>
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
	PROFILE_SHAPE_TYPE,
	SIZE_TYPE,
	ALIGNMENT_TYPE,
	getGradientColor,
	BLOCK_STYLE_TYPE,
	IMAGE_FILTER
} from 'src/types/User';
import SocialSvg from 'src/components/social/SocialSvg.vue';
import { useUserStore } from 'src/stores/user';
import ProfileTerminusAvatar from '../avatar/ProfileTerminusAvatar.vue';
import { useI18n } from 'vue-i18n';
import { useColor } from '@bytetrade/ui';
import { colorsRgba } from 'quasar/dist/types/utils/colors';
import { colors } from 'quasar';
import hexToRgb = colors.hexToRgb;
import rgbToHex = colors.rgbToHex;

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
const ink1 = useColor('ink-1');

const backgroundStyle = computed(() => {
	switch (props.user.appearance.theme.style) {
		case THEME_TYPE.SOLID:
			return { 'background-color': props.user.appearance.theme.background };
		case THEME_TYPE.GRADIENT:
			return {
				background: getGradientColor(
					props.user.appearance.theme.gradientTopColor,
					props.user.appearance.theme.gradientBottomColor
				)
			};
		case THEME_TYPE.IMAGE:
			if (props.user.appearance.theme.useUpload) {
				return {
					background: `url("${props.user.appearance.theme.uploadImg}")`,
					'background-size': 'cover'
				};
			} else {
				return {
					'background-image': `url("/background/${props.user.appearance.theme.localImg}")`,
					'background-size': 'cover'
				};
			}
		default:
			return {};
	}
});

const backgroundOverlay = computed(() => {
	switch (props.user.appearance.theme.filter) {
		case IMAGE_FILTER.DARK:
			return {
				background: 'rgba(0, 0, 0, 0.3)'
			};
		case IMAGE_FILTER.Light:
			return {
				background: 'rgba(255, 255, 255, 0.30)'
			};
		default:
			return '';
	}
});

const blockRadius = computed(() => {
	switch (props.user.appearance.block.style) {
		case BLOCK_STYLE_TYPE.ROUND:
			return '32px';
		case BLOCK_STYLE_TYPE.SQUARE:
			return '0px';
		case BLOCK_STYLE_TYPE.CUSTOM:
			return props.user.appearance.block.cornerRadius + 'px';
		default:
			return '32px';
	}
});

const socialSize = computed(() => {
	switch (props.user.social.size) {
		case SIZE_TYPE.SMALL:
			return '1.5em';
		case SIZE_TYPE.MEDIUM:
			return '2em';
		case SIZE_TYPE.LARGER:
			return '2.5em';
		default:
			return '2em';
	}
});

const blockBackground = computed(() => {
	const rgba: colorsRgba = hexToRgb(
		props.user.appearance.theme.block.background
	);
	rgba.a = 100 - props.user.appearance.block.transparency;
	return rgbToHex(rgba);
});

const bannerStyle = computed(() => {
	if (props.user.header.banner) {
		return {
			background: `url("${props.user.header.banner}")`,
			'background-size': 'cover'
		};
	}
	return {
		'background-image': `url("/banner/banner_default.jpg")`,
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

const onOpenWindow = (url: string) => {
	window.open(url);
};
</script>
<style scoped lang="scss">
::-webkit-scrollbar {
	/*隐藏滚轮*/
	display: none;
}

.container-wrapper {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.preview-container-padding {
		width: 100%;
		padding: 2.5em 1.25em 0;
	}

	.preview-container {
		min-height: 49.8em;
		width: 100%;

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

		.blocks-margin {
			margin-top: 0.75em;
			margin-bottom: 0.75em;

			.image-parent {
				width: 100%;
				margin-top: 1.25em;

				.image-background {
					width: 100%;
					object-fit: cover;
				}
			}

			.blocks-div {
				width: 100%;
				margin-top: 1.25em;
				padding: 1.25em;

				.text-title {
					overflow: hidden;
					text-align: center;
					text-overflow: ellipsis;
					font-size: 1.5rem;
					font-style: normal;
					font-weight: 700;
					line-height: 2rem;
				}

				.text-description {
					overflow: hidden;
					text-align: center;
					text-overflow: ellipsis;
					font-size: 1rem;
					font-style: normal;
					font-weight: 400;
					line-height: 1.5rem;
				}

				.link-img {
					width: 3.25em;
					height: 3.25em;
					border-radius: 50%;
				}

				.link-text {
					margin-left: 0.75em;

					.link-title {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: pre-line;
						height: auto;
						cursor: pointer;
					}

					.link-title-small {
						@extend .link-title;
						font-size: 1.25rem;
						font-style: normal;
						font-weight: 700;
						line-height: 1.75rem;
					}

					.link-title-larger {
						@extend .link-title;
						font-size: 1.5rem;
						font-style: normal;
						font-weight: 700;
						line-height: 2rem;
					}

					.link-sub-title-small {
						@extend .link-title;
						font-size: 0.875rem;
						font-style: normal;
						font-weight: 400;
						line-height: 1.25rem;
					}

					.link-sub-title-larger {
						@extend .link-title;
						font-size: 1.125rem;
						font-style: normal;
						font-weight: 400;
						line-height: 1.625rem;
					}
				}
			}
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
