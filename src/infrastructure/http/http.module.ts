import { Module } from "@nestjs/common";

import { AuthorsController } from "./controllers/authors.controller";
import { CreateAuthorUseCase } from "@Application/use-cases/create-author";
import { PersistenceModule } from "@Infrastructure/persistence/persistence.module";

@Module({
	imports: [PersistenceModule],
	controllers: [AuthorsController],
	providers: [CreateAuthorUseCase],
})
export class HttpModule {}
