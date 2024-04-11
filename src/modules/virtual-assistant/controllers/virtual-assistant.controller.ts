import { RequestWithUser } from '@libs/types';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { MessageDto } from '../dto';
import { VirtualAssistantService } from '../services';

@ApiTags('Virtual Assistant')
@ApiCookieAuth()
@Controller('virtual-assistant')
export class VirtualAssistantController {
  constructor(
    private readonly virtualAssistantService: VirtualAssistantService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async send(@Req() { user }: RequestWithUser, @Body() dto: MessageDto) {
    this.virtualAssistantService.send(user, dto);
  }
}
