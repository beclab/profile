// import { provide, inject, ref, watch } from 'vue';
// import { User } from '../types/User';
// import type { InjectionKey, Ref } from 'vue';
// import { debouncedFetchData } from '../utils/helper';

// const UserKey = Symbol() as InjectionKey<Ref<User | null>>;

// export function useInject() {

//   const userData = inject(UserKey, ref<User | null>(null));
//   const updateUserData = (data: User) => {
//     console.log(data)
//     userData.value = data;
//   };

//   watch(
//     userData,
//     () => {
//       console.log(userData.value?.avatarUrl)
//       debouncedFetchData('/api/user', 'POST', userData.value);
//     },
//     {deep: true}
//   );

//   return {userData, updateUserData};
// }

// export function useProvide() {
//   const userData = ref<User | null>(null);
//   const initUserData = (data: User | null) => {
//     userData.value = data;
//     console.log(userData.value)
//   };

//   provide(UserKey, userData);

//   return {UserKey, userData, initUserData};
// }
