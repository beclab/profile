<template>
	<div class="preview-layout" v-if="userStore.user">
		<bio-layout-component1
			:font-size="platform.is.desktop ? 20 : 25"
			:user="userStore.user"
		/>
	</div>
</template>

<script lang="ts" setup>
import BioLayoutComponent1 from 'src/components/layout/BioLayoutComponent1.vue';
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
}
</style>
