<template>
	<bio-edit-container>
		<span class="block-title">{{ t('blocks.add_a_Block') }}</span>
		<div class="block-button row">
			<block-button
				:type="BLOCK_TYPE.link"
				@click="onAddLinks(BLOCK_TYPE.link)"
			/>
			<block-button
				:type="BLOCK_TYPE.text"
				@click="onAddLinks(BLOCK_TYPE.text)"
			/>
			<block-button
				:type="BLOCK_TYPE.image"
				@click="onAddLinks(BLOCK_TYPE.image)"
			/>
		</div>
		<vue-draggable-next
			v-if="userStore.user && userStore.user.links"
			:list="userStore.user.links"
		>
			<transition-group name="list">
				<template v-for="(item, index) in userStore.user.links" :key="index">
					<block-container
						:index="index"
						:type="BLOCK_TYPE.link"
						v-if="item.type === BLOCK_TYPE.link"
						class="q-mt-md"
					>
						<link-content
							v-model:title="item.title"
							v-model:link="item.url"
							v-model:img-url="item.img"
						/>
					</block-container>
					<block-container
						:index="index"
						:type="BLOCK_TYPE.text"
						v-if="item.type === BLOCK_TYPE.text"
						class="q-mt-md"
					>
						<text-content v-model:title="item.title" />
					</block-container>
					<block-container
						:index="index"
						:type="BLOCK_TYPE.image"
						v-if="item.type === BLOCK_TYPE.image"
						class="q-mt-md"
					>
						<image-content
							v-model:title="item.title"
							v-model:img-url="item.img"
						/>
					</block-container>
				</template>
			</transition-group>
		</vue-draggable-next>
	</bio-edit-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { BLOCK_TYPE, Link } from 'src/types/User';
import BlockButton from 'src/components/block/BlockButton.vue';
import BlockContainer from 'src/components/block/BlockContainer.vue';
import LinkContent from 'src/components/block/LinkContent.vue';
import TextContent from 'src/components/block/TextContent.vue';
import ImageContent from 'src/components/block/ImageContent.vue';
import BioEditContainer from 'src/components/edit/BioEditContainer.vue';
import { useUserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';
const userStore = useUserStore();

interface SubLink extends Link {
	type: BLOCK_TYPE;
	img?: string;
	icon?: string;
}

const { t } = useI18n();
const showAddLinkDialog = ref<boolean>(false);
const addLink = ref<SubLink>({ type: BLOCK_TYPE.link, url: '', title: '' });
const showDialog = ref<boolean>(false);

const setShowDialog = (bl: boolean) => {
	showDialog.value = bl;
};

const onAddLinks = (type: BLOCK_TYPE) => {
	addLink.value.type = type;
	userStore.user!.links?.push(addLink.value);
	showAddLinkDialog.value = false;
	addLink.value = { type, url: '', title: '' };
};
</script>
<style lang="scss">
.block-title {
	font-family: Roboto;
	font-size: 14px;
	font-weight: 500;
	line-height: 20px;
	letter-spacing: 0em;
	text-align: left;
	overflow: hidden;
	color: $ink-1;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.block-button {
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>
