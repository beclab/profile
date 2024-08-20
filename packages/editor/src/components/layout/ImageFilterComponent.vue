<template>
	<div :style="{ fontSize: `${fontSize}px` }" class="container-wrapper">
		<div
			class="preview-container preview-container-padding column items-center"
			:style="backgroundStyle"
		/>
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
	imageUrl: {
		type: String,
		required: true
	},
	fontSize: {
		type: Number,
		default: 16
	}
});

const backgroundStyle = computed(() => {
	return {
		background: `url("${props.imageUrl}")`,
		'background-size': 'cover'
	};
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
	}
}
</style>
