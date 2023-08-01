import { fakerPT_BR as faker } from "@faker-js/faker";

import { InMemoryAuthorsRepository } from "@Testing/repositories/in-memory/in-memory-authors-repository";
import { InMemoryBooksRepository } from "@Testing/repositories/in-memory/in-memory-books-repository";
import { Genre } from "@Domain/enterprise/entities/genre";
import { Author } from "@Domain/enterprise/entities/author";
import { Publisher } from "@Domain/enterprise/entities/publisher";
import { ResourceNotFoundError } from "@Application/errors/resource-not-found-error";
import { ResourceAlreadyExistsError } from "@Application/errors/resource-already-exists-error";

import { CreateBookUseCase } from "./create-book";

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

	it("should create a Book", async () => {
		const genres = [
			Genre.create({
				name: "Sci-Fi",
			}),
			Genre.create({
				name: "Adventure",
			}),
		];

		const publisher = Publisher.create({
			title: "LucasArts",
			imageUrl: faker.image.urlPlaceholder(),
		});

		const author = Author.create({
			name: "George Lucas",
			bio: faker.person.bio(),
		});

		await inMemoryAuthorsRepository.create(author);

		const { book } = await systemUnderTest.execute({
			title: "Star Wars: The Clone Wars",
			edition: "1ed",
			isbn: "ISBN 123-123-23-5678",
			releasedAt: new Date("2022-08-01"),
			authorId: author.ID.Value,
			publisherId: publisher.ID.Value,
			genresIds: genres.map((item) => item.ID.Value),
		});

		expect(book).toBeTruthy();
		expect(inMemoryBooksRepository.items[0].Title).toEqual(
			"Star Wars: The Clone Wars",
		);
		expect(inMemoryBooksRepository.items[0].ISBN.Value).toEqual(
			"ISBN 123-123-23-5678",
		);
	});

	it("should not create a Book with an Invalid Author", async () => {
		const genres = [
			Genre.create({
				name: "Sci-Fi",
			}),
			Genre.create({
				name: "Adventure",
			}),
		];

		const publisher = Publisher.create({
			title: "LucasArts",
			imageUrl: faker.image.urlPlaceholder(),
		});

		const author = Author.create({
			name: "George Lucas",
			bio: faker.person.bio(),
		});

		await expect(() =>
			systemUnderTest.execute({
				title: "Star Wars: The Clone Wars",
				edition: "1ed",
				isbn: "ISBN 123-123-23-5678",
				releasedAt: new Date("2022-08-01"),
				authorId: author.ID.Value,
				publisherId: publisher.ID.Value,
				genresIds: genres.map((item) => item.ID.Value),
			}),
		).rejects.toThrow(ResourceNotFoundError);
	});

	it("should not create an existent Book", async () => {
		const genres = [
			Genre.create({
				name: "Sci-Fi",
			}),
			Genre.create({
				name: "Adventure",
			}),
		];

		const publisher = Publisher.create({
			title: "LucasArts",
			imageUrl: faker.image.urlPlaceholder(),
		});

		const author = Author.create({
			name: "George Lucas",
			bio: faker.person.bio(),
		});

		await inMemoryAuthorsRepository.create(author);

		await systemUnderTest.execute({
			title: "Star Wars: The Clone Wars",
			edition: "1ed",
			isbn: "ISBN 123-123-23-5678",
			releasedAt: new Date("2022-08-01"),
			authorId: author.ID.Value,
			publisherId: publisher.ID.Value,
			genresIds: genres.map((item) => item.ID.Value),
		});

		await expect(() =>
			systemUnderTest.execute({
				title: "Star Wars: The Clone Wars",
				edition: "1ed",
				isbn: "ISBN 123-123-23-5678",
				releasedAt: new Date("2022-08-01"),
				authorId: author.ID.Value,
				publisherId: publisher.ID.Value,
				genresIds: genres.map((item) => item.ID.Value),
			}),
		).rejects.toThrow(ResourceAlreadyExistsError);
	});
});
