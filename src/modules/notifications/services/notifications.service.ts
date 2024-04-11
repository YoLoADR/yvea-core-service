import * as Brevo from '@getbrevo/brevo';
import { User } from '@modules/users/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';
import { NotificationTemplate } from '../entities';

@Injectable()
export class NotificationsService {
  private templateIds: Record<string, number> = {};
  private apiInstance = new Brevo.TransactionalEmailsApi();

  constructor(private readonly configService: ConfigService) {
    const client = Brevo.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = this.configService.getOrThrow('BREVO_API_KEY');
  }

  async sendToAdmin(templateName: string, subject: string, params: any) {
    const templateId = await this.getTemplateId(templateName, 'en');

    const sendSmtpEmail = {
      to: [{ email: this.configService.getOrThrow('ADMIN_EMAIL') }],
      templateId,
      params,
      subject,
    };

    return this.apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  async send(
    { email: to, lastLang }: User,
    templateName: string,
    params: any,
    useLastLang = false,
  ) {
    let lang = lastLang;

    if (!useLastLang) {
      lang = I18nContext.current().lang;
    }

    const templateId = await this.getTemplateId(templateName, lang);

    const sendSmtpEmail = {
      to: [{ email: to }],
      templateId,
      params,
    };

    return this.apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  private async getTemplateId(
    templateName: string,
    lang: string,
  ): Promise<number> {
    if (!(templateName in this.templateIds)) {
      await this.loadTemplateId(templateName, lang);
    }

    return this.templateIds[`${templateName}_${lang}`];
  }

  private async loadTemplateId(name: string, lang: string) {
    const { templateId } = await NotificationTemplate.findOneByOrFail({
      name,
      lang,
    });

    this.templateIds[`${name}_${lang}`] = templateId;
  }
}
