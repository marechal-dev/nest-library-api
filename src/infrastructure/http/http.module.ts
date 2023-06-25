import { Module } from "@nestjs/common";

import { CreateAuthorUseCase } from "@Application/use-cases/create-author";

import { AuthorsController } from "./controllers/authors.controller";

@Module({
	controllers: [AuthorsController],
	providers: [CreateAuthorUseCase],
})
export class HttpModule {}
