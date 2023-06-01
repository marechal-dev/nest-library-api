import { DomainError } from "@Core/errors/domain-error";

export class InvalidIsbnValue extends DomainError {
	public constructor(value: string) {
		super(`${value} não é um ISNB válido.`);
	}
}
