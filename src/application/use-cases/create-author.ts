import { ResourceAlreadyExistsError } from "@Application/errors/resource-already-exists-error";
import { AuthorsRepository } from "@Application/repositories/contracts/authors-repository";
import { Author } from "@Domain/enterprise/entities/author";

interface CreateAuthorUseCaseRequest {
	name: string;
	bio: string;
}

interface CreateAuthorUseCaseResponse {
	author: Author;
}

export class CreateAuthorUseCase {
	public constructor(private readonly authorsRepository: AuthorsRepository) {}

	public async execute(
		request: CreateAuthorUseCaseRequest,
	): Promise<CreateAuthorUseCaseResponse> {
		const similarAuthors = await this.authorsRepository.fetchManyByName(
			request.name,
		);

		const authorAlreadyExists = similarAuthors.find(
			(item) => item.Name === request.name,
		);

		if (authorAlreadyExists) {
			throw new ResourceAlreadyExistsError(
				`Autor ${request.name} já cadastrado.`,
			);
		}

		const author = new Author({
			...request,
		});

		await this.authorsRepository.create(author);

		return {
			author,
		};
	}
}
