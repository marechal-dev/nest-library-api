import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const createAuthorSchemaValidator = z.object({
	name: z.string().min(2, "O nome do autor deve ter no mínimo 2 caracteres."),
	bio: z
		.string()
		.min(10, "A bio do autor deve ter no mínimo 10 caracteres.")
		.max(250, "A bio do autor deve ter no máximo 250 caracteres."),
});

const CreateAuthorZodDTO = createZodDto(createAuthorSchemaValidator);

export class CreateAuthorDTO extends CreateAuthorZodDTO {}
