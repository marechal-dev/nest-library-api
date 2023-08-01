import { fakerPT_BR as faker } from "@faker-js/faker";

import { InMemoryAuthorsRepository } from "test/repositories/in-memory/in-memory-authors-repository";
import { CreateAuthorUseCase } from "./create-author";
import { ResourceAlreadyExistsError } from "@Application/errors/resource-already-exists-error";

let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
let systemUnderTest: CreateAuthorUseCase;

describe("Create Author Use Case Test Suite", () => {
	beforeEach(() => {
		inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
		systemUnderTest = new CreateAuthorUseCase(inMemoryAuthorsRepository);
	});

	it("should create an Author", async () => {
		const authorName = faker.person.fullName();
		const authorBio = faker.person.bio();

		const data = {
			name: authorName,
			bio: authorBio,
		};

		const { author } = await systemUnderTest.execute(data);

		expect(author).toBeTruthy();
		expect(author.Name).toEqual(authorName);
		expect(author.Bio).toEqual(authorBio);
	});

	it("should not create an existent Author by name", async () => {
		const authorName = faker.person.fullName();
		const authorBio = faker.person.bio();

		const data = {
			name: authorName,
			bio: authorBio,
		};

		await systemUnderTest.execute(data);

		await expect(() => systemUnderTest.execute(data)).rejects.toThrow(
			ResourceAlreadyExistsError,
		);
	});
});
