import { Global, Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  I18nModule as I18nModuleNestjs,
} from 'nestjs-i18n';
import * as path from 'path';
import { I18nUtilsService } from './services';

@Global()
@Module({
  imports: [
    I18nModuleNestjs.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-*': 'en',
        'fr-*': 'fr',
      },
      loaderOptions: {
        path: path.join(__dirname, '/translations/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
  ],
  providers: [I18nUtilsService],
  exports: [I18nUtilsService],
})
export class I18nModule {}
