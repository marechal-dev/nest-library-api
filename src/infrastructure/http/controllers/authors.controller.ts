import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";

import { CreateAuthorUseCase } from "@Application/use-cases/create-author";
import { CreateAuthorDTO } from "../dtos/authors/create";
import {
	AuthorHttpViewModel,
	AuthorViewModel,
} from "../view-models/author.view-model";

@Controller("authors")
@UsePipes(ZodValidationPipe)
export class AuthorsController {
	public constructor(
		private readonly createAuthorUseCase: CreateAuthorUseCase,
	) {}

	@Post()
	public async create(
		@Body() createAuthorDTO: CreateAuthorDTO,
	): Promise<AuthorHttpViewModel> {
		const { author } = await this.createAuthorUseCase.execute(createAuthorDTO);

		return AuthorViewModel.toHTTP(author);
	}
}
