import { ApplicationError } from "./application-error";

export class ResourceAlreadyExistsError extends ApplicationError {
	public constructor(message: string) {
		super(message);
	}
}
