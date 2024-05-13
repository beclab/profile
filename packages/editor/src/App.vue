<template>
	<router-view />
</template>
<script>
//import { fetchData } from 'src/utils/helper';
//import { User } from 'src/types/User';
import { defineComponent, onMounted } from 'vue';
import { useUserStore } from 'stores/user';
//import { useProvide } from 'src/composables/useContext';
import axios from 'axios';

export default defineComponent({
	name: 'App',
	async preFetch() {
		// if (process.env.ACTION === 'PREVIEW') {
		//   const response = await fetchData('/api/user');
		//   console.log(response);
		//   const userStore = useUserStore();
		//   try {
		//     userStore.setUser(response.data as User);
		//   } catch (e) {
		//     console.log(e);
		//   }
		// }
		const userStore = useUserStore();
		if (process.env.ACTION === 'PREVIEW') {
			return await axios
				.get(window.location.origin + '/api/user/init')
				.then((response) => {
					console.log(response.data.data);

					userStore.setUser(response.data.data.profile);
					userStore.setInfo(response.data.data.info);
				});
		}
	},
	setup() {
		//const { initUserData } = useProvide();
		const userStore = useUserStore();

		onMounted(async () => {
			if (process.env.ACTION === 'EDITOR') {
				axios
					.get(window.location.origin + '/api/user/init')
					.then((response) => {
						userStore.setUser(response.data.data.profile);
						userStore.setInfo(response.data.data.info);

						const appTerminusName = response.data.data.info.appTerminusName;
						const terminusName = response.data.data.profile.terminusName;
						let did = '';
						if (terminusName) {
							did = terminusName;
						} else {
							did = appTerminusName.slice(0, appTerminusName.indexOf('@'));
						}
						document.title = `${did} | Terminus HomePage`;

						// initUserData(userStore.user);
						userStore.getNftAddress();
					});
			}
			// if (process.env.ACTION === 'EDITOR') {
			//   const userStore = useUserStore();
			//   try {
			//     const response = await fetchData('/api/user');
			//     console.log(response);
			//     initUserData(response.data as User);
			//     userStore.getNftAddress();
			//   } catch (e) {
			//     console.log(e);
			//   }
			// }
			// axios.get('/api/backend/v1/terminus-info');
		});
	}
});
</script>
