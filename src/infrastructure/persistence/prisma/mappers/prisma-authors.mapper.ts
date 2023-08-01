import { UniqueEntityId } from "@Core/primitives/unique-entity-id";
import { Author } from "@Domain/enterprise/entities/author";
import { Author as RawAuthor } from "@prisma/client";

export class PrismaAuthorsMapper {
	public static toDomain(raw: RawAuthor): Author {
		return Author.create(
			{
				name: raw.name,
				bio: raw.bio ?? undefined,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt ?? undefined,
			},
			new UniqueEntityId(raw.id),
		);
	}

	public static toPrisma(author: Author): RawAuthor {
		return {
			id: author.ID.Value,
			name: author.Name,
			bio: author.Bio ?? null,
			createdAt: author.CreatedAt,
			updatedAt: author.UpdatedAt ?? null,
		};
	}
}
