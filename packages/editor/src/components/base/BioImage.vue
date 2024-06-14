<template>
	<BtUploader
		class="bio-img"
		:size="5"
		fileName="image"
		accept=".jpg, image/*"
		action="/images/upload/v1"
		@ok="ok"
		width="72"
		height="72"
		@fail="fail"
	>
		<q-img v-if="imgUrl" class="bio-img" :src="imgUrl" />
		<div v-else class="bio-img-none column justify-center items-center">
			<q-icon size="32px" color="ink-3" name="sym_r_imagesmode" />
		</div>
	</BtUploader>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';

const $q = useQuasar();

defineProps({
	imgUrl: String
});
const emit = defineEmits(['update:imgUrl']);

const ok = (response: {
	code: number;
	data: { imageUrl: string; size: any };
	message: string;
}) => {
	console.log('ok ');
	console.log(response.data);

	if (response.code !== 200) {
		$q.notify(response.message);
		return;
	}

	emit('update:imgUrl', response.data.imageUrl);
};

const fail = (response: unknown) => {
	console.log('fail', response);
};
</script>

<style scoped lang="scss">
.bio-img {
	width: 72px;
	height: 72px;
	border-radius: 8px;
}

.bio-img-background {
	width: 72px;
	height: 48px;
}

.bio-img-none {
	width: 72px;
	height: 72px;
	border-radius: 8px;
	background: $background-3;
	border: $separator-2;
}
</style>
