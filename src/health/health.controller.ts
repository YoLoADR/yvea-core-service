import { Public } from '@libs/decorators';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class HealthController {
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  check() {
    // Return OK just to check if server is running
  }
}
