import { Author } from "@Domain/enterprise/entities/author";

export abstract class AuthorsRepository {
	abstract create(author: Author): Promise<void>;
	abstract findById(id: string): Promise<Author | null>;
}
