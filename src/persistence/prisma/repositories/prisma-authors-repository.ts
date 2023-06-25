import { Injectable } from "@nestjs/common";

import { AuthorsRepository } from "@Application/repositories/contracts/authors-repository";
import { Author } from "@Domain/enterprise/entities/author";

import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaAuthorsRepository extends AuthorsRepository {
	public constructor(private readonly prisma: PrismaService) {
		super();
	}

	public async create(author: Author): Promise<void> {
		throw new Error("Method not implemented.");
	}

	public async findById(id: string): Promise<Author | null> {
		throw new Error("Method not implemented.");
	}

	public async fetchManyByName(name: string): Promise<Author[]> {
		throw new Error("Method not implemented.");
	}
}
