import fs from 'node:fs';
import path from 'node:path';

import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import Handlebars from 'handlebars';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async sendPasswordResetEmail(
    email: string,
    context: { name: string; code: string },
  ): Promise<void> {
    try {
      const templatePath = path.join(
        process.cwd(),
        'views/forgot-password.hbs',
      );
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const template = Handlebars.compile(templateSource);
      const html = template(context);

      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset Code',
        html,
      });

      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send password reset email to ${email}`,
        error,
      );
    }
  }

  async sendUserCreatedEmail(
    email: string,
    context: { name: string; username: string; password: string },
  ): Promise<void> {
    try {
      const templatePath = path.join(process.cwd(), 'views/post-user.hbs');
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const template = Handlebars.compile(templateSource);
      const html = template(context);

      await this.mailerService.sendMail({
        to: email,
        subject: 'Your Account Has Been Created',
        html,
      });

      this.logger.log(`Account created email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send account created email to ${email}`,
        error,
      );
    }
  }
}
