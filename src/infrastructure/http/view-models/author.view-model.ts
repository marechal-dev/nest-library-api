import { Author } from "@Domain/enterprise/entities/author";

export type AuthorHttpViewModel = {
	id: string;
	name: string;
	bio?: string;
	createdAt: Date;
	updatedAt?: Date;
};

export class AuthorViewModel {
	public static toHTTP(author: Author): AuthorHttpViewModel {
		return {
			id: author.ID.Value,
			name: author.Name,
			bio: author.Bio,
			createdAt: author.CreatedAt,
			updatedAt: author.UpdatedAt,
		};
	}
}
