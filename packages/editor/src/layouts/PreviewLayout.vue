<template>
	<div
		class="preview-layout"
		:style="{
			'--size': platform.is.desktop ? '20px' : '30px'
		}"
		v-if="userStore.user"
	>
		<BioLayoutComponent1 :use-em="true" :user="userStore.user" />
	</div>
</template>

<script lang="ts" setup>
import BioLayoutComponent1 from 'components/layout/BioLayoutComponent1.vue';
import { useQuasar } from 'quasar';
import { useUserStore } from 'src/stores/user';
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
	font-size: var(--size) !important;
}
</style>
