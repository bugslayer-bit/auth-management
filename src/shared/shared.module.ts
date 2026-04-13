import type { Provider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import path from 'node:path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';

import { ApiConfigService } from './services/api-config.service.ts';
import { GeneratorService } from './services/generator.service.ts';
import { MailService } from './services/mail.service.ts';
import { ValidatorService } from './services/validator.service.ts';
import { MailerModule } from '@nestjs-modules/mailer';

const providers: Provider[] = [
  ApiConfigService,
  ValidatorService,
  GeneratorService,
  MailService,
];

@Global()
@Module({
  providers,
  imports: [ConfigModule, CqrsModule,
     MailerModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        transport: {
          host: configService.emailConfig.host,
          secure: false,
          auth: {
            user: configService.emailConfig.username,
            pass: configService.emailConfig.password,
          },
        },
        defaults: {
          from: `"${configService.emailConfig.emailFromName}" <${configService.emailConfig.emailFrom}>`,
        },
        template: {
          dir: path.join(process.cwd(), 'views'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  exports: [...providers, CqrsModule],
})
export class SharedModule {}
