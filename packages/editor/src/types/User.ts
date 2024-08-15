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
		theme: {
			style: THEME_TYPE;
			uploadImg: string;
			color: string;
			gradientTopColor: string;
			gradientBottomColor: string;
			gradientColor: string;
			localImg: string;
		};
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

export enum HEADER_FORMAT_TYPE {
	COLUMN = 'column',
	ROW = 'row'
}

export enum THEME_TYPE {
	SOLID = 'solid',
	GRADIENT = 'gradient',
	IMAGE = 'image',
	UPLOAD = 'upload'
}

export enum BLOCK_STYLE_TYPE {
	CIRCULAR = 'circular',
	SQUARE = 'square',
	CUSTOM = 'custom'
}

export enum SIZE_TYPE {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGER = 'larger'
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
	POPINS = 'Roboto',
	ARVO = 'Arvo',
	BITTER = 'Bitter',
	RIGHTEOUS = 'Righteous',
	LOBSTER = 'Lobster',
	ORBITRON = 'Orbitron',
	AUDIOWIDE = 'Audiowide',
	COURGETTE = 'Courgette'
}

export const FONT_ARRAY = [
	FONT_TYPE.ROBOTO,
	FONT_TYPE.POPINS,
	FONT_TYPE.ARVO,
	FONT_TYPE.BITTER,
	FONT_TYPE.RIGHTEOUS,
	FONT_TYPE.LOBSTER,
	FONT_TYPE.ORBITRON,
	FONT_TYPE.AUDIOWIDE,
	FONT_TYPE.COURGETTE
];
