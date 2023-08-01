import { GenresRepository } from "@Application/repositories/contracts/genres-repository";
import { Genre } from "@Domain/enterprise/entities/genre";

export class InMemoryGenresRepository extends GenresRepository {
	public items: Genre[] = [];

	public async create(genre: Genre): Promise<void> {
		this.items.push(genre);
	}

	public async findById(id: string): Promise<Genre | null> {
		const genre = this.items.find((item) => item.ID.Value === id);

		if (!genre) {
			return null;
		}

		return genre;
	}

	public async findByName(name: string): Promise<Genre | null> {
		const genre = this.items.find((item) => item.Name === name);

		if (!genre) {
			return null;
		}

		return genre;
	}
}
