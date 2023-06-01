import { AuthorsRepository } from "@Application/repositories/contracts/authors-repository";
import { Author } from "@Domain/enterprise/entities/author";

export class InMemoryAuthorsRepository extends AuthorsRepository {
	public items: Author[] = [];

	public async create(author: Author): Promise<void> {
		this.items.push(author);
	}

	public async findById(id: string): Promise<Author | null> {
		const author = this.items.find((item) => item.ID === id);

		if (!author) {
			return null;
		}

		return author;
	}

	public async fetchManyByName(name: string): Promise<Author[]> {
		return this.items.filter((item) => item.Name.includes(name));
	}
}
