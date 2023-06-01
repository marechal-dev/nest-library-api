import { ApplicationError } from "./application-error";

export class BookAlreadyExistsError extends ApplicationError {
	public constructor(message: string) {
		super(message);
	}
}
