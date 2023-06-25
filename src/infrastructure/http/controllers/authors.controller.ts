import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";

import { CreateAuthorUseCase } from "@Application/use-cases/create-author";

import { CreateAuthorDTO } from "../dtos/create-author-dto";
import { AuthorViewModel } from "../view-models/author-view-model";

@Controller("authors")
export class AuthorsController {
	public constructor(
		private readonly createAuthorUseCase: CreateAuthorUseCase,
	) {}

	@Post()
	@UsePipes(ZodValidationPipe)
	public async create(@Body() body: CreateAuthorDTO) {
		const { author } = await this.createAuthorUseCase.execute(body);

		return AuthorViewModel.toHTTP(author);
	}
}
