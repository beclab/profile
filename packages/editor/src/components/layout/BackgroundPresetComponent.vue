<template>
	<div :style="{ fontSize: `${fontSize}px` }" class="container-wrapper">
		<div
			class="preview-container preview-container-padding column items-center"
			:style="backgroundStyle"
		/>
	</div>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { THEME_TYPE, AppearanceTheme, getGradientColor } from 'src/types/User';

const props = defineProps({
	theme: {
		type: Object as PropType<AppearanceTheme>,
		require: true
	},
	fontSize: {
		type: Number,
		default: 16
	}
});

const backgroundStyle = computed(() => {
	if (props.theme) {
		switch (props.theme.style) {
			case THEME_TYPE.SOLID:
				return { 'background-color': props.theme.background };
			case THEME_TYPE.GRADIENT:
				return {
					background: getGradientColor(
						props.theme.gradientTopColor,
						props.theme.gradientBottomColor
					)
				};
			case THEME_TYPE.IMAGE:
				if (props.theme.useUpload) {
					return {
						background: `url("${props.theme.uploadImg}")`,
						'background-size': 'cover'
					};
				} else {
					return {
						'background-image': `url("/background/${props.theme.localImg}")`,
						'background-size': 'cover'
					};
				}
			default:
				return {};
		}
	}
	return {};
});
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

	.preview-container-padding {
		padding: 2.5em 1.25em;
	}

	.preview-container {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
}
</style>
