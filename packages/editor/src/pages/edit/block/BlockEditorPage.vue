<template>
	<edit-container>
		<div class="column">
			<div
				class="row justify-start items-center cursor-pointer text-ink-1 q-my-xl"
				@click="onBack"
			>
				<q-icon name="sym_r_arrow_back_ios_new" style="margin: 6px" />
				<div class="text-subtitle2">{{ t('base.back') }}</div>
			</div>
		</div>
	</edit-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import EditContainer from 'src/pages/edit/EditContainer.vue';

const router = useRouter();
const { t } = useI18n();
const onBack = () => {
	router.back();
};
</script>
<style lang="scss"></style>
