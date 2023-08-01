import "dotenv/config";

import { z } from "zod";

const envVariablesSchemaValidator = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"] as const)
		.default("production"),
	PORT: z.coerce.number().default(3333),
	JWT_SECRET: z.string().default("JWT-DEV-SECRET"),
	DATABASE_URL: z.string().url(),
	RESEND_DOMAIN: z.string(),
	RESEND_API_KEY: z.string(),
});

const parsingResult = envVariablesSchemaValidator.safeParse(process.env);

if (!parsingResult.success) {
	console.log("Error when parsing env variables");
	console.error(parsingResult.error.format());
	process.exit(1);
}

export const env = parsingResult.data;
