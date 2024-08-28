<template>
	<q-scroll-area class="design-scroll" :thumb-style="scrollBarStyle.thumbStyle">
		<div class="design-area column">
			<slot />
		</div>
	</q-scroll-area>
</template>

<script lang="ts" setup>
import { scrollBarStyle } from 'src/utils/helper';
</script>

<style scoped lang="scss">
.design-scroll {
	width: 100%;
	height: 100%;

	.design-area {
		width: 100%;
		height: 100%;
		padding-left: calc((100% - 440px) / 2);
		padding-right: calc((100% - 440px) / 2);
		padding-bottom: 32px;
	}
}
</style>
