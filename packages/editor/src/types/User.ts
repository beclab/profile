export interface Social {
	username: string;
	platform: string;
	url: string;
}

export interface Link {
	url: string;
	title: string;
	icon?: string;
	img?: string;
	enabled?: boolean;
}

export interface User {
	avatarUrl?: string;
	terminusName?: string;
	description?: string;
	layoutStyle: number;
	background: {
		style: number;
		uploadImg: string;
		color: string;
		gradientTopColor: string;
		gradientBottomColor: string;
		gradientColor: string;
		localImg: string;
	};
	appearance: {
		nameColor: string;
		bioColor: string;
		socialColor: string;
		buttonColor: string;
		buttonBorderColor: string;
		buttonFontColor: string;
	};
	links: Link[];
	socials: Social[];
}

export enum BLOCK_TYPE {
	link = 'link',
	text = 'text',
	image = 'image'
}
