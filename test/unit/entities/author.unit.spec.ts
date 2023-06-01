import { Author } from "@Domain/enterprise/entities/author";

describe("Author Test Suite", () => {
	it("should create a new Author", () => {
		const author = new Author({
			name: "Thomas Hunter",
			bio: "Node.js Developer and Writer.",
		});

		expect(author.ID).toBeTruthy();
		expect(author.CreatedAt).toEqual(expect.any(Date));
	});
});
