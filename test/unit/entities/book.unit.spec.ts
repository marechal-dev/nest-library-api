import { ISBN } from "@Domain/enterprise/value-objects/isbn";
import { Book } from "@Domain/enterprise/entities/book";

describe("Book Test Suite", () => {
	it("should create a new Book", () => {
		const book = new Book({
			title: "Distributed Systems in Node.js",
			edition: "1",
			genre: "Tech",
			publisher: "O'Raily",
			isbn: new ISBN("ISBN 978-1-492-07729-9"),
			releasedAt: new Date(),
			authorId: "1",
		});

		expect(book.ID).toBeTruthy();
		expect(book.CreatedAt).toEqual(expect.any(Date));
	});
});
