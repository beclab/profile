<template>
	<bio-edit-container>
		<span class="social-title">{{ t('social.add_social_links') }}</span>

		<div class="row items-start full-width q-mt-lg">
			<template v-for="(item, key, index) in SocialMap" :key="index">
				<social-button
					:platform="item.platform"
					:display="index < 15 || expandRef"
					:style="{
						marginLeft: index % 8 === 0 ? '0' : '11px',
						marginTop: index < 8 ? '0' : '12px'
					}"
				/>
			</template>
			<social-expand-button
				v-model:expand="expandRef"
				style="margin-left: 11px; margin-top: 12px"
			/>
		</div>

		<div class="row items-start full-width q-mt-lg">
			<vue-draggable-next
				style="width: 100%"
				v-if="userStore.user !== null && userStore.user.socials"
				:list="userStore.user.socials"
			>
				<transition-group name="list">
					<template
						v-for="(item, index) in userStore.user.socials"
						:key="index"
					>
						<social-edit-item
							:platform="item.platform"
							:url="item.url"
							v-model:user-name="item.username"
							:style="{
								marginTop: '12px'
							}"
						/>
					</template>
				</transition-group>
			</vue-draggable-next>
		</div>
	</bio-edit-container>
</template>

<script lang="ts" setup>
import SocialButton from 'components/social/SocialButton.vue';
import SocialEditItem from 'components/social/SocialEditItem.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import SocialExpandButton from 'components/social/SocialExpandButton.vue';
import BioEditContainer from 'components/edit/BioEditContainer.vue';
import { ref } from 'vue';
import { SocialMap } from 'src/types/SocialProps';
import { useUserStore } from 'src/stores/user';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const expandRef = ref(false);
const userStore = useUserStore();
</script>
<style lang="scss">
.social-title {
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
</style>
