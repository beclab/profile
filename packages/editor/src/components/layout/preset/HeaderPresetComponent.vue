<template>
	<div
		v-if="header"
		:style="{ fontSize: `${fontSize}px`, fontFamily: FONT_TYPE.ROBOTO }"
		class="container-wrapper"
	>
		<div
			class="preview-container column items-center"
			:class="
				header.style === HEADER_STYLE_TYPE.PORTRAIT
					? ''
					: 'preview-container-padding'
			"
			:style="{ background: '#FFFFFF' }"
		>
			<header-preview
				:header="header"
				:social="social"
				:social-clickable="false"
				text-color="#1F1F1F"
			/>
		</div>
	</div>
</template>
<script lang="ts" setup>
import HeaderPreview from 'src/components/layout/HeaderPreview.vue';
import { PropType } from 'vue';
import {
	HEADER_STYLE_TYPE,
	UserHeader,
	FONT_TYPE,
	UserSocial
} from 'src/types/User';

defineProps({
	header: {
		type: Object as PropType<UserHeader>,
		required: true
	},
	social: {
		type: Object as PropType<UserSocial>,
		required: true
	},
	fontSize: {
		type: Number,
		default: 5.12
	}
});
</script>
<style scoped lang="scss" />
