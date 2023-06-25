import { Author } from "@Domain/enterprise/entities/author";

type AuthorHttpViewModel = {
	id: string;
	name: string;
	bio: string;
};

export class AuthorViewModel {
	public static toHTTP(author: Author): AuthorHttpViewModel {
		return {
			id: author.ID,
			name: author.Name,
			bio: author.Bio,
		};
	}
}
