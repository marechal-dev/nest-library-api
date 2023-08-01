import { fakerPT_BR as faker } from "@faker-js/faker";

import { Book } from "./book";
import { UniqueEntityId } from "@Core/primitives/unique-entity-id";
import { ISBN } from "../value-objects/isbn";

describe("Book Entity Test Suite", () => {
	it("should create a book with valid ISBN", () => {
		const book = Book.create({
			authorId: new UniqueEntityId(),
			title: faker.lorem.lines(1),
			edition: "10ed",
			genresIds: [new UniqueEntityId()],
			isbn: new ISBN("ISBN 9123-2-123-549-72"),
			publisherId: new UniqueEntityId(),
			releasedAt: new Date(),
		});

		expect(book).toBeTruthy();
		expect(book.Edition).toEqual("10ed");
		expect(book.ISBN).toBeTruthy();
	});
});
