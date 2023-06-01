import { BookAlreadyExistsError } from "@Application/errors/book-already-exists-error";
import { ResourceNotFoundError } from "@Application/errors/resource-not-found-error";
import { AuthorsRepository } from "@Application/repositories/contracts/authors-repository";
import { BooksRepository } from "@Application/repositories/contracts/books-repository";
import { Book } from "@Domain/enterprise/entities/book";
import { ISBN } from "@Domain/enterprise/value-objects/isbn";
import { Injectable } from "@nestjs/common";

interface CreateBookUseCaseRequest {
	title: string;
	edition: string;
	genre: string;
	publisher: string;
	isbn: string;
	authorId: string;
	releasedAt: Date;
}

interface CreateBookUseCaseResponse {
	book: Book;
}

@Injectable()
export class CreateBookUseCase {
	public constructor(
		private readonly authorsRepository: AuthorsRepository,
		private readonly booksRepository: BooksRepository,
	) {}

	public async execute(
		request: CreateBookUseCaseRequest,
	): Promise<CreateBookUseCaseResponse> {
		const author = await this.authorsRepository.findById(request.authorId);

		if (!author) {
			throw new ResourceNotFoundError(
				`Autor com ID ${request.authorId} inexistente.`,
			);
		}

		const similarBooks = await this.booksRepository.fetchManyByTitle(
			request.title,
		);

		const bookAlreadyExists = similarBooks.find(
			(item) =>
				item.Title === request.title && item.Edition === request.edition,
		);

		if (bookAlreadyExists) {
			throw new BookAlreadyExistsError(
				`O livro ${request.title} de edição ${request.edition} já está cadastrado`,
			);
		}

		const book = new Book({
			...request,
			isbn: new ISBN(request.isbn),
		});

		await this.booksRepository.create(book);

		return {
			book,
		};
	}
}
