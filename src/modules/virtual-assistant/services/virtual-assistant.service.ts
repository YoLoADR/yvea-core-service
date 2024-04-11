import { JWTPayload } from '@libs/interfaces';
import { NotificationsService } from '@modules/notifications/services';
import { UsersService } from '@modules/users/services';
import { Injectable } from '@nestjs/common';
import { MessageDto } from '../dto';

@Injectable()
export class VirtualAssistantService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  async send({ sub }: JWTPayload, message: MessageDto) {
    const user = await this.usersService.findOneBy({ id: sub });

    this.notificationsService.sendToAdmin(
      'VIRTUAL_ASSISTANT_MESSAGE',
      message.subject,
      {
        from: user.email,
        ...message,
      },
    );

    this.notificationsService.send(
      user,
      'RECEIVED_ASSISTANCE_REQUEST',
      message,
    );
  }
}
