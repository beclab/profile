<template>
	<div class="preview-layout" v-if="userStore.user">
		<preview-layout
			:style="{
				height: userStore.isMobile ? 'calc(100% - 64px)' : '100vh'
			}"
			:font-size="userStore.isMobile ? 20 : 25"
			:user="userStore.user"
			:pc="platform.is.desktop"
		/>
		<bio-share-header v-if="userStore.isMobile" class="po" />
	</div>
</template>

<script lang="ts" setup>
import PreviewLayout from 'src/components/layout/PreviewLayout.vue';
import BioShareHeader from 'src/components/share/BioShareHeader.vue';
import { useUserStore } from 'src/stores/user';
import { useQuasar } from 'quasar';
//import { ref } from 'vue';

const userStore = useUserStore();
// const currentView = ref();

// if (userStore.user && userStore.user.background.style === 0) {
//   currentView.value = BioLayoutComponent1;
// }
const { platform } = useQuasar();

console.log(!!platform.is.desktop);
</script>

<style lang="scss" scoped>
.preview-layout {
	width: 100vw;
	height: 100vh;
}
</style>
