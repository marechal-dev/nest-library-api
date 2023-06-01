import { InMemoryAuthorsRepository } from "../../repositories/in-memory/in-memory-authors-repository";
import { CreateAuthorUseCase } from "@Application/use-cases/create-author";
import { ResourceAlreadyExistsError } from "@Application/errors/resource-already-exists-error";

let inMemoryAuthorsRepository: InMemoryAuthorsRepository;
let systemUnderTest: CreateAuthorUseCase;

describe("Create Book Use Case Test Suite", () => {
	beforeEach(() => {
		inMemoryAuthorsRepository = new InMemoryAuthorsRepository();
		systemUnderTest = new CreateAuthorUseCase(inMemoryAuthorsRepository);
	});

	it("should create a new author", async () => {
		const { author } = await systemUnderTest.execute({
			name: "Thomas Hunter",
			bio: "Node.js Developer and Writer.",
		});

		expect(author.ID).toBeTruthy();
		expect(inMemoryAuthorsRepository.items[0].Name).toEqual(author.Name);
	});

	it("should not create an existent author", async () => {
		await systemUnderTest.execute({
			name: "Thomas Hunter",
			bio: "Node.js Developer and Writer.",
		});

		await expect(() =>
			systemUnderTest.execute({
				name: "Thomas Hunter",
				bio: "Node.js Developer and Writer.",
			}),
		).rejects.toThrow(ResourceAlreadyExistsError);
	});
});
