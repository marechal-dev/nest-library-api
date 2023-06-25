import { Author as RawAuthor } from "@prisma/client";

import { Author } from "@Domain/enterprise/entities/author";

export class PrismaAuthorsMapper {
	public static toPrisma(author: Author) {
		return {
			id: author.ID,
		};
	}

	public static toDomain(raw: RawAuthor): Author {
		return new Author(
			{
				name: raw.name,
				bio: raw.bio,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt ?? undefined,
			},
			raw.id,
		);
	}
}
