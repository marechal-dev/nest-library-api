import { Genre } from "@Domain/enterprise/entities/genre";

export abstract class GenresRepository {
	abstract create(genre: Genre): Promise<void>;
	abstract findById(id: string): Promise<Genre | null>;
	abstract findByName(name: string): Promise<Genre | null>;
}
