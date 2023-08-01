import { Injectable } from "@nestjs/common";

import { Genre } from "@Domain/enterprise/entities/genre";
import { GenresRepository } from "@Application/repositories/contracts/genres-repository";
import { ResourceAlreadyExistsError } from "@Application/errors/resource-already-exists-error";

type CreateGenreRequest = {
	name: string;
};

type CreateGenreResponse = {
	genre: Genre;
};

@Injectable()
export class CreateGenreUseCase {
	public constructor(private readonly genresRepository: GenresRepository) {}

	public async execute({
		name,
	}: CreateGenreRequest): Promise<CreateGenreResponse> {
		const genreAlreadyExists = await this.genresRepository.findByName(name);

		if (genreAlreadyExists) {
			throw new ResourceAlreadyExistsError(`Gênero ${name} já cadastrado!`);
		}

		const genre = Genre.create({ name });

		await this.genresRepository.create(genre);

		return {
			genre,
		};
	}
}
