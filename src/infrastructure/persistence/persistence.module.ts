import { Module } from "@nestjs/common";

import { AuthorsRepository } from "@Application/repositories/contracts/authors-repository";

import { PrismaService } from "./prisma/prisma.service";
import { PrismaAuthorsRepository } from "./prisma/repositories/prisma-authors-repository";

@Module({
	providers: [
		PrismaService,
		{
			provide: AuthorsRepository,
			useClass: PrismaAuthorsRepository,
		},
	],
	exports: [PrismaService, PrismaAuthorsRepository],
})
export class PersistenceModule {}
