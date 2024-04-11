import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class I18nUtilsService {
  isFrench(): boolean {
    return I18nContext.current().lang == 'fr';
  }
}
