import { ApplicationError } from "./application-error";

export class ResourceNotFoundError extends ApplicationError {
	public constructor(message: string) {
		super(message);
	}
}
