import "dotenv/config";

import { z } from "zod";

const envVariablesSchemaValidator = z.object({
	NODE_ENV: z
		.enum(["development", "production"] as const)
		.default("production"),
	PORT: z.coerce.number().default(3333),
	JWT_SECRET: z.string(),
	DATABASE_URL: z.string().url(),
});

const envParsingResult = envVariablesSchemaValidator.safeParse(process.env);

if (!envParsingResult.success) {
	console.log("Error when parsing env variables");
	console.error(envParsingResult.error.format());
	process.exit(1);
}

export const env = envParsingResult.data;
