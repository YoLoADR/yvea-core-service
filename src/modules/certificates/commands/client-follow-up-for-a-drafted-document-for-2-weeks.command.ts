import { NotificationsService } from '@modules/notifications/services';
import { UsersService } from '@modules/users/services';
import { ConfigService } from '@nestjs/config';
import { Command, CommandRunner } from 'nest-commander';
import { CertificatesService } from '../services';

@Command({
  name: 'client-follow-up-for-a-drafted-document-for-2-weeks',
  description: 'Sends client a follow up email',
})
export class ClientFollowUpForADraftedDocumentFor2WeeksCommand extends CommandRunner {
  constructor(
    private readonly certificatesService: CertificatesService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly notificationsService: NotificationsService,
  ) {
    super();
  }

  async run() {
    const certificates =
      await this.certificatesService.findDraftedCertificatesForMoreThan2Weeks();

    for (const certificate of certificates) {
      try {
        const user = await this.usersService.findOneBy({
          id: certificate.userId,
        });

        await this.notificationsService.send(
          user,
          'CLIENT_FOLLOW_UP_FOR_A_DRAFTED_DOCUMENT_FOR_2_WEEKS',
          {
            firstName: user.firstName,
            url: this.configService.getOrThrow('FRONTEND_BASE_URL'),
          },
          true,
        );

        await this.certificatesService.updateFollowUpEmailSentAt(certificate);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
