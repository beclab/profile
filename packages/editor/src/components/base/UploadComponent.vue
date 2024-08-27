<template>
	<BtUploader
		class="bio-img"
		:size="5"
		fileName="image"
		accept=".jpg, image/*"
		action="/images/upload/v1"
		@ok="ok"
		:width="width"
		:height="height"
		@fail="fail"
	>
		<q-img
			v-if="imgUrl"
			:style="{ width: width, height: height }"
			class="bio-img"
			:src="imgUrl"
		/>
		<q-img
			v-else-if="placeholder"
			:style="{ width: width, height: height }"
			class="bio-img"
			:src="placeholder"
		>
			<q-img class="image-change" src="image_change.png" />
		</q-img>
		<div
			v-else
			:style="{ width: width, height: height }"
			class="bio-img-none column justify-center items-center"
		>
			<q-icon size="32px" color="ink-3" name="sym_r_imagesmode" />
		</div>
	</BtUploader>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { BtNotify, NotifyDefinedType } from '@bytetrade/ui';

const $q = useQuasar();

defineProps({
	imgUrl: {
		type: String,
		require: true
	},
	placeholder: {
		type: String,
		require: false
	},
	width: {
		type: String,
		default: '72px'
	},
	height: {
		type: String,
		default: '72px'
	}
});
const emit = defineEmits(['update:imgUrl']);

const ok = (response: {
	code: number;
	data: { imageUrl: string; size: any };
	message: string;
}) => {
	console.log('ok ');
	if (response.code !== 200) {
		$q.notify(response.message);
		return;
	}

	emit('update:imgUrl', response.data.imageUrl);
};

const fail = (response: unknown) => {
	BtNotify.show({
		type: NotifyDefinedType.FAILED,
		message: response
	});
};
</script>

<style scoped lang="scss">
.bio-img {
	border-radius: 8px;
	position: relative;
}

.image-change {
	position: absolute;
	top: calc(50% - 22px);
	left: calc(50% - 22px);
	width: 44px;
	height: 44px;
	background: transparent;
}

.bio-img-none {
	border-radius: 8px;
	background: $background-3;
	border: $separator-2;
}
</style>
