<template>
	<div
		v-if="header.style === HEADER_STYLE_TYPE.CLASSIC"
		class="justify-center items-center"
		:class="
			header.format
				? 'classic-header-format-' +
					header.format.toLowerCase() +
					' ' +
					header.format.toLowerCase()
				: 'classic-header-format-column column'
		"
	>
		<profile-terminus-avatar
			class="avatar-picture"
			:info="userStore.info"
			:show-border="header.profileOutline"
			:size="header.profileSize / 16 + 'em'"
			:radius="
				header.profileShape === PROFILE_SHAPE_TYPE.CIRCULAR ? '50%' : '0.75em'
			"
		/>
		<div
			class="header-text column"
			:style="{
				'--avatarSize': header.profileSize / 16 + 'em'
			}"
		>
			<div
				v-if="header.nickName"
				:class="
					header.textSize
						? 'nickname-' + header.textSize.toLowerCase()
						: 'nickname-medium'
				"
				:style="{ color: textColor }"
			>
				{{ header.nickName }}
			</div>
			<div
				v-if="header.description"
				:class="
					header.textSize
						? 'description-' + header.textSize.toLowerCase()
						: 'description-medium'
				"
				:style="{ color: textColor }"
			>
				{{ header.description }}
			</div>
		</div>
		<social-preview
			:style="{
				marginTop: header.format === HEADER_FORMAT_TYPE.COLUMN ? '' : '0.75em'
			}"
			:social="social"
			:color="textColor"
			:clickable="socialClickable"
			:justify="header.format === HEADER_FORMAT_TYPE.COLUMN ? 'center' : 'left'"
		/>
	</div>

	<div
		v-if="header.style === HEADER_STYLE_TYPE.PORTRAIT"
		class="portrait-header-format-column column justify-center items-center"
	>
		<profile-terminus-avatar
			:info="userStore.info"
			:show-border="false"
			:mask="true"
			radius="0"
		/>
		<div class="header-text column">
			<div
				v-if="header.nickName"
				:class="
					header.textSize
						? 'nickname-' + header.textSize.toLowerCase()
						: 'nickname-medium'
				"
				:style="{ color: textColor }"
			>
				{{ header.nickName }}
			</div>
			<div
				v-if="header.description"
				:class="
					header.textSize
						? 'description-' + header.textSize.toLowerCase()
						: 'description-medium'
				"
				:style="{ color: textColor }"
			>
				{{ header.description }}
			</div>
		</div>
		<social-preview
			:social="social"
			:clickable="socialClickable"
			:color="textColor"
		/>
	</div>

	<div
		v-if="header.style === HEADER_STYLE_TYPE.BANNER"
		class="banner-header-format-column column justify-center items-center"
	>
		<div class="avatar-banner" :style="bannerStyle" />

		<profile-terminus-avatar
			class="avatar-picture"
			:style="{
				'--avatarMarginTop': 11.75 - 2.5 - header.profileSize / 16 / 2 + 'em'
			}"
			:info="userStore.info"
			:show-border="header.profileOutline"
			:size="header.profileSize / 16 + 'em'"
			:radius="
				header.profileShape === PROFILE_SHAPE_TYPE.CIRCULAR ? '50%' : '0.75em'
			"
		/>
		<div class="header-text column">
			<div
				v-if="header.nickName"
				:class="
					header.textSize
						? 'nickname-' + header.textSize.toLowerCase()
						: 'nickname-medium'
				"
				:style="{ color: textColor }"
			>
				{{ header.nickName }}
			</div>
			<div
				v-if="header.description"
				:class="
					header.textSize
						? 'description-' + header.textSize.toLowerCase()
						: 'description-medium'
				"
				:style="{ color: textColor }"
			>
				{{ header.description }}
			</div>
		</div>
		<social-preview
			:social="social"
			:clickable="socialClickable"
			:color="textColor"
		/>
	</div>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue';
import {
	HEADER_STYLE_TYPE,
	PROFILE_SHAPE_TYPE,
	HEADER_FORMAT_TYPE,
	UserHeader,
	UserSocial
} from 'src/types/User';
import { useUserStore } from 'src/stores/user';
import ProfileTerminusAvatar from '../avatar/ProfileTerminusAvatar.vue';
import SocialPreview from 'src/components/layout/SocialPreview.vue';

const props = defineProps({
	header: {
		type: Object as PropType<UserHeader>,
		required: true
	},
	social: {
		type: Object as PropType<UserSocial>,
		required: true
	},
	textColor: {
		type: String,
		require: true
	},
	socialClickable: {
		type: Boolean,
		require: true
	}
});

const userStore = useUserStore();

const bannerStyle = computed(() => {
	if (props.header.banner) {
		return {
			background: `url("${props.header.banner}")`,
			'background-size': 'cover'
		};
	}
	return {
		'background-image': `url("/banner/banner_default.jpg")`,
		'background-size': 'cover'
	};
});
</script>
<style scoped lang="scss">
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
}
</style>
