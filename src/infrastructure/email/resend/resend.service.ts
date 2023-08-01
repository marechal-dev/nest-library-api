import { Injectable } from "@nestjs/common";
import { Resend } from "resend";

import { env } from "@Configs/env";

import { CreateAccountEmailTemplateHtml } from "../templates/created-account.template";

type AccountSuccessfullyCreatedEmailPayload = {
	userFirstName: string;
	userEmail: string;
};

@Injectable()
export class ResendService {
	private readonly resendInstance: Resend;

	public constructor() {
		this.resendInstance = new Resend(env.RESEND_API_KEY);
	}

	public async sendAccountSuccessfullyCreatedEmail({
		userFirstName,
		userEmail,
	}: AccountSuccessfullyCreatedEmailPayload): Promise<void> {
		const emailHtml = CreateAccountEmailTemplateHtml({ userFirstName });

		try {
			await this.resendInstance.emails.send({
				from: `API Livraria <onboarding@${env.RESEND_DOMAIN}>.dev>`,
				to: userEmail,
				subject: "Bem-vinda(o) a API Livraria!",
				html: emailHtml,
			});
		} catch (error) {}
	}
}
