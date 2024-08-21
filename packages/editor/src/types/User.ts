export interface Social {
	username: string;
	platform: string;
	url: string;
}

export interface Block {
	type: string;
	nickName: string;
	enabled: boolean;
}

export interface LinkBlock extends Block {
	url: string;
	title: string;
	subTitle: string;
	size: string;
	textAlignment: string;
	outline: boolean;
	shadow: boolean;
	icon: string;
}

export interface TextBlock extends Block {
	title: string;
	description: string;
	textAlignment: string;
	transparent: boolean;
}

export interface ImageBlock extends Block {
	title: string;
	description: string;
	img: string;
	ratio: string;
}

export interface ImageBlock extends Block {
	height: string;
	ratio: string;
}

export function getGradientColor(top: string, bottom: string): string {
	return `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`;
}

export interface User {
	header: {
		style: HEADER_STYLE_TYPE;
		banner: string;
		avatarUrl: string;
		profileShape: PROFILE_SHAPE_TYPE;
		profileSize: number;
		profileOutline: boolean;
		nickName: string;
		description: string;
		textSize: SIZE_TYPE;
		format: HEADER_FORMAT_TYPE;
	};
	appearance: {
		theme: AppearanceTheme;
		block: {
			cornerRadius: number;
			style: BLOCK_STYLE_TYPE;
			shadow: boolean;
			outline: boolean;
			transparency: number;
		};
		font: string;
	};
	social: {
		data: Social[];
		size: SIZE_TYPE;
	};
	block: {
		data: Block[];
	};
	layout: {
		style: number;
	};
}

export interface AppearanceTheme {
	style: THEME_TYPE;
	preset: string;
	uploadImg: string;
	background: string;
	filter: IMAGE_FILTER;
	gradientTopColor: string;
	gradientBottomColor: string;
	useUpload: boolean;
	localImg: string;
	header: {
		textColor: string;
	};
	link: {
		background: string;
		textColor: string;
	};
	block: {
		background: string;
		textColor: string;
	};
}

export enum HEADER_FORMAT_TYPE {
	COLUMN = 'column',
	ROW = 'row'
}

export enum THEME_TYPE {
	SOLID = 'solid',
	GRADIENT = 'gradient',
	IMAGE = 'image'
}

export enum BLOCK_STYLE_TYPE {
	SQUARE = 'square',
	ROUND = 'round',
	CUSTOM = 'custom'
}

export enum SIZE_TYPE {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGER = 'larger'
}

export enum IMAGE_FILTER {
	NONE = 'none',
	DARK = 'dark',
	Light = 'light'
}

export enum HEADER_STYLE_TYPE {
	CLASSIC = 'classic',
	PORTRAIT = 'portrait',
	BANNER = 'banner'
}

export enum PROFILE_SHAPE_TYPE {
	CIRCULAR = 'circular',
	SQUARE = 'square'
}

export enum BLOCK_TYPE {
	link = 'link',
	text = 'text',
	image = 'image'
}

export enum FONT_TYPE {
	ROBOTO = 'Roboto',
	POPINS = 'Popins',
	ARVO = 'Arvo',
	BITTER = 'Bitter',
	RIGHTEOUS = 'Righteous',
	LOBSTER = 'Lobster',
	ORBITRON = 'Orbitron',
	AUDIOWIDE = 'Audiowide',
	COURGETTE = 'Courgette'
}
