import { JWTPayload } from '@libs/interfaces';
import { NotificationsService } from '@modules/notifications/services';
import { User } from '@modules/users/entities';
import { UsersService } from '@modules/users/services';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { I18nService } from 'nestjs-i18n';
import { ForgotPasswordDto, RecoverPasswordDto, SignUpDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
    private readonly configService: ConfigService,
  ) {}

  async recoverPassword({
    password,
    token: forgotPasswordToken,
  }: RecoverPasswordDto) {
    const user = await this.usersService.findOneBy({ forgotPasswordToken });

    if (!user) {
      throw new NotFoundException(this.i18n.t('TOKEN_NOT_FOUND'));
    }

    return this.usersService.updatePassword(user, password);
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.usersService.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(this.i18n.t('EMAIL_NOT_FOUND'));
    }

    const token = await this.usersService.createForgotPasswordToken(user);

    this.notificationsService.send(user, 'FORGOT_PASSWORD', {
      firstName: user.firstName,
      url: `${this.configService.get(
        'FRONTEND_BASE_URL',
      )}/restore-password?token=${token}`,
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneBy({ email });

    if (user && (await verify(user.password, password))) {
      return user;
    }
  }

  async login({ id: sub, validatedAt }: User): Promise<string> {
    const payload: JWTPayload = { sub };

    if (!validatedAt) {
      throw new ForbiddenException(this.i18n.t('EMAIL_NOT_VALIDATED'));
    }

    this.usersService.updateLastLang(sub);

    return this.jwtService.sign(payload);
  }

  async register(dto: SignUpDto) {
    const { email } = dto;

    const existingUser = await this.usersService.findOneBy({ email });

    if (existingUser) {
      throw new BadRequestException(this.i18n.t('EMAIL_ALREADY_IN_USE'));
    }

    const user = await this.usersService.create(dto);

    this.notificationsService.send(user, 'EMAIL_VERIFICATION', {
      firstName: dto.firstName,
      url: `${this.configService.get('BACKEND_BASE_URL')}/auth/validate-email/${
        user.validationToken
      }`,
    });

    this.notificationsService.send(user, 'ACCOUNT_CREATION_CONFIRMATION', {
      firstName: dto.firstName,
    });
  }

  async validateEmail(validationToken: string) {
    const user = await this.usersService.findOneBy({ validationToken });

    if (!user) {
      throw new NotFoundException(this.i18n.t('TOKEN_NOT_FOUND'));
    }

    return this.usersService.validateEmail(user);
  }
}
