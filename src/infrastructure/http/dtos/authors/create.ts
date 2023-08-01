import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const createAuthorSchema = z.object({
	name: z.string().min(2).max(128),
	bio: z
		.string()
		.min(10)
		.max(256)
		.optional()
		.describe("Author's bio. Optional by default."),
});

export class CreateAuthorDTO extends createZodDto(createAuthorSchema) {}
