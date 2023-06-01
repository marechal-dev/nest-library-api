import { Book } from "@Domain/enterprise/entities/book";

export abstract class BooksRepository {
	abstract create(book: Book): Promise<void>;
	abstract findById(id: string): Promise<Book | null>;
	abstract fetchManyByTitle(title: string): Promise<Book[]>;
}
