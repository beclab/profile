<template>
	<div class="column" v-if="blockRef">
		<block-nickname
			class="q-mt-sm"
			:type="blockRef.type"
			v-model:text="blockRef.nickName"
		/>
	</div>
</template>

<script lang="ts" setup>
import BlockNickname from 'src/components/block/BlockNickname.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from 'src/stores/user';

const route = useRoute();
const userStore = useUserStore();
const blockRef = ref();

onMounted(() => {
	if (route.params.id && userStore.user) {
		const block = userStore.user.block.data.find((item) => {
			return item.id === route.params.id;
		});
		console.log(block);
		if (block) {
			blockRef.value = block;
		}
	}
});
</script>

<style scoped lang="scss" />
