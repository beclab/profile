import { Controller, Logger, Get, Req, Body, Post } from '@nestjs/common';
import {
  returnSucceed,
  returnError,
  Result,
  TerminusInfo,
} from '@bytetrade/core';
import { DataStoreService } from './datastore.service';
import { createInstance } from './bfl/utils';
import axios from 'axios';

export interface Block {
  type: string;
  nickName: string;
  enabled: boolean;
}

export interface Social {
  username: string;
  platform: string;
  url: string;
}

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
  TELEGRAM = 'telegram',
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
  CIRCULAR = 'circular',
  SQUARE = 'square',
  CUSTOM = 'custom'
}

export enum IMAGE_FILTER {
  NONE = 'none',
  DARK = 'dark',
  Light = 'light'
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

export interface User {
  did: string;
  header: {
    style: string;
    banner: string;
    avatarUrl: string;
    profileShape: string;
    profileSize: number;
    profileOutline: boolean;
    nickName: string;
    description: string;
    textSize: string;
    format: string;
  };
  appearance: {
    theme: {
      style: string;
      preset: number;
      uploadImg: string;
      color: string;
      filter: string;
      useUpload: boolean;
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
      style: string;
      shadow: boolean;
      outline: boolean;
      transparency: number;
    };
    font: string;
  };
  social: {
    data: Social[];
    size: string;
  };
  block: {
    data: Block[];
  };
  layout: {
    style: number;
  };
  isDefault?: boolean;
}

function stringToIntHash(str: string, lowerbound: number, upperbound: number) {
  if (!str) {
    return lowerbound;
  }

  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result = result + str.charCodeAt(i);
  }

  if (!lowerbound) lowerbound = 0;
  if (!upperbound) upperbound = 500;

  return (result % (upperbound - lowerbound)) + lowerbound;
}

@Controller('/api/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  private key = 'profile_user_info_v2';

  constructor(
    private readonly dataStoreService: DataStoreService, // private readonly ws: WsStartGateway,
  ) {
    //
  }

  getDefaultSettings(info: TerminusInfo): User {
    let id = 1;

    if (info.terminusName) {
      id = stringToIntHash(info.terminusName, 1, 36);
    }

    return {
      did: '',
      layout: {
        style: 0,
      },
      header: {
        style: HEADER_STYLE_TYPE.CLASSIC,
        banner: '',
        avatarUrl: '' + id + '.png',
        profileShape: PROFILE_SHAPE_TYPE.CIRCULAR,
        profileSize: 100,
        profileOutline: false,
        nickName: '',
        description: '',
        textSize: SIZE_TYPE.SMALL,
        format: HEADER_FORMAT_TYPE.COLUMN,
      },
      appearance: {
        theme: {
          style: THEME_TYPE.SOLID,
          uploadImg: '',
          preset: 0,
          useUpload: false,
          color: '#ffffff',
          filter: IMAGE_FILTER.NONE,
          gradientTopColor: '#8CE3FF',
          gradientBottomColor: '#7FFF93',
          gradientColor: 'linear-gradient(180deg, #8CE3FF 0%, #7FFF93 100%)',
          localImg: '',
        },
        header: {
          textColor: '#1F1F1F',
        },
        link: {
          background: '#DCF9EB',
          textColor: '#1F1F1F',
        },
        block: {
          background: '#DCF9EB',
          textColor: '#1F1F1F',
          style: BLOCK_STYLE_TYPE.CIRCULAR,
          shadow: false,
          outline: false,
          transparency: 25,
        },
        font: 'Roboto',
      },
      social: {
        data: [],
        size: SIZE_TYPE.SMALL,
      },
      block: {
        data: [],
      },
      isDefault: true,
    };
  }

  async getProfile(info: TerminusInfo): Promise<User> {
    try {
      const data = await this.dataStoreService.GetKey(this.key);

      if (!data) {
        return this.getDefaultSettings(info);
      }

      return data;
    } catch (e) {
      console.log(e);
      return this.getDefaultSettings(info);
    }
  }

  async get_terminus_info(): Promise<TerminusInfo> {
    const response: any = await axios.get(
      'http://bfl/bfl/backend/v1/terminus-info',
    );
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    if (response.data.code != 0) {
      throw new Error(response.data);
    }
    this.logger.log('terminusInfo');
    return response.data.data;
  }

  @Get('/init')
  async init(): Promise<any> {
    try {
      const info: TerminusInfo = await this.get_terminus_info();
      const profile = await this.getProfile(info);

      return returnSucceed({
        info,
        profile,
      });
    } catch (e) {
      console.log(e);
      return {
        code: 1,
        message: 'get info error',
      };
    }
  }

  @Get('/')
  async get_key(): Promise<Result<User>> {
    const info: TerminusInfo = await this.get_terminus_info();
    const data = await this.getProfile(info);

    return returnSucceed(data);
  }

  @Post('/')
  async put_key(@Req() request: Request, @Body() body: any): Promise<any> {
    this.logger.log('put_key ' + this.key);
    this.logger.log(body);

    const data = await this.dataStoreService.GetKey(this.key);
    if (data && data.avatarUrl && data.avatarUrl != body.avatarUrl) {
      this.logger.log('update avatar');
      await createInstance(request).post('/bfl/settings/v1alpha1/set-avatar', {
        avatar: body.avatarUrl,
      });
    } else {
      this.logger.log('data');
      this.logger.log(data);
    }
    try {
      const data = await this.dataStoreService.SetKey(this.key, body);

      this.logger.debug(data);
      return returnSucceed(null);
    } catch (e) {
      console.log(e);
      return returnError(1, e.message || '');
    }
  }
}
