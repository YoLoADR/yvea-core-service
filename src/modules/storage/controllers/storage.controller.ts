import { RequestWithUser } from '@libs/types';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Redirect,
  Req,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { StorageService } from '../services';

@ApiTags('Storage')
@ApiCookieAuth()
@Controller('storage')
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private readonly i18n: I18nService,
  ) {}

  @ApiOperation({
    summary: 'Get Signed S3 URL for Owned File',
    description:
      'This endpoint generates a signed URL for a file hosted on Amazon S3. It also validates that the user making the request is the owner of the file, ensuring secure access to the file.',
  })
  @Get('signed-url/:key')
  @Redirect()
  async getSignedUrl(
    @Req() { user }: RequestWithUser,
    @Param('key') key: string,
  ) {
    if (!(await this.storageService.userHasAuthorization(user, key))) {
      throw new NotFoundException(this.i18n.t('KEY_NOT_FOUND'));
    }

    return {
      url: await this.storageService.getSignedUrl(key),
    };
  }
}
