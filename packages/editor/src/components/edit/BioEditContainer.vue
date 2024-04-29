<template>
	<q-scroll-area
		class="design-scroll"
		style="height: 100%"
		:thumb-style="scrollBarStyle.thumbStyle"
	>
		<div class="design-parent column items-center">
			<div class="design-area">
				<slot />
			</div>
		</div>
	</q-scroll-area>
</template>

<script lang="ts" setup>
import { scrollBarStyle } from '../../utils/helper';
</script>

<style scoped lang="scss">
.design-scroll {
	width: 100%;
	height: 100%;

	.design-parent {
		width: 100%;
		height: 100%;

		.design-area {
			width: 400px;
			height: 100%;
			padding-top: 32px;
			padding-bottom: 32px;
		}
	}
}
</style>
