import { InMemoryGenresRepository } from "@Testing/repositories/in-memory/in-memory-genres-repository";
import { CreateGenreUseCase } from "./create-genre";
import { ResourceAlreadyExistsError } from "@Application/errors/resource-already-exists-error";

let inMemoryGenresRepository: InMemoryGenresRepository;
let systemUnderTest: CreateGenreUseCase;

describe("Create Genre Use Case Test Suite", () => {
	beforeEach(() => {
		inMemoryGenresRepository = new InMemoryGenresRepository();
		systemUnderTest = new CreateGenreUseCase(inMemoryGenresRepository);
	});

	it("should create a Genre", async () => {
		const { genre } = await systemUnderTest.execute({
			name: "Sci-Fi",
		});

		expect(genre).toBeTruthy();
		expect(genre.Name).toEqual("Sci-Fi");
		expect(inMemoryGenresRepository.items[0].ID.Value).toEqual(genre.ID.Value);
	});

	it("should not create an existent Genre", async () => {
		await systemUnderTest.execute({
			name: "Sci-Fi",
		});

		await expect(() =>
			systemUnderTest.execute({
				name: "Sci-Fi",
			}),
		).rejects.toThrow(ResourceAlreadyExistsError);
	});
});
