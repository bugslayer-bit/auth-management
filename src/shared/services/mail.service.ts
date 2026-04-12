import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

import { ApiConfigService } from './api-config.service.ts';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(private configService: ApiConfigService) {
    const smtp = this.configService.smtpConfig;

    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  async sendResetPasswordEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const smtp = this.configService.smtpConfig;

    await this.transporter.sendMail({
      from: `"${smtp.fromName}" <${smtp.from}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h3>Password Reset</h3>
        <p>You have requested to reset your password.</p>
        <p>Your password reset token is:</p>
        <p><strong>${resetToken}</strong></p>
        <p>This token will expire in 15 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });
  }
}
