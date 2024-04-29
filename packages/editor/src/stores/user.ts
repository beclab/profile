import { defineStore } from 'pinia';
import { User } from 'src/types/User';
import axios from 'axios';
import { Encoder, TerminusInfo, DefaultTerminusInfo } from '@bytetrade/core';

export enum CloudLoginState {
	NOT_CHECK = 0,
	YES = 1,
	NO = 2
}
export type UserStoreState = {
	info: TerminusInfo;
	user: User | null;
	nfts: NFTAddress[];
	cloud_login: CloudLoginState;
};

export interface VerifiablePresentation {
	'@context'?: any;
	id?: string;
	holder?: string;
	type: any;
	presentation_submission: any;
	verifiableCredential?: any[];
	proof?: any;
}

export interface NFTAddress {
	terminusName: string;
	nftName: string;
	tokenID: string;
	tokenName: string;
	ethAddressID: number;
	updateAt: number;
	chainType: string;
	userid: string;
	createAt: number;
	tokenAddress: string;
	imageUrl: string;
	terminusNameID: number;
	vp: string;
	id: number;
	ethAddress: string;
	did: string;
	status: string;
}

export const useUserStore = defineStore('userStore', {
	state: () => {
		return {
			info: DefaultTerminusInfo,
			user: null,
			nfts: [],
			cloud_login: CloudLoginState.NOT_CHECK
		} as UserStoreState;
	},

	getters: {
		getUser(): User | null {
			return this.user;
		}
	},

	actions: {
		setUser(user: User) {
			this.user = user;
		},

		setInfo(nn: TerminusInfo) {
			this.info = nn;
		},

		async getNftAddress() {
			try {
				this.cloud_login = CloudLoginState.NOT_CHECK;

				const reponse: any = await axios.get(
					window.location.origin + '/api/cloud/getNFTAddress'
				);
				const data = reponse.data;
				console.log(data);
				console.log(data.data);
				if (data.code != 0) {
					this.cloud_login = CloudLoginState.NO;
					this.nfts = [];
					return;
				}

				this.nfts = [];
				this.cloud_login = CloudLoginState.YES;

				for (let i = 0; i < data.data.address.length; ++i) {
					console.log(data.data.address[i]);
					const address: NFTAddress = data.data.address[i];
					if (address.imageUrl.startsWith('ipfs://')) {
						address.imageUrl = address.imageUrl.replace(
							'ipfs://',
							'https://gateway.ipfs.io/ipfs/'
						);
					}
					this.nfts.push(address);
					console.log(address);
					const vp: VerifiablePresentation = JSON.parse(address.vp);
					console.log(vp);
					const vcstr = Encoder.bytesToString(
						Encoder.base64UrlToBytes(vp.verifiableCredential![0].split('.')[1])
					);
					console.log(vcstr);
					const vc = JSON.parse(vcstr);
					console.log(vc);
					console.log(vc.vc.credentialSubject.image);
				}
			} catch (e) {
				console.log(e);
				this.cloud_login = CloudLoginState.NO;
				this.nfts = [];
			}
		}
	}
});
