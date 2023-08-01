/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import * as React from "react";

import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { render } from "@react-email/render";

type CreateAccountEmailTemplateProps = {
	userFirstName: string;
};

function CreateAccountEmailTemplate({
	userFirstName,
}: CreateAccountEmailTemplateProps) {
	return (
		<Html lang="pt-BR" dir="ltr">
			<Heading as="h1">API Livraria</Heading>
			<Heading as="h2">Conta criada com sucesso</Heading>
			<Hr />
			<Text>{userFirstName}, sua conta foi criada com sucesso!</Text>
		</Html>
	);
}

export const CreateAccountEmailTemplateHtml = (
	props: CreateAccountEmailTemplateProps,
): string => {
	return render(<CreateAccountEmailTemplate {...props} />, {
		pretty: true,
	});
};
