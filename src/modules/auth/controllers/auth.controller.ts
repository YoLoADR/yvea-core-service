import { COOKIES_NAME, getCookieOpts } from '@libs/constants';
import { User } from '@modules/users/entities';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from '../../../libs/decorators';
import {
  ForgotPasswordDto,
  RecoverPasswordDto,
  SignInDto,
  SignInResponseDto,
  SignUpDto,
} from '../dto';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../services/auth.service';

@Public()
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: 'User Login and Session Token Storage',
    description:
      'This endpoint allows a user to log in using their credentials. Upon successful authentication, it stores a session token in a cookie for subsequent authenticated access to protected resources.',
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiBody({ type: SignInDto })
  @Post('login')
  async signIn(
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInResponseDto> {
    const accessToken = await this.authService.login(req.user);

    res.cookie(COOKIES_NAME, accessToken, getCookieOpts());

    return new SignInResponseDto(req.user);
  }

  @ApiOperation({
    summary: 'User Registration',
    description:
      'This endpoint allows a user to create a new account by providing registration information.',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() dto: SignUpDto) {
    await this.authService.register(dto);
  }

  @ApiOperation({
    summary: 'Forgot Password',
    description:
      'Allows users to request a forgotten password reset by providing their registered email address. An email with reset instructions is sent to the user.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto);
  }

  @ApiOperation({
    summary: 'Recover Password',
    description:
      'Allows users to reset their forgotten password by providing a token and their new password.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('recover-password')
  async recoverPassword(@Body() dto: RecoverPasswordDto) {
    await this.authService.recoverPassword(dto);
  }

  @ApiOperation({
    summary: 'Email Verification with Token',
    description:
      'This endpoint is used to verify the authenticity of an email address. It expects to receive a token sent via email during the registration process. Upon successful verification, the email is confirmed as legitimate.',
  })
  @Get('validate-email/:token')
  @Redirect()
  async validateAccount(@Param('token') token: string) {
    await this.authService.validateEmail(token);

    return {
      url: this.configService.getOrThrow('FRONTEND_BASE_URL'),
    };
  }
}
