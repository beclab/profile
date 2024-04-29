import { Social } from 'src/types/User';

export enum SOCIAL_TYPE {
	TWITTER = 'twitter',
	FACEBOOK = 'facebook',
	INSTAGRAM = 'instagram',
	TIKTOK = 'tiktok',
	YOUTUBE = 'youtube',
	LINKEDIN = 'linkedin',
	PINTEREST = 'pinterest',
	SNAPCHAT = 'snapchat',
	SPOTIFY = 'spotify',
	THREADS = 'threads',
	REDDIT = 'reddit',
	TWITCH = 'twitch',
	GITHUB = 'github',
	DRIBBBLE = 'dribbble',
	DISCORD = 'discord',
	SUBSTACK = 'substack',
	TELEGRAM = 'telegram'
}

export const SocialMap: Record<string, Social> = {
	twitter: {
		platform: SOCIAL_TYPE.TWITTER,
		username: '',
		url: 'https://twitter.com/${username}'
	},
	facebook: {
		platform: SOCIAL_TYPE.FACEBOOK,
		username: '',
		url: 'https://facebook.com/${username}'
	},
	instagram: {
		platform: SOCIAL_TYPE.INSTAGRAM,
		username: '',
		url: 'https://instagram.com/${username}'
	},
	tiktok: {
		platform: SOCIAL_TYPE.TIKTOK,
		username: '',
		url: 'https://tiktok.com/@${username}'
	},
	youtube: {
		platform: SOCIAL_TYPE.YOUTUBE,
		username: '',
		url: 'https://www.youtube.com/@${username}'
	},
	linkedin: {
		platform: SOCIAL_TYPE.LINKEDIN,
		username: '',
		url: 'https://www.linkedin.com/in/${username}'
	},
	pinterest: {
		platform: SOCIAL_TYPE.PINTEREST,
		username: '',
		url: 'https://www.pinterest.com/${username}'
	},
	snapchat: {
		platform: SOCIAL_TYPE.SNAPCHAT,
		username: '',
		url: 'https://www.snapchat.com/add/${username}'
	},
	spotify: {
		platform: SOCIAL_TYPE.SPOTIFY,
		username: '',
		url: 'https://open.spotify.com/user/${username}'
	},
	threads: {
		platform: SOCIAL_TYPE.THREADS,
		username: '',
		url: 'https://threads.net/@${username}'
	},
	reddit: {
		platform: SOCIAL_TYPE.REDDIT,
		username: '',
		url: 'https://www.reddit.com/user/${username}'
	},
	twitch: {
		platform: SOCIAL_TYPE.TWITCH,
		username: '',
		url: 'https://twitch.tv/${username}'
	},
	github: {
		platform: SOCIAL_TYPE.GITHUB,
		username: '',
		url: 'https://github.com/${username}'
	},
	dribbble: {
		platform: SOCIAL_TYPE.DRIBBBLE,
		username: '',
		url: 'https://dribbble.com/${username}'
	},
	discord: {
		platform: SOCIAL_TYPE.DISCORD,
		username: '',
		url: 'https://discord.gg/${username}'
	},
	substack: {
		platform: SOCIAL_TYPE.SUBSTACK,
		username: '',
		url: 'https://substack.com/@${username}'
	},
	telegram: {
		platform: SOCIAL_TYPE.TELEGRAM,
		username: '',
		url: 'https://t.me/${username}'
	}
};
