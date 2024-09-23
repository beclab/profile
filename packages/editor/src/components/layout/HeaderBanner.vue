<template>
	<q-responsive
		v-if="header.style === HEADER_STYLE_TYPE.BANNER"
		class="avatar-banner"
		:ratio="2"
	>
		<div class="full-width" :style="bannerStyle" />
	</q-responsive>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { HEADER_STYLE_TYPE, UserHeader } from 'src/types/User';

const props = defineProps({
	header: {
		type: Object as PropType<UserHeader>,
		required: true
	}
});

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
.avatar-banner {
	top: 0;
	position: absolute;
	width: 100%;
}
</style>
