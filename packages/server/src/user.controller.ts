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

export interface Link {
  type: string;
  url: string;
  title: string;
  img?: string;
  icon?: string;
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

export interface User {
  avatarUrl: string;
  terminusName: string;
  description: string;
  did: string;
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

  private key = 'profile_user_info1';

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
      avatarUrl: '' + id + '.png',
      terminusName: '',
      description: '',
      layoutStyle: 0,
      background: {
        style: 0,
        uploadImg: '',
        color: '#ffffff',
        gradientTopColor: '#8CE3FF',
        gradientBottomColor: '#7FFF93',
        gradientColor: 'linear-gradient(180deg, #8CE3FF 0%, #7FFF93 100%)',
        localImg: '',
      },
      appearance: {
        nameColor: '#1F1814',
        bioColor: '#1F1814',
        socialColor: '#1F1814',
        buttonColor: '#1F1814',
        buttonBorderColor: '#1F1814',
        buttonFontColor: '#FFFFFF',
      },
      links: [],
      socials: [],
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
