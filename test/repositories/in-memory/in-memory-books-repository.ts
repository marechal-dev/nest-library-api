import { BooksRepository } from "@Application/repositories/contracts/books-repository";
import { Book } from "@Domain/enterprise/entities/book";

export class InMemoryBooksRepository extends BooksRepository {
	public items: Book[] = [];

	public async create(book: Book): Promise<void> {
		this.items.push(book);
	}

	public async findById(id: string): Promise<Book | null> {
		const book = this.items.find((item) => item.ID === id);

		if (!book) {
			return null;
		}

		return book;
	}

	public async fetchManyByTitle(title: string): Promise<Book[]> {
		const books = this.items.filter((item) => item.Title.includes(title));

		return books;
	}
}
