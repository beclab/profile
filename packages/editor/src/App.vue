<template>
	<router-view />
</template>
<script>
import { defineComponent, onMounted } from 'vue';
import { useUserStore } from 'stores/user';
import axios from 'axios';

export default defineComponent({
	name: 'App',
	async preFetch() {
		if (process.env.ACTION === 'PREVIEW') {
			const userStore = useUserStore();
			return await axios
				.get(process.env.PREVIEW_DOMAIN + '/api/user/init')
				.then((response) => {
					console.log(response.data.data);
					userStore.setUser(response.data.data.profile);
					userStore.setInfo(response.data.data.info);
				});
		}
	},
	setup() {
		const userStore = useUserStore();
		onMounted(async () => {
			if (process.env.ACTION === 'EDITOR') {
				axios
					.get(window.location.origin + '/api/user/init')
					.then((response) => {
						userStore.setUser(response.data.data.profile);
						userStore.setInfo(response.data.data.info);
						userStore.getNftAddress();
					});
			} else {
				const profileName = userStore.user?.terminusName;
				let title = '';
				if (profileName) {
					title = profileName;
				} else {
					title = userStore.info.terminusName;
				}
				document.title = title;
			}
		});
	}
});
</script>
