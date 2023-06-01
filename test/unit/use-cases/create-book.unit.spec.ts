import { InvalidIsbnValue } from "@Domain/enterprise/errors/invalid-isbn-value";
import { ResourceNotFoundError } from "@Application/errors/resource-not-found-error";
import { BookAlreadyExistsError } from "@Application/errors/book-already-exists-error";
import { Author } from "@Domain/enterprise/entities/author";
import { InMemoryAuthorsRepository } from "../../repositories/in-memory/in-memory-authors-repository";
import { InMemoryBooksRepository } from "../../repositories/in-memory/in-memory-books-repository";
import { CreateBookUseCase } from "@Application/use-cases/create-book";

let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
let inMemoryBooksRepository: InMemoryBooksRepository;
let systemUnderTest: CreateBookUseCase;

describe("Create Book Use Case Test Suite", () => {
	beforeEach(() => {
		inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
		inMemoryBooksRepository = new InMemoryBooksRepository();
		systemUnderTest = new CreateBookUseCase(
			inMemoryAuthorsRepository,
			inMemoryBooksRepository,
		);
	});

	it("should create a new book", async () => {
		const author = new Author({
			name: "Thomas Hunter",
			bio: "Node.js Developer and Writer.",
		});

		await inMemoryAuthorsRepository.create(author);

		const { book } = await systemUnderTest.execute({
			title: "Distributed Systems in Node.js",
			edition: "1",
			genre: "Tech",
			publisher: "O'Raily",
			isbn: "ISBN 978-1-492-07729-9",
			releasedAt: new Date(),
			authorId: author.ID,
		});

		expect(book.ID).toBeTruthy();
	});

	it("should not create a book with invalid author", async () => {
		await expect(() =>
			systemUnderTest.execute({
				title: "Distributed Systems in Node.js",
				edition: "1",
				genre: "Tech",
				publisher: "O'Raily",
				isbn: "ISBN 978-1-492-07729-9",
				releasedAt: new Date(),
				authorId: "1",
			}),
		).rejects.toThrow(ResourceNotFoundError);
	});

	it("should not create a duplicated book", async () => {
		const author = new Author({
			name: "Thomas Hunter",
			bio: "Node.js Developer and Writer.",
		});

		await inMemoryAuthorsRepository.create(author);

		await systemUnderTest.execute({
			title: "Distributed Systems in Node.js",
			edition: "1",
			genre: "Tech",
			publisher: "O'Raily",
			isbn: "ISBN 978-1-492-07729-9",
			releasedAt: new Date(),
			authorId: author.ID,
		});

		await expect(() =>
			systemUnderTest.execute({
				title: "Distributed Systems in Node.js",
				edition: "1",
				genre: "Tech",
				publisher: "O'Raily",
				isbn: "ISBN 978-1-492-07729-9",
				releasedAt: new Date(),
				authorId: author.ID,
			}),
		).rejects.toThrow(BookAlreadyExistsError);
	});

	it("should not create a book with invalid ISBN", async () => {
		const author = new Author({
			name: "Thomas Hunter",
			bio: "Node.js Developer and Writer.",
		});

		await inMemoryAuthorsRepository.create(author);

		await expect(() =>
			systemUnderTest.execute({
				title: "Distributed Systems in Node.js",
				edition: "1",
				genre: "Tech",
				publisher: "O'Raily",
				isbn: "ISNB 978-1-492-07729-9",
				releasedAt: new Date(),
				authorId: author.ID,
			}),
		).rejects.toThrowError(InvalidIsbnValue);
	});
});
