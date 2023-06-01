import { Module } from "@nestjs/common";
import { CreateBookUseCase } from "./use-cases/create-book";

@Module({
	providers: [CreateBookUseCase],
})
export class ApplicationModule {}
