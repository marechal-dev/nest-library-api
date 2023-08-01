import { ISBN } from "@Domain/enterprise/value-objects/isbn";
import { InvalidIsbnValue } from "@Domain/enterprise/errors/invalid-isbn-value";

describe("Book ISBN Value Object Test Suite", () => {
	it("should create a new ISBN", () => {
		const isbn = new ISBN("ISBN 978-1-492-07729-9");

		expect(isbn.Value).toEqual("ISBN 978-1-492-07729-9");
	});

	it("should not create an invalid ISBN", () => {
		expect(() => {
			new ISBN("ISNB 978-1-492-07729-9");
		}).toThrow(InvalidIsbnValue);
	});
});
