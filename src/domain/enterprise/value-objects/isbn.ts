import { InvalidIsbnValue } from "../errors/invalid-isbn-value";

const ISBN_FORMAT_REGEX = /(ISBN)\s([0-9-]+)/;

export class ISBN {
	private readonly value: string;

	public constructor(value: string) {
		if (!this.isFormatValid(value)) {
			throw new InvalidIsbnValue(value);
		}

		this.value = value;
	}

	public get Value(): string {
		return this.value;
	}

	private isFormatValid(value: string): boolean {
		if (!value.includes("ISBN")) {
			return false;
		}

		return ISBN_FORMAT_REGEX.test(value);
	}
}
