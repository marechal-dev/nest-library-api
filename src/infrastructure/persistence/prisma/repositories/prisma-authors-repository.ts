import { AuthorsRepository } from "@Application/repositories/contracts/authors-repository";
import { Author } from "@Domain/enterprise/entities/author";
import { PrismaService } from "../prisma.service";
import { PrismaAuthorsMapper } from "../mappers/prisma-authors.mapper";

export class PrismaAuthorsRepository extends AuthorsRepository {
	public constructor(private readonly prisma: PrismaService) {
		super();
	}

	public async create(author: Author): Promise<void> {
		await this.prisma.author.create({
			data: PrismaAuthorsMapper.toPrisma(author),
		});
	}

	public async findById(id: string): Promise<Author | null> {
		const author = await this.prisma.author.findUnique({
			where: {
				id,
			},
		});

		if (!author) {
			return null;
		}

		return PrismaAuthorsMapper.toDomain(author);
	}

	public async fetchManyByName(name: string): Promise<Author[]> {
		const authors = await this.prisma.author.findMany({
			where: {
				name: {
					contains: name,
				},
			},
		});

		return authors.map((item) => PrismaAuthorsMapper.toDomain(item));
	}
}
